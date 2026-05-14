import {useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../../pages/Dashboard'

function Layout() {
    const [page, setPage] = useState('dashboard')
    return (
        <div className="app-layout">
            <Sidebar page={page} setPage={setPage} />

            <main className="app-main">
                {page === 'dashboard' && <Dashboard />}
                {page === 'analytics' && <div className="page-placeholder">Analytics</div>}
                {page === 'configuration' && <div className="page-placeholder">Configuration</div>}
                {page === 'reports' && <div className="page-placeholder">Reports</div>}
                {page ==='settings' && <div className="page-placeholder">Settings</div>}
            </main>
        </div>
    )
}

export default Layout;