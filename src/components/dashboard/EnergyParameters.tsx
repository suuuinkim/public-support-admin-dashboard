const energyParameters = [
    {
        name: 'KVA',
        fullName: 'Apparent Power',
        value: '1,245.6',
        unit: 'kVA',
        change: '+5.2%',
        trend: 'up',
        status: 'normal',
    },
    {
        name: 'KWH',
        fullName: 'Energy Consumption',
        value: '8,932.4',
        unit: 'kWh',
        change: '+12.8%',
        trend: 'up',
        status: 'high',
    },
    {
        name: 'KVAR',
        fullName: 'Reactive Power',
        value: '342.1',
        unit: 'kVAR',
        change: '-2.1%',
        trend: 'down',
        status: 'normal',
    },
    {
        name: 'PF',
        fullName: 'Power Factor',
        value: '0.92',
        unit: '',
        change: '0.0%',
        trend: 'stable',
        status: 'optimal',
    },
]

function EnergyParameters() {
    return(
        <div className="energyParameters">
            {energyParameters.map((parameter) => (
                <div key={parameter.name} className="energy-parameter-card">
                    <div className="enerty-parameter-header">
                        <span>{parameter.name}</span>
                        <span className="energy-status">{parameter.status}</span>
                    </div>

                    <div className="energy-parameter-value">
                        <strong>{parameter.name}</strong>
                        {parameter.unit && <span>{parameter.unit}</span>}
                    </div>

                    <div className="energy-parameter-footer">
                        <span>{parameter.fullName}</span>
                        <span className={`trend trend-${parameter.trend}`}>
                            {parameter.change}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EnergyParameters