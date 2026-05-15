import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import FilterSection from '../components/dashboard/FilterSection'
import QualificationCategoryChart from '../components/dashboard/QualificationCategoryChart'
import QualificationSummaryCards from '../components/dashboard/QualificationSummaryCards'
import YearlyTrendChart from '../components/dashboard/YearlyTrendChart'
import {filterTargets} from '../data/dashboardData'
import {
    createEmploymentSummary,
    createRegionTopFive,
    fetchEmploymentRows,
} from '../services/kosisService'
import type {EmploymentSummary, KosisDataSource, RegionEmploymentRank} from '../types/kosis'

const dataModeLabels: Record<string, string> = {
    'real-time': '최근 연도',
    historical: '연도별 추이',
    combined: '통합 조회',
}

const periodLabels: Record<string, string> = {
    today: '2025',
    yesterday: '2024',
    'last-7-days': '2023-2025',
    'last-30-days': '2021-2025',
}

function getKosisRegionName(regionName?: string) {
    if (regionName === '서울') return '서울특별시'
    if (regionName === '경기') return '경기도'
    if (regionName === '부산') return '부산광역시'

    return regionName ?? '계'
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

function Dashboard() {
    const [filterType, setFilterType] = useState('device')
    const [device, setDevice] = useState('device-1')
    const [dataMode, setDataMode] = useState('real-time')
    const [day, setDay] = useState('today')
    const selectedTarget = filterTargets.find((target) => target.value === device)
    const [employmentSummary, setEmploymentSummary] = useState<EmploymentSummary | null>(null)
    const [regionTopFive, setRegionTopFive] = useState<RegionEmploymentRank[]>([])
    const [isEmploymentLoading, setIsEmploymentLoading] = useState(false)
    const [employmentErrorMessage, setEmploymentErrorMessage] = useState('')
    const [dataSource, setDataSource] = useState<KosisDataSource | null>(null)
    const [fallbackReason, setFallbackReason] = useState('')

    const dataModeLabel = dataModeLabels[dataMode] ?? dataMode
    const dayLabel = periodLabels[day] ?? day
    const dataSourceLabel = dataSource === 'kosis' ? 'KOSIS 실시간 데이터' : 'Fallback 임시 데이터'

    useEffect(() => {
        const selectedRegionName = getKosisRegionName(selectedTarget?.label)

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
    }, [selectedTarget?.label])

    const employmentCards = [
        {
            label: '전국 최신 고용률',
            value: formatRate(employmentSummary?.nationalRate),
            description: employmentSummary ? `${employmentSummary.latestPeriod}년 기준` : 'KOSIS 고용률',
        },
        {
            label: '선택 지역 고용률',
            value: formatRate(employmentSummary?.selectedRegionRate),
            description: selectedTarget?.label ?? '선택 지역',
        },
        {
            label: '전년 대비 증감',
            value: formatPoint(employmentSummary?.yearlyChange),
            description: '선택 지역 기준',
        },
        {
            label: '남녀 고용률 차이',
            value: formatPoint(employmentSummary?.genderGap),
            description: '남자 - 여자',
        },
    ]

    return (
        <section className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>지역 고용 통계 관리자 대시보드</h1>
                    <p>지역, 연도별 고용률 흐름과 주요 고용 지표를 확인합니다.</p>
                </div>

                <div className="status-badge">
                    <span className="status-dot"/>
                    KOSIS 고용률 데이터 연동 중
                </div>
            </header>

            <FilterSection
                filterType={filterType}
                setFilterType={setFilterType}
                device={device}
                setDevice={setDevice}
                dataMode={dataMode}
                setDataMode={setDataMode}
                day={day}
                setDay={setDay}
            />

            <div className="filter-summary">
                <span>현재 조회 범위</span>
                <strong>{selectedTarget?.label}</strong>
                <span>{dataModeLabel} / {dayLabel}</span>
                {dataSource && (
                    <span className={dataSource === 'kosis' ? 'data-source-badge' : 'data-source-badge fallback'}>
                        데이터 출처: {dataSourceLabel}
                    </span>
                )}
            </div>

            {fallbackReason && (
                <div className="info-message">
                    KOSIS 연결이 불안정하여 임시 데이터를 표시합니다.
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
                    <p>KOSIS 최신 연도 기준 지역별 고용률 순위입니다.</p>
                </div>

                {isEmploymentLoading ? (
                    <div className="empty-table-message">고용률 순위를 불러오는 중입니다.</div>
                ) : regionTopFive.length === 0 ? (
                    <div className="empty-table-message">표시할 고용률 순위가 없습니다.</div>
                ) : (
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
                )}
            </Card>

            <div className="chart-grid">
                <QualificationCategoryChart targetName={selectedTarget?.label ?? '선택 없음'} period={dayLabel}/>
                <YearlyTrendChart dataScope={dataModeLabel}/>
            </div>
        </section>
    )
}

export default Dashboard
