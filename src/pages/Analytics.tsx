import Card from '../components/common/Card'

const analyticsMetrics = [
    {
        label: '가장 빠르게 성장한 자격',
        value: '데이터분석',
        description: '전년 대비 취득자 수가 18.6% 증가했습니다.',
    },
    {
        label: '수요가 높은 지역',
        value: '서울',
        description: '2024년 자격 취득 비중이 가장 높은 지역입니다.',
    },
    {
        label: '추천 자격 적합도',
        value: '87%',
        description: '지역별 일자리 수요 지표를 기준으로 계산한 적합도입니다.',
    },
]

const insights = [
    '정보처리 관련 자격은 서울과 경기 지역에서 꾸준한 증가세를 보입니다.',
    '산업안전 자격은 제조업 비중이 높은 지역에 집중되어 있습니다.',
    '조리기능 및 돌봄 관련 자격은 지역 서비스 일자리 시장에서 안정적인 수요를 보입니다.',
]

function Analytics() {
    return (
        <section className="analytics-page">
            <header className="page-header">
                <div>
                    <h1>분석</h1>
                    <p>자격 취득 추이, 지역별 수요, 추천 자격군을 분석합니다.</p>
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
                    <h2>지역별 수요 인사이트</h2>
                    <p>자격 취득 통계에서 확인된 최근 패턴입니다.</p>
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
