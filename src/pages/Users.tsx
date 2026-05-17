import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import RoleBadge from '../components/common/RoleBadge'
import {fetchMockUsers} from '../mocks/authMock'
import type {AdminUser} from '../types/auth'

function Users() {
    const [users, setUsers] = useState<AdminUser[]>([])

    useEffect(() => {
        fetchMockUsers().then(setUsers)
    }, [])

    return (
        <section className="admin-page">
            <header className="page-header">
                <div>
                    <h1>사용자 관리</h1>
                    <p>관리자 계정과 Role을 관리하는 SUPER_ADMIN 전용 메뉴입니다.</p>
                </div>
                <button className="btn btn-primary">사용자 초대</button>
            </header>

            <Card className="admin-card">
                <table>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>부서</th>
                        <th>Role</th>
                        <th>상태</th>
                        <th>최근 로그인</th>
                        <th>작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                            <td><RoleBadge role={user.role}/></td>
                            <td><span className="badge badge-default">{user.status === 'ACTIVE' ? '활성' : '잠김'}</span></td>
                            <td>{user.lastLoginAt}</td>
                            <td><button className="btn btn-outline report-action-button">권한 변경</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Users
