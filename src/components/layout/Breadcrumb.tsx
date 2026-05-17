import {useLocation} from 'react-router-dom'
import {getMenuByPath} from '../../routes/menuConfig'

function Breadcrumb() {
    const location = useLocation()
    const currentMenu = getMenuByPath(location.pathname)

    return (
        <nav className="breadcrumb" aria-label="현재 위치">
            <span>관리자</span>
            <span aria-hidden="true">/</span>
            <strong>{currentMenu?.label ?? '접근 제한'}</strong>
        </nav>
    )
}

export default Breadcrumb
