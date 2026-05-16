import {useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../../pages/Dashboard'
import Reports from '../../pages/Reports'
import Settings from '../../pages/Settings'

function Layout() {
    const [page, setPage] = useState('dashboard')

    return (
        <div className="app-layout">
            <Sidebar page={page} setPage={setPage}/>

            <main className="app-main">
                {page === 'dashboard' && <Dashboard/>}
                {page === 'reports' && <Reports/>}
                {page === 'settings' && <Settings/>}
            </main>
        </div>
    )
}

export default Layout
