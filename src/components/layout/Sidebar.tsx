import {useState, type ComponentType, type ReactNode} from 'react'

type SidebarProps = {
    page: string
    setPage: (page: string) => void
}

type IconProps = {
    className?: string
}

type MenuItem = {
    id: string
    label: string
    description: string
    Icon: ComponentType<IconProps>
}

function IconBase({children, className}: {children: ReactNode; className?: string}) {
    return (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    )
}

function DashboardIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
        </IconBase>
    )
}

function BrandLogoIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M4 19V5"/>
            <path d="M4 19H20"/>
            <path d="M7 15L11 11L14 13L19 7"/>
            <path d="M18 7H19V8"/>
        </IconBase>
    )
}

function ReportsIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M8 13h8"/>
            <path d="M8 17h8"/>
            <path d="M8 9h2"/>
        </IconBase>
    )
}

function SettingsIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </IconBase>
    )
}

const menuItems: MenuItem[] = [
    {id: 'dashboard', label: '대시보드', description: '고용률 요약', Icon: DashboardIcon},
    {id: 'reports', label: '리포트', description: '통계 표 생성', Icon: ReportsIcon},
    {id: 'settings', label: '환경 설정', description: '기본 조건 관리', Icon: SettingsIcon},
]

function Sidebar({page, setPage}: SidebarProps) {
    const [expanded, setExpanded] = useState(false)

    const handleMenuClick = (pageId: string) => {
        if (!expanded) {
            setExpanded(true)
        }

        setPage(pageId)
    }

    return (
        <aside className={expanded ? 'sidebar expanded' : 'sidebar'} aria-label="주요 메뉴">
            <button className="sidebar-brand" type="button" onClick={() => setExpanded((value) => !value)}>
                <span className="sidebar-logo" aria-hidden="true">
                    <BrandLogoIcon className="sidebar-logo-icon"/>
                </span>
                <span className="sidebar-brand-text">
                    <strong>고용 통계</strong>
                    <small>관리자 대시보드</small>
                </span>
            </button>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const active = page === item.id
                    const Icon = item.Icon

                    return (
                        <div className="sidebar-menu-wrap" key={item.id}>
                            <button
                                className={active ? 'sidebar-menu active' : 'sidebar-menu'}
                                type="button"
                                onClick={() => handleMenuClick(item.id)}
                                aria-label={item.label}
                                aria-current={active ? 'page' : undefined}
                            >
                                <Icon className="sidebar-menu-icon"/>
                                <span className="sidebar-menu-text">
                                    <strong>{item.label}</strong>
                                    {active && <small>{item.description}</small>}
                                </span>
                                {active && <span className="sidebar-active-dot"/>}
                            </button>

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
