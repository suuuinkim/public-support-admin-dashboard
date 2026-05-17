import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Applications from '../pages/Applications'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import Users from '../pages/Users'
import Permissions from '../pages/Permissions'
import AccessDenied from '../pages/AccessDenied'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace/>}/>
            <Route path="/admin" element={<Layout/>}>
                <Route index element={<Navigate to="/admin/dashboard" replace/>}/>
                <Route element={<ProtectedRoute permission="dashboard"/>}>
                    <Route path="dashboard" element={<Dashboard/>}/>
                </Route>
                <Route element={<ProtectedRoute permission="statistics"/>}>
                    <Route path="statistics" element={<Reports/>}/>
                </Route>
                <Route element={<ProtectedRoute permission="projects"/>}>
                    <Route path="projects" element={<Projects/>}/>
                </Route>
                <Route element={<ProtectedRoute permission="applications"/>}>
                    <Route path="applications" element={<Applications/>}/>
                </Route>
                <Route element={<ProtectedRoute permission="users"/>}>
                    <Route path="users" element={<Users/>}/>
                </Route>
                <Route element={<ProtectedRoute permission="permissions"/>}>
                    <Route path="permissions" element={<Permissions/>}/>
                </Route>
                <Route element={<ProtectedRoute permission="settings"/>}>
                    <Route path="settings" element={<Settings/>}/>
                </Route>
                <Route path="access-denied" element={<AccessDenied/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default AppRoutes
