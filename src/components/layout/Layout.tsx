import {Outlet} from 'react-router-dom'
import RoleBadge from '../common/RoleBadge'
import {useAuth} from '../../stores/authHooks'
import type {UserRole} from '../../types/auth'
import Breadcrumb from './Breadcrumb'
import Sidebar from './Sidebar'

function Layout() {
    const {currentUser, switchRole} = useAuth()
    const roleOptions: UserRole[] = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'VIEWER']

    return (
        <div className="app-layout">
            <Sidebar/>

            <main className="app-main">
                <header className="topbar">
                    <Breadcrumb/>

                    <div className="topbar-user">
                        <div className="topbar-user-meta">
                            <strong>{currentUser.name}</strong>
                            <span>{currentUser.department}</span>
                        </div>
                        <RoleBadge role={currentUser.role}/>
                        <select
                            className="role-switcher"
                            value={currentUser.role}
                            onChange={(event) => switchRole(event.target.value as UserRole)}
                            aria-label="Mock 사용자 Role 변경"
                        >
                            {roleOptions.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                <Outlet/>
            </main>
        </div>
    )
}

export default Layout
