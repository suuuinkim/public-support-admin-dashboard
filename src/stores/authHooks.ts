import {createContext, useContext} from 'react'
import {hasPermission as checkPermission} from '../permissions/rolePermissions'
import type {AdminUser, PermissionKey, UserRole} from '../types/auth'

export type AuthContextValue = {
    currentUser: AdminUser
    switchRole: (role: UserRole) => void
    hasPermission: (permission: PermissionKey) => boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function createPermissionChecker(role: UserRole) {
    return (permission: PermissionKey) => checkPermission(role, permission)
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}

export function usePermission(permission: PermissionKey) {
    const {hasPermission} = useAuth()
    return hasPermission(permission)
}
