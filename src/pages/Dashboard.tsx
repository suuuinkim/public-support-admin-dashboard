import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import FilterSection from '../components/dashboard/FilterSection'
import QualificationCategoryChart from '../components/dashboard/QualificationCategoryChart'
import QualificationSummaryCards from '../components/dashboard/QualificationSummaryCards'
import YearlyTrendChart from '../components/dashboard/YearlyTrendChart'
import RegionEmploymentBarChart from '../components/charts/RegionEmploymentBarChart'
import {targetOptions} from '../data/dashboardData'
import {
    createEmploymentSummary,
    createRegionTopFive,
    fetchEmploymentRows,
} from '../services/kosisService'
import type {EmploymentSummary, KosisDataSource, RegionEmploymentRank} from '../types/kosis'

type TargetType = 'region' | 'area'

const dataModeLabels: Record<string, string> = {
    'real-time': '최근 월',
    historical: '월별 추이',
    combined: '최근 48개월',
}

const periodLabels: Record<string, string> = {
    'latest-month': '2026.04',
    'previous-month': '2026.03',
    'last-12-months': '최근 12개월',
    'last-48-months': '최근 48개월',
}

function formatRate(value: number | null | undefined) {
    return value !== null && value !== undefined ? `${value}%` : '-'
}

function formatPoint(value: number | null | undefined) {
    if (value === null || value === undefined) {
        return '-'
    }

    return `${value > 0 ? '+' : ''}${value}%p`
}

function formatPeriod(period?: string) {
    if (!period || period.length !== 6) {
        return period ?? '-'
    }

    return `${period.slice(0, 4)}.${period.slice(4, 6)}`
}

function Dashboard() {
    const [targetType, setTargetType] = useState<TargetType>('region')
    const [selectedTargetId, setSelectedTargetId] = useState('seoul')
    const [dataMode, setDataMode] = useState('real-time')
    const [period, setPeriod] = useState('latest-month')
    const selectedTarget = targetOptions.find((target) => target.value === selectedTargetId)
    const [employmentSummary, setEmploymentSummary] = useState<EmploymentSummary | null>(null)
    const [regionTopFive, setRegionTopFive] = useState<RegionEmploymentRank[]>([])
    const [isEmploymentLoading, setIsEmploymentLoading] = useState(false)
    const [employmentErrorMessage, setEmploymentErrorMessage] = useState('')
    const [dataSource, setDataSource] = useState<KosisDataSource | null>(null)
    const [fallbackReason, setFallbackReason] = useState('')

    const dataModeLabel = dataModeLabels[dataMode] ?? dataMode
    const periodLabel = periodLabels[period] ?? period
    const dataSourceLabel = dataSource === 'kosis' ? 'KOSIS 실시간 데이터' : 'Fallback 임시 데이터'
    const latestPeriodLabel = formatPeriod(employmentSummary?.latestPeriod)

    useEffect(() => {
        const selectedRegionName = selectedTarget?.kosisName ?? '계'

        setIsEmploymentLoading(true)
        setEmploymentErrorMessage('')
        setFallbackReason('')

        fetchEmploymentRows()
            .then((data) => {
                setEmploymentSummary(createEmploymentSummary(data.rows, selectedRegionName))
                setRegionTopFive(createRegionTopFive(data.rows))
                setDataSource(data.source)
                setFallbackReason(data.reason ?? '')
            })
            .catch(() => {
                setEmploymentSummary(null)
                setRegionTopFive([])
                setDataSource(null)
                setEmploymentErrorMessage('KOSIS 고용률 데이터를 불러오지 못했습니다.')
            })
            .finally(() => {
                setIsEmploymentLoading(false)
            })
    }, [selectedTarget?.kosisName])

    const employmentCards = [
        {
            label: '전국 최신 고용률',
            value: formatRate(employmentSummary?.nationalRate),
            description: employmentSummary ? `${latestPeriodLabel} 기준` : 'KOSIS 고용률',
        },
        {
            label: '선택 대상 고용률',
            value: formatRate(employmentSummary?.selectedRegionRate),
            description: selectedTarget?.label ?? '선택 대상',
        },
        {
            label: '전월 대비 증감',
            value: formatPoint(employmentSummary?.monthlyChange),
            description: '선택 대상 기준',
        },
    ]

    return (
        <section className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>지역 고용 통계 관리자 대시보드</h1>
                    <p>시도와 권역별 월간 고용률 흐름과 주요 고용 지표를 확인합니다.</p>
                </div>

                <div className="status-badge">
                    <span className="status-dot"/>
                    KOSIS 고용률 데이터 연동 중
                </div>
            </header>

            <FilterSection
                targetType={targetType}
                setTargetType={setTargetType}
                selectedTargetId={selectedTargetId}
                setSelectedTargetId={setSelectedTargetId}
                dataMode={dataMode}
                setDataMode={setDataMode}
                period={period}
                setPeriod={setPeriod}
            />

            <div className="filter-summary">
                <span>현재 조회 범위</span>
                <strong>{selectedTarget?.label}</strong>
                <span>{dataModeLabel} / {periodLabel}</span>
                {dataSource && (
                    <span className={dataSource === 'kosis' ? 'data-source-badge' : 'data-source-badge fallback'}>
                        데이터 출처: {dataSourceLabel}
                    </span>
                )}
            </div>

            {fallbackReason && (
                <div className="info-message">
                    KOSIS 연결이 불안정하여 2026.04 기준 fallback 데이터를 표시합니다.
                </div>
            )}

            {employmentErrorMessage && (
                <div className="error-message">
                    {employmentErrorMessage}
                </div>
            )}

            <div className="dashboard-grid">
                {employmentCards.map((card) => (
                    <Card key={card.label} className="summary-card">
                        <p>{card.label}</p>
                        <strong>{isEmploymentLoading ? '로딩 중...' : card.value}</strong>
                        <span className="summary-card-description">{card.description}</span>
                    </Card>
                ))}
            </div>

            <QualificationSummaryCards/>

            <Card className="employment-ranking-card">
                <div className="chart-header">
                    <h2>지역별 고용률 Top 5</h2>
                    <p>KOSIS 최신 월 기준 지역별 고용률 순위입니다.</p>
                </div>

                {isEmploymentLoading ? (
                    <div className="empty-table-message">고용률 순위를 불러오는 중입니다.</div>
                ) : regionTopFive.length === 0 ? (
                    <div className="empty-table-message">표시할 고용률 순위가 없습니다.</div>
                ) : (
                    <>
                        <RegionEmploymentBarChart
                            data={regionTopFive.map((region) => ({
                                regionName: region.regionName,
                                rate: region.rate,
                            }))}
                        />
                        <div className="employment-ranking-list">
                            {regionTopFive.map((region, index) => (
                                <div key={region.regionCode} className="employment-ranking-row">
                                    <span className="employment-ranking-rank">{index + 1}</span>

                                    <div>
                                        <strong>{region.regionName}</strong>
                                        <p>지역 코드 {region.regionCode}</p>
                                    </div>

                                    <strong>{region.rate}%</strong>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Card>

            <div className="chart-grid">
                <QualificationCategoryChart targetName={selectedTarget?.label ?? '선택 없음'} period={periodLabel}/>
                <YearlyTrendChart dataScope={`${dataModeLabel} · 2022.05-2026.04`}/>
            </div>
        </section>
    )
}

export default Dashboard
