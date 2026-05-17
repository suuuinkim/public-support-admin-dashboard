import type {AdminUser, UserRole} from '../types/auth'

export const mockUsers: AdminUser[] = [
    {
        id: 1,
        name: '홍길동',
        email: 'super.admin@gov-support.kr',
        department: '플랫폼관리팀',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        lastLoginAt: '2026-05-17 09:20',
    },
    {
        id: 2,
        name: '김관리',
        email: 'admin@gov-support.kr',
        department: '지원사업운영팀',
        role: 'ADMIN',
        status: 'ACTIVE',
        lastLoginAt: '2026-05-16 18:42',
    },
    {
        id: 3,
        name: '박담당',
        email: 'manager@gov-support.kr',
        department: '신청심사팀',
        role: 'MANAGER',
        status: 'ACTIVE',
        lastLoginAt: '2026-05-16 14:05',
    },
    {
        id: 4,
        name: '이조회',
        email: 'viewer@gov-support.kr',
        department: '통계분석팀',
        role: 'VIEWER',
        status: 'ACTIVE',
        lastLoginAt: '2026-05-15 11:36',
    },
]

const delay = 180

export function fetchMockCurrentUser(role: UserRole = 'SUPER_ADMIN'): Promise<AdminUser> {
    const user = mockUsers.find((item) => item.role === role) ?? mockUsers[0]

    return new Promise((resolve) => {
        window.setTimeout(() => resolve(user), delay)
    })
}

export function fetchMockUsers(): Promise<AdminUser[]> {
    return new Promise((resolve) => {
        window.setTimeout(() => resolve(mockUsers), delay)
    })
}
