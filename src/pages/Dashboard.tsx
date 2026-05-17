import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import RegionEmploymentBarChart from '../components/charts/RegionEmploymentBarChart'
import FilterSection from '../components/dashboard/FilterSection'
import QualificationCategoryChart from '../components/dashboard/QualificationCategoryChart'
import YearlyTrendChart from '../components/dashboard/YearlyTrendChart'
import {regionOptions} from '../data/dashboardData'
import {
    createEmploymentSummary,
    createGenderEmploymentRates,
    createMonthlyEmploymentTrend,
    createRegionTopFive,
    fetchEmploymentRows,
} from '../services/kosisService'
import type {
    EmploymentSummary,
    GenderEmploymentRate,
    KosisDataSource,
    MonthlyEmploymentTrend,
    RegionEmploymentRank,
} from '../types/kosis'

const rangeLabels: Record<string, string> = {
    'single-month': '해당 월',
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

function toPeriodCode(month: string) {
    return month.replace('.', '')
}

function Dashboard() {
    const [selectedRegionId, setSelectedRegionId] = useState('seoul')
    const [baseMonth, setBaseMonth] = useState('2026.04')
    const [range, setRange] = useState('last-12-months')
    const selectedRegion = regionOptions.find((region) => region.value === selectedRegionId)
    const [employmentSummary, setEmploymentSummary] = useState<EmploymentSummary | null>(null)
    const [regionTopFive, setRegionTopFive] = useState<RegionEmploymentRank[]>([])
    const [isEmploymentLoading, setIsEmploymentLoading] = useState(false)
    const [employmentErrorMessage, setEmploymentErrorMessage] = useState('')
    const [dataSource, setDataSource] = useState<KosisDataSource | null>(null)
    const [fallbackReason, setFallbackReason] = useState('')
    const [genderEmploymentRates, setGenderEmploymentRates] = useState<GenderEmploymentRate[]>([])
    const [monthlyTrend, setMonthlyTrend] = useState<MonthlyEmploymentTrend[]>([])
    const rangeLabel = rangeLabels[range] ?? range
    const latestPeriodLabel = formatPeriod(employmentSummary?.latestPeriod)

    useEffect(() => {
        const selectedRegionName = selectedRegion?.kosisName ?? '서울특별시'

        fetchEmploymentRows()
            .then((data) => {
                const basePeriod = toPeriodCode(baseMonth)

                setEmploymentSummary(createEmploymentSummary(data.rows, selectedRegionName, basePeriod))
                setGenderEmploymentRates(createGenderEmploymentRates(data.rows, selectedRegionName, basePeriod))
                setRegionTopFive(createRegionTopFive(data.rows, basePeriod))
                setMonthlyTrend(createMonthlyEmploymentTrend(data.rows, selectedRegionName, range))
                setDataSource(data.source)
                setFallbackReason(data.reason ?? '')
                setEmploymentErrorMessage('')
            })
            .catch(() => {
                setEmploymentSummary(null)
                setGenderEmploymentRates([])
                setRegionTopFive([])
                setMonthlyTrend([])
                setDataSource(null)
                setFallbackReason('')
                setEmploymentErrorMessage('고용률 데이터를 불러오지 못했습니다.')
            })
            .finally(() => {
                setIsEmploymentLoading(false)
            })
    }, [baseMonth, range, selectedRegion?.kosisName])

    const employmentCards = [
        {
            label: '전국 최신 고용률',
            value: formatRate(employmentSummary?.nationalRate),
            description: employmentSummary ? `${latestPeriodLabel} 기준` : 'KOSIS 고용률',
        },
        {
            label: '선택 시도 고용률',
            value: formatRate(employmentSummary?.selectedRegionRate),
            description: `${selectedRegion?.label ?? '선택 시도'} / ${baseMonth}`,
        },
        {
            label: '전월 대비 증감',
            value: formatPoint(employmentSummary?.monthlyChange),
            description: `${baseMonth} 기준`,
        },
    ]

    return (
        <section className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>고용통계 인사이트 대시보드</h1>
                    <p>시도별 고용률 흐름과 주요 고용 지표를 관리자 관점으로 확인합니다.</p>
                </div>

                <div className="status-badge">
                    <span className="status-dot"/>
                    Mock API 기반 운영 화면
                </div>
            </header>

            <FilterSection
                selectedRegionId={selectedRegionId}
                setSelectedRegionId={setSelectedRegionId}
                baseMonth={baseMonth}
                setBaseMonth={setBaseMonth}
                range={range}
                setRange={setRange}
            />

            <div className="filter-summary">
                <span>현재 조회 조건</span>
                <strong>{selectedRegion?.label}</strong>
                <span>{baseMonth} / {rangeLabel}</span>
                {dataSource && (
                    <span className={dataSource === 'kosis' ? 'data-source-badge' : 'data-source-badge fallback'}>
                        데이터 출처: {dataSource === 'kosis' ? 'KOSIS API' : 'Fallback Mock'}
                    </span>
                )}
            </div>

            {fallbackReason && (
                <div className="info-message">
                    외부 API 연결이 불안정해 포트폴리오용 fallback 데이터를 표시합니다.
                </div>
            )}

            {employmentErrorMessage && <div className="error-message">{employmentErrorMessage}</div>}

            <div className="dashboard-grid">
                {employmentCards.map((card) => (
                    <Card key={card.label} className="summary-card">
                        <p>{card.label}</p>
                        <strong>{isEmploymentLoading ? '로딩 중...' : card.value}</strong>
                        <span className="summary-card-description">{card.description}</span>
                    </Card>
                ))}
            </div>

            <Card className="employment-ranking-card">
                <div className="chart-header">
                    <h2>지역별 고용률 Top 5</h2>
                    <p>기준 월의 시도별 고용률 상위 지역입니다.</p>
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
                <QualificationCategoryChart
                    targetName={selectedRegion?.label ?? '선택 없음'}
                    period={`${baseMonth} / ${rangeLabel}`}
                    data={genderEmploymentRates}
                />

                <YearlyTrendChart
                    dataScope={`${baseMonth} 기준 ${rangeLabel}`}
                    data={monthlyTrend}
                />
            </div>
        </section>
    )
}

export default Dashboard
