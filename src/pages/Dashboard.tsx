import Card from '../components/common/Card'
import EnergyParameters from "../components/dashboard/EnergyParameters.tsx";
import {useState} from 'react'
import FilterSection from "../components/dashboard/FilterSection.tsx";

const dashboardSummaryByTarget = {
    'device-1': {
        consumption: '12,485 kWh',
        peakDemand: '1,204 kW',
        powerFactor: '0.96',
    },
    'device-2': {
        consumption: '9,840 kWh',
        peakDemand: '980 kW',
        powerFactor: '0.93',
    },
    'device-3': {
        consumption: '18,220 kWh',
        peakDemand: '1,540 kW',
        powerFactor: '0.89',
    },
    'group-production': {
        consumption: '42,300 kWh',
        peakDemand: '3,920 kW',
        powerFactor: '0.91',
    },
    'group-admin': {
        consumption: '21,760 kWh',
        peakDemand: '1,870 kW',
        powerFactor: '0.95',
    },
}

const filterTargets = [
    { value: 'device-1', label: 'Main Building - Floor 1' },
    { value: 'device-2', label: 'Main Building - Floor 2' },
    { value: 'device-3', label: 'Manufacturing Unit 1' },
    { value: 'group-production', label: 'Production Group' },
    { value: 'group-admin', label: 'Administration Group' },
]

function Dashboard() {
    const [filterType, setFilterType] = useState('device')
    const [device, setDevice] = useState('device-1')
    const [dataMode, setDataMode] = useState('real-time')
    const [day, setDay] = useState('today')
    const selectedTarget = filterTargets.find((target) => target.value === device)
    const selectedSummary = dashboardSummaryByTarget[device as keyof typeof dashboardSummaryByTarget]

    const summaryCards = [
        {
            label: 'Total Consumption',
            value: selectedSummary.consumption,
        },
        {
            label: 'Peak Demand',
            value: selectedSummary.peakDemand,
        },
        {
            label: 'Power Factor',
            value: selectedSummary.powerFactor,
        },
    ]

    return(
        <section className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>Hello</h1>
                    <p>관리자 페이지</p>
                </div>

                <div className="status-badge">
                    <span className="status-dot" />
                    Real-time monitoring active
                </div>
            </header>

            <FilterSection
                filterType={filterType}
                setFilterType={setFilterType}
                device={device}
                setDevice={setDevice}
                dataMode={dataMode}
                setDataMode={setDataMode}
                day={day}
                setDay={setDay}
            />

            <div className="filter-summary">
                <span>Current target</span>
                <strong>{selectedTarget?.label}</strong>
                <span>{dataMode} / {day}</span>
            </div>

            <div className="dashboard-grid">
                {summaryCards.map((card) => (
                    <Card key={card.label} className="summary-card">
                        <p>{card.label}</p>
                        <strong>{card.value}</strong>
                    </Card>
                ))}
            </div>

            <EnergyParameters/>


        </section>
    )
}

export default Dashboard
