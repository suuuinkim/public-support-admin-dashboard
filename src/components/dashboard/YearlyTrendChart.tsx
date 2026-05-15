import {yearlyTrendData} from '../../data/dashboardData'
import Card from '../common/Card'

type YearlyTrendChartProps = {
  dataScope: string
}

function YearlyTrendChart({dataScope}: YearlyTrendChartProps) {
  return (
    <Card className="chart-card">
      <div className="chart-header">
        <div>
          <h2>연도별 자격 취득 추이</h2>
          <p>{dataScope}</p>
        </div>
      </div>

      <div className="yearly-trend-list">
        {yearlyTrendData.map((item) => (
          <div key={item.year} className="yearly-trend-row">
            <span>{item.year}</span>
            <strong>{item.actual.toLocaleString()}명</strong>
            <small>기준 {item.baseline.toLocaleString()}명</small>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default YearlyTrendChart
