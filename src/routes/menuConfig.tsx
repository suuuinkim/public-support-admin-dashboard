import type {ComponentType} from 'react'
import {
    ApplicationsIcon,
    ChartIcon,
    DashboardIcon,
    ProjectIcon,
    SettingsIcon,
    ShieldIcon,
    UsersIcon,
    type IconProps,
} from '../components/common/AppIcons'
import type {PermissionKey} from '../types/auth'

export type MenuConfigItem = {
    id: PermissionKey
    label: string
    description: string
    path: string
    Icon: ComponentType<IconProps>
    adminOnly?: boolean
}

export const menuConfig: MenuConfigItem[] = [
    {id: 'dashboard', label: '대시보드', description: '고용 통계 요약', path: '/admin/dashboard', Icon: DashboardIcon},
    {id: 'statistics', label: '통계 리포트', description: '통계 조회 및 리포트', path: '/admin/statistics', Icon: ChartIcon},
    {id: 'projects', label: '지원사업 관리', description: '사업 등록과 운영', path: '/admin/projects', Icon: ProjectIcon},
    {id: 'applications', label: '신청 현황', description: '신청 접수와 심사', path: '/admin/applications', Icon: ApplicationsIcon},
    {id: 'users', label: '사용자 관리', description: '관리자 계정 관리', path: '/admin/users', Icon: UsersIcon, adminOnly: true},
    {id: 'permissions', label: '권한 관리', description: 'Role별 메뉴 권한', path: '/admin/permissions', Icon: ShieldIcon, adminOnly: true},
    {id: 'settings', label: '환경 설정', description: '운영 기본값 설정', path: '/admin/settings', Icon: SettingsIcon},
]

export function getMenuByPath(pathname: string) {
    return menuConfig.find((item) => pathname.startsWith(item.path))
}
