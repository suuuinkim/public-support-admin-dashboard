import Card from '../common/Card'
import {areaOptions, regionOptions} from '../../data/dashboardData'

type TargetType = 'region' | 'area'

type FilterSectionProps = {
    targetType: TargetType
    setTargetType: (value: TargetType) => void
    selectedTargetId: string
    setSelectedTargetId: (value: string) => void
    dataMode: string
    setDataMode: (value: string) => void
    period: string
    setPeriod: (value: string) => void
}

function FilterSection({
    targetType,
    setTargetType,
    selectedTargetId,
    setSelectedTargetId,
    dataMode,
    setDataMode,
    period,
    setPeriod,
}: FilterSectionProps) {
    const selectableTargets = targetType === 'region' ? regionOptions : areaOptions

    return (
        <Card className="filter-card">
            <div className="filter-grid">
                <label className="filter-field">
                    <span>조회 대상</span>
                    <select
                        value={targetType}
                        onChange={(event) => {
                            const nextTargetType = event.target.value as TargetType
                            setTargetType(nextTargetType)
                            setSelectedTargetId(nextTargetType === 'region' ? 'seoul' : 'capital-area')
                        }}
                    >
                        <option value="region">시도</option>
                        <option value="area">권역</option>
                    </select>
                </label>

                <label className="filter-field">
                    <span>{targetType === 'region' ? '시도 선택' : '권역 선택'}</span>
                    <select value={selectedTargetId} onChange={(event) => setSelectedTargetId(event.target.value)}>
                        {selectableTargets.map((option) => (
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
                    <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                        <option value="latest-month">2026.04</option>
                        <option value="previous-month">2026.03</option>
                        <option value="last-12-months">최근 12개월</option>
                        <option value="last-48-months">최근 48개월</option>
                    </select>
                </label>

                <button className="btn btn-primary filter-button">필터 적용</button>
            </div>
        </Card>
    )
}

export default FilterSection
