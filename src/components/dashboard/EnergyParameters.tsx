import { energyParameters } from '../../data/dashboardData'

function EnergyParameters() {
  return (
    <div className="energy-parameters">
      {energyParameters.map((parameter) => (
        <div key={parameter.name} className="energy-parameter-card">
          <div className="energy-parameter-header">
            <span>{parameter.name}</span>
            <span className="energy-status">{parameter.status}</span>
          </div>

          <div className="energy-parameter-value">
            <strong>{parameter.value}</strong>
            {parameter.unit && <span>{parameter.unit}</span>}
          </div>

          <div className="energy-parameter-footer">
            <span>{parameter.fullName}</span>
            <span className={`trend trend-${parameter.trend}`}>{parameter.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EnergyParameters
