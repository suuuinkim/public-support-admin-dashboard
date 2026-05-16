import Card from '../common/Card'
import {filterDevices, filterGroups} from '../../data/dashboardData'

type FilterSectionProps = {
    filterType: string
    setFilterType: (value: string) => void
    device: string
    setDevice: (value: string) => void
    dataMode: string
    setDataMode: (value: string) => void
    day: string
    setDay: (value: string) => void
}

function FilterSection({
    filterType,
    setFilterType,
    device,
    setDevice,
    dataMode,
    setDataMode,
    day,
    setDay,
}: FilterSectionProps) {
    const regionOptions = filterType === 'device' ? filterDevices : filterGroups

    return (
        <Card className="filter-card">
            <div className="filter-grid">
                <label className="filter-field">
                    <span>조회 유형</span>
                    <select
                        value={filterType}
                        onChange={(event) => {
                            const nextFilterType = event.target.value
                            setFilterType(nextFilterType)
                            setDevice(nextFilterType === 'device' ? 'device-1' : 'group-production')
                        }}
                    >
                        <option value="device">지역</option>
                        <option value="virtual-group">권역</option>
                    </select>
                </label>

                <label className="filter-field">
                    <span>{filterType === 'device' ? '지역 선택' : '권역 선택'}</span>
                    <select value={device} onChange={(event) => setDevice(event.target.value)}>
                        {regionOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="filter-field">
                    <span>데이터 범위</span>
                    <select value={dataMode} onChange={(event) => setDataMode(event.target.value)}>
                        <option value="real-time">최근 월</option>
                        <option value="historical">월별 추이</option>
                        <option value="combined">최근 48개월</option>
                    </select>
                </label>

                <label className="filter-field">
                    <span>분석 기간</span>
                    <select value={day} onChange={(event) => setDay(event.target.value)}>
                        <option value="today">2026.04</option>
                        <option value="yesterday">2026.03</option>
                        <option value="last-7-days">최근 12개월</option>
                        <option value="last-30-days">최근 48개월</option>
                    </select>
                </label>

                <button className="btn btn-primary filter-button">필터 적용</button>
            </div>
        </Card>
    )
}

export default FilterSection
