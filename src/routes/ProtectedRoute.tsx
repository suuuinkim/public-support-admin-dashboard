import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useAuth} from '../stores/authHooks'
import type {PermissionKey} from '../types/auth'

type ProtectedRouteProps = {
    permission?: PermissionKey
}

function ProtectedRoute({permission}: ProtectedRouteProps) {
    const location = useLocation()
    const {hasPermission} = useAuth()

    if (!permission) {
        return <Outlet/>
    }

    if (!hasPermission(permission)) {
        return <Navigate to="/admin/access-denied" replace state={{from: location.pathname}}/>
    }

    return <Outlet/>
}

export default ProtectedRoute
