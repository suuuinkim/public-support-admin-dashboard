import Card from '../common/Card'
import type {GenderEmploymentRate} from "../../types/kosis"

type QualificationCategoryChartProps = {
    targetName: string
    period: string
    data: GenderEmploymentRate[]
}

function QualificationCategoryChart({targetName, period, data}: QualificationCategoryChartProps) {
    return (
        <Card className="chart-card">
            <div className="chart-header">
                <div>
                    <h2>성별 고용률 비교</h2>
                    <p>
                        {targetName} / {period}
                    </p>
                </div>
            </div>

            <div className="bar-list">
                {data.map((item) => (
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

export default QualificationCategoryChart
