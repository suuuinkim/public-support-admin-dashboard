import Card from '../common/Card'
import {monthOptions, regionOptions} from '../../data/dashboardData'

type FilterSectionProps = {
    selectedRegionId: string
    setSelectedRegionId: (value: string) => void
    baseMonth: string
    setBaseMonth: (value: string) => void
    range: string
    setRange: (value: string) => void
}

function FilterSection({
    selectedRegionId,
    setSelectedRegionId,
    baseMonth,
    setBaseMonth,
    range,
    setRange,
}: FilterSectionProps) {
    return (
        <Card className="filter-card">
            <div className="filter-grid">
                <label className="filter-field">
                    <span>시도 선택</span>
                    <select value={selectedRegionId} onChange={(event) => setSelectedRegionId(event.target.value)}>
                        {regionOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="filter-field">
                    <span>기준 월</span>
                    <select value={baseMonth} onChange={(event) => setBaseMonth(event.target.value)}>
                        {monthOptions.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="filter-field">
                    <span>조회 범위</span>
                    <select value={range} onChange={(event) => setRange(event.target.value)}>
                        <option value="single-month">해당 월</option>
                        <option value="last-12-months">최근 12개월</option>
                        <option value="last-48-months">최근 48개월</option>
                    </select>
                </label>

                <button className="btn btn-primary filter-button">조회</button>
            </div>
        </Card>
    )
}

export default FilterSection
