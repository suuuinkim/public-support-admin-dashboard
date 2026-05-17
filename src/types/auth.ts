export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'VIEWER'

export type PermissionKey =
    | 'dashboard'
    | 'statistics'
    | 'projects'
    | 'applications'
    | 'users'
    | 'permissions'
    | 'settings'

export type AdminUser = {
    id: number
    name: string
    email: string
    department: string
    role: UserRole
    status: 'ACTIVE' | 'LOCKED'
    lastLoginAt: string
}
