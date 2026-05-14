import Card from '../components/common/Card'

const analyticsMetrics = [
    {
        label: 'Average Consumption',
        value: '1,284 kWh',
        description: 'Daily average across selected devices',
    },
    {
        label: 'Peak Load Time',
        value: '14:00',
        description: 'Highest demand observed today',
    },
    {
        label: 'Efficiency Score',
        value: '87%',
        description: 'Compared with target baseline',
    },
]

const insights = [
    'Manufacturing Unit 1 shows higher demand during afternoon shifts.',
    'HVAC usage accounts for 36% of total consumption.',
    'Power factor remains stable but can be improved during peak hours.',
]

function Analytics() {
    return (
        <section className="analytics-page">
            <header className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p>분석을해보자!</p>
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
                    <h2>차트</h2>
                    <p>최근 소비 동향</p>
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