import Card from '../components/common/Card'

const analyticsMetrics = [
    {
        label: '전월 대비 상승 지역',
        value: '제주도',
        description: '2026.04 고용률이 전월 대비 가장 크게 상승한 지역입니다.',
    },
    {
        label: '고용률 상위 지역',
        value: '제주도',
        description: '2026.04 기준 지역별 고용률이 가장 높은 지역입니다.',
    },
    {
        label: '성별 격차 최대 지역',
        value: '울산광역시',
        description: '남녀 고용률 차이가 커서 추가 분석이 필요한 지역입니다.',
    },
]

const insights = [
    '2026.04 기준 제주도와 충청남도는 전체 고용률이 높은 편이며 지역 비교 차트에서 우선 확인할 만합니다.',
    '부산광역시와 대구광역시는 전국 평균 대비 낮은 구간에 있어 하위 지역 분석 대상으로 적합합니다.',
    '성별 고용률 차이는 지역별 산업 구조와 함께 해석하면 면접에서 데이터 분석 관점을 설명하기 좋습니다.',
]

function Analytics() {
    return (
        <section className="analytics-page">
            <header className="page-header">
                <div>
                    <h1>분석</h1>
                    <p>전월 대비 증감률, 지역별 고용률 비교, 성별 격차를 분석합니다.</p>
                </div>
            </header>

            <div className="analytics-grid">
                {analyticsMetrics.map((metric) => (
                    <Card key={metric.label} className="analytics-card">
                        <p>{metric.label}</p>
                        <strong>{metric.value}</strong>
                        <span>{metric.description}</span>
                    </Card>
                ))}
            </div>

            <Card className="insight-card">
                <div className="chart-header">
                    <h2>지역별 고용 인사이트</h2>
                    <p>KOSIS 고용률 데이터에서 확인할 수 있는 2026.04 기준 분석 포인트입니다.</p>
                </div>

                <ul className="insight-list">
                    {insights.map((insight) => (
                        <li key={insight}>{insight}</li>
                    ))}
                </ul>
            </Card>
        </section>
    )
}

export default Analytics
