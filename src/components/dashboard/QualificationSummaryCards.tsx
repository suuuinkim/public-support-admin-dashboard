import {qualificationSummaryCards} from '../../data/dashboardData'

function QualificationSummaryCards() {
  return (
    <div className="qualification-summary-cards">
      {qualificationSummaryCards.map((summary) => (
        <div key={summary.name} className="qualification-summary-card">
          <div className="qualification-summary-header">
            <span>{summary.name}</span>
            <span className="qualification-status">{summary.status}</span>
          </div>

          <div className="qualification-summary-value">
            <strong>{summary.value}</strong>
            {summary.unit && <span>{summary.unit}</span>}
          </div>

          <div className="qualification-summary-footer">
            <span>{summary.fullName}</span>
            <span className={`trend trend-${summary.trend}`}>{summary.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QualificationSummaryCards
