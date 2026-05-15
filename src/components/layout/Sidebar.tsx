type SidebarProps = {
    page : string
    setPage : (page: string) => void
}

const menuItems = [
    {id : 'dashboard', label : '대시보드'},
    {id : 'analytics', label : '분석'},
    {id : 'configuration', label : '설정 관리'},
    {id : 'reports', label : '리포트'},
    {id : 'settings', label : '환경 설정'}
]

function Sidebar({page, setPage} : SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">자격</div>

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
