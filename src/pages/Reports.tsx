import {useState} from 'react'
import Card from '../components/common/Card'

const reportHistory = [
    {
        id: 'RPT-2026-001',
        name: 'Daily Energy Summary',
        period: 'Today',
        status: 'Ready',
        createdAt: '2026-05-14 09:30',
    },
    {
        id: 'RPT-2026-002',
        name: 'Peak Demand Analysis',
        period: 'Last 7 Days',
        status: 'Ready',
        createdAt: '2026-05-13 18:10',
    },
    {
        id: 'RPT-2026-003',
        name: 'Power Factor Report',
        period: 'Last 30 Days',
        status: 'Processing',
        createdAt: '2026-05-13 16:45',
    },
]

function Reports() {
    const [reportType, setReportType] = useState('daily-summary')
    const [period, setPeriod] = useState('today')

    return(
        <section>
            <header className="reports-page">
                <div>
                    <h1>Reports</h1>
                    <p>리포트</p>
                </div>
            </header>

            <Card className="report-generator">
                <div className="chart-header">
                    <h2>리포트리포트</h2>
                    <p>리포트</p>
                </div>

                <div className="report-form">
                    <label className="filter-field">
                        <span>리포트 타입</span>
                        <select value={reportType} onChange={(event) => setReportType(event.target.value)}>
                            <option value="daily-summary">Daily Energy Summary</option>
                            <option value="peak-demand">Peak Demand Analysis</option>
                            <option value="power-factor">Power Factor Report</option>
                        </select>
                    </label>

                    <label className="filter-field">
                        <span>Period</span>
                        <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                            <option value="today">Today</option>
                            <option value="last-7-days">Last 7 Days</option>
                            <option value="last-30-days">Last 30 Days</option>
                        </select>
                    </label>

                    <button className="btn btn-primary report-button">
                        Generate Report
                    </button>
                </div>
            </Card>

            <Card className="report-history-card">
                <div className="chart-header">
                    <h2>Report History</h2>
                    <p>Recently generated reports</p>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Name</th>
                        <th>Period</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reportHistory.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.name}</td>
                            <td>{report.period}</td>
                            <td>
                    <span className={report.status === 'Ready' ? 'badge badge-default' : 'badge badge-secondary'}>
                      {report.status}
                    </span>
                            </td>
                            <td>{report.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Reports