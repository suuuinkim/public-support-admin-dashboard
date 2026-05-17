import Card from '../components/common/Card'
import RoleBadge from '../components/common/RoleBadge'
import {rolePermissions} from '../permissions/rolePermissions'
import {menuConfig} from '../routes/menuConfig'
import type {UserRole} from '../types/auth'

const roles = Object.keys(rolePermissions) as UserRole[]

function Permissions() {
    return (
        <section className="admin-page">
            <header className="page-header">
                <div>
                    <h1>권한 관리</h1>
                    <p>Role별 접근 가능한 메뉴와 기능 권한을 확인합니다.</p>
                </div>
            </header>

            <Card className="admin-card permission-matrix-card">
                <table>
                    <thead>
                    <tr>
                        <th>Role</th>
                        {menuConfig.map((menu) => <th key={menu.id}>{menu.label}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((role) => (
                        <tr key={role}>
                            <td><RoleBadge role={role}/></td>
                            {menuConfig.map((menu) => (
                                <td key={menu.id}>
                                    {rolePermissions[role].includes(menu.id) ? (
                                        <span className="permission-allow">허용</span>
                                    ) : (
                                        <span className="permission-deny">차단</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Permissions
