import { demandData } from '../../data/dashboardData'
import Card from '../common/Card'

type DemandChartProps = {
  dataMode: string
}

function DemandChart({ dataMode }: DemandChartProps) {
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
