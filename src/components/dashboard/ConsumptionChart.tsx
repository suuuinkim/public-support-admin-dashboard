import Card from '../common/Card'

type ConsumptionProps = {
    targetName : string,
    day : string
}

const consumptionData = [
    {label : 'HVAC', value: 36},
    {label : 'Lighting', value: 18},
    {label : 'Production', value: 32},
    {label : 'Office', value: 14},

]

function ConsumptionChart({targetName, day} : ConsumptionProps){
    return(
        <Card className="chart-card">
           <div className="chart-header">
               <div>
                   <h2>Energy Consumption</h2>
                   <p>{targetName} / {day}</p>
               </div>
           </div>

            <div className="bar-list">
                {consumptionData.map((item) => (
                    <div key={item.label} className="bar-row">
                        <div className="bar-row-label">
                            <span>{item.label}</span>
                            <strong>{item.value}%</strong>
                        </div>
                        <div className="bar-track">
                            <div className="bar-fill" style={{width: `${item.value}%`}}/>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default ConsumptionChart