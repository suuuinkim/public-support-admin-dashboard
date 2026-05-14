import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import EnergyParameters from '../components/dashboard/EnergyParameters'
import FilterSection from '../components/dashboard/FilterSection'
import ConsumptionChart from '../components/dashboard/ConsumptionChart'
import DemandChart from '../components/dashboard/DemandChart'
import {filterTargets} from '../data/dashboardData'
import {fetchDashboardSummary, type DashboardSummary} from "../services/dashboardService";

function Dashboard() {
    const [filterType, setFilterType] = useState('device')
    const [device, setDevice] = useState('device-1')
    const [dataMode, setDataMode] = useState('real-time')
    const [day, setDay] = useState('today')
    const selectedTarget = filterTargets.find((target) => target.value === device)
    const [summary, setSummary] = useState<DashboardSummary | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setIsLoading(true)
        setErrorMessage('')

        fetchDashboardSummary(device)
            .then((data) => {
                setSummary(data)
            })
            .catch(() => {
                setSummary(null)
                setErrorMessage('Failed to load dashboard summary')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [device])

    const summaryCards = [
        {
            label: 'Total Consumption',
            value: summary?.consumption ?? '-',
        },
        {
            label: 'Peak Demand',
            value: summary?.peakDemand ?? '-',
        },
        {
            label: 'Power Factor',
            value: summary?.powerFactor ?? '-',
        },
    ]



    return (
        <section className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>Hello, Liam Gallagher!</h1>
                    <p>What are you looking for today?</p>
                </div>

                <div className="status-badge">
                    <span className="status-dot"/>
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

            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
            <div className="dashboard-grid">
                {summaryCards.map((card) => (
                    <Card key={card.label} className="summary-card">
                        <p>{card.label}</p>
                        <strong>{isLoading ? 'Loading...' : card.value}</strong>
                    </Card>
                ))}
            </div>

            <EnergyParameters/>

            <div className="chart-grid">
                <ConsumptionChart targetName={selectedTarget?.label ?? 'Unknown'} day={day}/>
                <DemandChart dataMode={dataMode}/>
            </div>
        </section>
    )
}

export default Dashboard
