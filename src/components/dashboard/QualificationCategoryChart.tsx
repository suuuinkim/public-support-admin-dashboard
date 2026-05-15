import {qualificationCategoryData} from '../../data/dashboardData'
import Card from '../common/Card'

type QualificationCategoryChartProps = {
  targetName: string
  period: string
}

function QualificationCategoryChart({targetName, period}: QualificationCategoryChartProps) {
  return (
    <Card className="chart-card">
      <div className="chart-header">
        <div>
          <h2>인기 자격군 현황</h2>
          <p>
            {targetName} / {period}
          </p>
        </div>
      </div>

      <div className="bar-list">
        {qualificationCategoryData.map((item) => (
          <div key={item.label} className="bar-row">
            <div className="bar-row-label">
              <span>{item.label}</span>
              <strong>{item.value}%</strong>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{width: `${item.value}%`}} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default QualificationCategoryChart
