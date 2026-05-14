import Card from '../common/Card'

type DemandChartProps = {
    dataMode: string
}

const demandData = [
    { time: '09:00', actual: 720, target: 800 },
    { time: '12:00', actual: 980, target: 900 },
    { time: '15:00', actual: 860, target: 900 },
    { time: '18:00', actual: 640, target: 750 },
]
function DemandChart({dataMode} : DemandChartProps){
    return (
        <Card className="chart-card">
            <div className="chart-header">
                <div>
                    <h2>Demand Overview</h2>
                    <p>{dataMode}</p>
                </div>
            </div>

            <div className="demand-list">
                {demandData.map((item) => (
                    <div key={item.time} className="demand-row">
                        <span>{item.time}</span>
                        <strong>{item.actual} kW</strong>
                        <small>target {item.target} kW</small>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default DemandChart