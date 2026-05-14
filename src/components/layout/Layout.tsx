import {useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../../pages/Dashboard'
import Analytics from "../../pages/Analytics";
import Reports from "../../pages/Reports";

function Layout() {
    const [page, setPage] = useState('dashboard')
    return (
        <div className="app-layout">
            <Sidebar page={page} setPage={setPage} />

            <main className="app-main">
                {page === 'dashboard' && <Dashboard />}
                {page === 'analytics' && <Analytics />}
                {page === 'configuration' && <div className="page-placeholder">Configuration</div>}
                {page === 'reports' && <Reports />}
                {page ==='settings' && <div className="page-placeholder">Settings</div>}
            </main>
        </div>
    )
}

export default Layout;