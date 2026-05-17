import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import {fetchMockApplications, type ApplicationItem} from '../mocks/adminMock'
import {canEdit} from '../permissions/rolePermissions'
import {useAuth} from '../stores/authHooks'

function Applications() {
    const {currentUser} = useAuth()
    const editable = canEdit(currentUser.role)
    const [applications, setApplications] = useState<ApplicationItem[]>([])

    useEffect(() => {
        fetchMockApplications().then(setApplications)
    }, [])

    return (
        <section className="admin-page">
            <header className="page-header">
                <div>
                    <h1>신청 현황</h1>
                    <p>지원사업 신청 접수와 심사 진행 상태를 조회합니다.</p>
                </div>
            </header>

            <Card className="admin-card">
                <table>
                    <thead>
                    <tr>
                        <th>신청 ID</th>
                        <th>신청 기관</th>
                        <th>지원사업</th>
                        <th>지역</th>
                        <th>상태</th>
                        <th>접수 일시</th>
                        {editable && <th>작업</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.applicant}</td>
                            <td>{application.projectName}</td>
                            <td>{application.region}</td>
                            <td><span className="badge badge-secondary">{application.status}</span></td>
                            <td>{application.submittedAt}</td>
                            {editable && (
                                <td><button className="btn btn-outline report-action-button">심사</button></td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Applications
