import type {PermissionKey, UserRole} from '../types/auth'

export const rolePermissions: Record<UserRole, PermissionKey[]> = {
    SUPER_ADMIN: ['dashboard', 'statistics', 'projects', 'applications', 'users', 'permissions', 'settings'],
    ADMIN: ['dashboard', 'statistics', 'projects', 'applications', 'settings'],
    MANAGER: ['dashboard', 'statistics', 'applications'],
    VIEWER: ['dashboard'],
}

export const roleLabels: Record<UserRole, string> = {
    SUPER_ADMIN: '최고 관리자',
    ADMIN: '관리자',
    MANAGER: '운영 담당자',
    VIEWER: '조회 전용',
}

export function hasPermission(role: UserRole, permission: PermissionKey) {
    return rolePermissions[role].includes(permission)
}

export function canEdit(role: UserRole) {
    return role !== 'VIEWER'
}

export function canManageRole(role: UserRole) {
    return role === 'SUPER_ADMIN'
}
