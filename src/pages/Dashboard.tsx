import Card from '../components/common/Card'
import EnergyParameters from "../components/dashboard/EnergyParameters.tsx";
import {useState} from 'react'
import FilterSection from "../components/dashboard/FilterSection.tsx";

const summaryCards = [
    {
        label : 'Total Consumption',
        value : '12345'
    },
    {
        label : 'Peak Demand',
        value : '1234'
    },
    {
        label : 'Power Factor',
        value : '0.96'
    }
]

function Dashboard() {
    const [filterType, setFilterType] = useState('device')
    const [device, setDevice] = useState('device-1')
    const [dataMode, setDataMode] = useState('real-time')
    const [day, setDay] = useState('today')

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
