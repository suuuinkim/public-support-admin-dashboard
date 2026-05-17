import {useEffect, useState} from 'react'
import Card from '../components/common/Card'
import {fetchMockProjects, type SupportProject} from '../mocks/adminMock'
import {canEdit} from '../permissions/rolePermissions'
import {useAuth} from '../stores/authHooks'

function Projects() {
    const {currentUser} = useAuth()
    const editable = canEdit(currentUser.role)
    const [projects, setProjects] = useState<SupportProject[]>([])

    useEffect(() => {
        fetchMockProjects().then(setProjects)
    }, [])

    return (
        <section className="admin-page">
            <header className="page-header">
                <div>
                    <h1>지원사업 관리</h1>
                    <p>공공 지원사업의 모집 상태, 예산, 신청 규모를 관리합니다.</p>
                </div>
                {editable && <button className="btn btn-primary">사업 등록</button>}
            </header>

            <Card className="admin-card">
                <table>
                    <thead>
                    <tr>
                        <th>사업 ID</th>
                        <th>사업명</th>
                        <th>담당 부서</th>
                        <th>상태</th>
                        <th>예산</th>
                        <th>신청 수</th>
                        {editable && <th>작업</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.owner}</td>
                            <td><span className="badge badge-secondary">{project.status}</span></td>
                            <td>{project.budget}</td>
                            <td>{project.applicants.toLocaleString()}</td>
                            {editable && (
                                <td><button className="btn btn-outline report-action-button">수정</button></td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Projects
