import {useMemo, useState, type ReactNode} from 'react'
import {fetchMockCurrentUser, mockUsers} from '../mocks/authMock'
import type {AdminUser} from '../types/auth'
import {AuthContext, createPermissionChecker, type AuthContextValue} from './authHooks'

const initialUser = mockUsers[0]

export function AuthProvider({children}: {children: ReactNode}) {
    const [currentUser, setCurrentUser] = useState<AdminUser>(initialUser)

    const value = useMemo<AuthContextValue>(() => ({
        currentUser,
        switchRole: (role) => {
            fetchMockCurrentUser(role).then(setCurrentUser)
        },
        hasPermission: createPermissionChecker(currentUser.role),
    }), [currentUser])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
