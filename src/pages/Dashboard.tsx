import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import FilterSection from '../components/dashboard/FilterSection'
import QualificationCategoryChart from '../components/dashboard/QualificationCategoryChart'
import QualificationSummaryCards from '../components/dashboard/QualificationSummaryCards'
import YearlyTrendChart from '../components/dashboard/YearlyTrendChart'
import {filterTargets} from '../data/dashboardData'
import {fetchDashboardSummary, type DashboardSummary} from '../services/dashboardService'

function Dashboard() {
    const [filterType, setFilterType] = useState('device')
    const [device, setDevice] = useState('device-1')
    const [dataMode, setDataMode] = useState('real-time')
    const [day, setDay] = useState('today')
    const selectedTarget = filterTargets.find((target) => target.value === device)
    const [summary, setSummary] = useState<DashboardSummary | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const dataModeLabel = {
        'real-time': '최근 연도',
        historical: '연도별 추이',
        combined: '통합 조회',
    }[dataMode] ?? dataMode

    const dayLabel = {
        today: '2024',
        yesterday: '2023',
        'last-7-days': '2021-2024',
        'last-30-days': '2020-2024',
    }[day] ?? day

    useEffect(() => {
        setIsLoading(true)
        setErrorMessage('')

        fetchDashboardSummary(device)
            .then((data) => {
                setSummary(data)
            })
            .catch(() => {
                setSummary(null)
                setErrorMessage('대시보드 요약 정보를 불러오지 못했습니다.')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [device])

    const summaryCards = [
        {
            label: '총 자격 취득자',
            value: summary?.certifiedPeople ?? '-',
        },
        {
            label: '자격 종목 수',
            value: summary?.qualificationItems ?? '-',
        },
        {
            label: '전년 대비 증가율',
            value: summary?.growthRate ?? '-',
        },
    ]

    return (
        <section className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>지역 일자리·자격 통계 대시보드</h1>
                    <p>지역, 자격군, 연도별 자격 취득 현황과 수요 흐름을 확인합니다.</p>
                </div>

                <div className="status-badge">
                    <span className="status-dot"/>
                    공공데이터 조회 기준 적용 중
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
            </div>

            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}

            <div className="dashboard-grid">
                {summaryCards.map((card) => (
                    <Card key={card.label} className="summary-card">
                        <p>{card.label}</p>
                        <strong>{isLoading ? '로딩 중...' : card.value}</strong>
                    </Card>
                ))}
            </div>

            <QualificationSummaryCards/>

            <div className="chart-grid">
                <QualificationCategoryChart targetName={selectedTarget?.label ?? '알 수 없음'} period={dayLabel}/>
                <YearlyTrendChart dataScope={dataModeLabel}/>
            </div>
        </section>
    )
}

export default Dashboard
