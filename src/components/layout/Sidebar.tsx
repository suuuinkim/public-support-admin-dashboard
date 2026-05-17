import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ChartIcon} from '../common/AppIcons'
import {menuConfig} from '../../routes/menuConfig'
import {useAuth} from '../../stores/authHooks'

function Sidebar() {
    const [expanded, setExpanded] = useState(false)
    const {hasPermission} = useAuth()
    const menuItems = menuConfig.filter((item) => hasPermission(item.id))

    return (
        <aside className={expanded ? 'sidebar expanded' : 'sidebar'} aria-label="주요 메뉴">
            <button className="sidebar-brand" type="button" onClick={() => setExpanded((value) => !value)}>
                <span className="sidebar-logo" aria-hidden="true">
                    <ChartIcon className="sidebar-logo-icon"/>
                </span>
                <span className="sidebar-brand-text">
                    <strong>고용통계 인사이트</strong>
                    <small>공공지원 관리자</small>
                </span>
            </button>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.Icon

                    return (
                        <div className="sidebar-menu-wrap" key={item.id}>
                            <NavLink
                                className={({isActive}) => isActive ? 'sidebar-menu active' : 'sidebar-menu'}
                                to={item.path}
                                onClick={() => !expanded && setExpanded(true)}
                                aria-label={item.label}
                            >
                                <Icon className="sidebar-menu-icon"/>
                                <span className="sidebar-menu-text">
                                    <strong>{item.label}</strong>
                                    <small>{item.description}</small>
                                </span>
                                {item.adminOnly && <span className="admin-menu-mark">관리자</span>}
                            </NavLink>

                            {!expanded && (
                                <span className="sidebar-tooltip">
                                    <strong>{item.label}</strong>
                                    <small>{item.description}</small>
                                </span>
                            )}
                        </div>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
