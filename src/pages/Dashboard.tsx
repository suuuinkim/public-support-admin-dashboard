function Dashboard() {
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
            <div className="dashboard-grid">
                <div className="card summary-card">
                    <p>Total Consumption</p>
                    <strong>12345</strong>
                </div>

                <div className="card summary-card">
                    <p>Peak Demand</p>
                    <strong>1,204 kw</strong>
                </div>

                <div className="card summary-card">
                    <p>Power Factor</p>
                    <strong>0.96</strong>
                </div>
            </div>



        </section>
    )
}

export default Dashboard
