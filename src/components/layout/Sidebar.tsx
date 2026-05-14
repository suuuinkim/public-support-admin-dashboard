type SidebarProps = {
    page : string
    setPage : (page: string) => void
}

const menuItems = [
    {id : 'dashboard', label : 'Dashboard'},
    {id : 'analytics', label : 'Analytics'},
    {id : 'configuration', label : 'Configuration'},
    {id : 'reports', label : 'Reports'},
    {id : 'settings', label : 'Settings'}
]

function Sidebar({page, setPage} : SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">EMS</div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={page === item.id ? 'sidebar-menu active' : 'sidebar-menu'}
                        onClick={() => setPage(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    )

}

export default Sidebar