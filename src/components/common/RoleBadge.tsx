import {roleLabels} from '../../permissions/rolePermissions'
import type {UserRole} from '../../types/auth'

function RoleBadge({role}: {role: UserRole}) {
    return <span className={`role-badge role-${role.toLowerCase()}`}>{roleLabels[role]}</span>
}

export default RoleBadge
