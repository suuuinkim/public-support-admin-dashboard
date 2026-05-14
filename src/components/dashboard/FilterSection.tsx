import Card from '../common/Card'
import { filterDevices, filterGroups } from '../../data/dashboardData'

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
  const deviceOptions = filterType === 'device' ? filterDevices : filterGroups

  return (
    <Card className="filter-card">
      <div className="filter-grid">
        <label className="filter-field">
          <span>Filter Type</span>
          <select
            value={filterType}
            onChange={(event) => {
              const nextFilterType = event.target.value
              setFilterType(nextFilterType)
              setDevice(nextFilterType === 'device' ? 'device-1' : 'group-production')
            }}
          >
            <option value="device">Individual Device</option>
            <option value="virtual-group">Virtual Group</option>
          </select>
        </label>

        <label className="filter-field">
          <span>{filterType === 'device' ? 'Select Device' : 'Select Group'}</span>
          <select value={device} onChange={(event) => setDevice(event.target.value)}>
            {deviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Data Mode</span>
          <select value={dataMode} onChange={(event) => setDataMode(event.target.value)}>
            <option value="real-time">Real-Time</option>
            <option value="historical">Historical</option>
            <option value="combined">Combined</option>
          </select>
        </label>

        <label className="filter-field">
          <span>Time Period</span>
          <select value={day} onChange={(event) => setDay(event.target.value)}>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
          </select>
        </label>

        <button className="btn btn-primary filter-button">Apply Filter</button>
      </div>
    </Card>
  )
}

export default FilterSection
