import {useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../../pages/Dashboard'
import Analytics from '../../pages/Analytics'
import Reports from '../../pages/Reports'
import Configuration from '../../pages/Configuration'

function Layout() {
    const [page, setPage] = useState('dashboard')

    return (
        <div className="app-layout">
            <Sidebar page={page} setPage={setPage}/>

            <main className="app-main">
                {page === 'dashboard' && <Dashboard/>}
                {page === 'analytics' && <Analytics/>}
                {page === 'configuration' && <Configuration/>}
                {page === 'reports' && <Reports/>}
                {page === 'settings' && (
                    <div className="page-placeholder">
                        환경 설정 - 사용자 프로필, 기본 조회 지역, 기본 조회 기간
                    </div>
                )}
            </main>
        </div>
    )
}

export default Layout
