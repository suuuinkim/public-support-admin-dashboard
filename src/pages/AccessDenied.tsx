import {Link, useLocation} from 'react-router-dom'
import Card from '../components/common/Card'
import {useAuth} from '../stores/authHooks'

function AccessDenied() {
    const location = useLocation()
    const {currentUser} = useAuth()
    const from = (location.state as {from?: string} | null)?.from

    return (
        <section className="admin-page access-page">
            <Card className="access-card">
                <span className="access-code">403</span>
                <h1>접근 권한이 없습니다</h1>
                <p>
                    현재 Role({currentUser.role})로는 {from ?? '요청한 페이지'}에 접근할 수 없습니다.
                </p>
                <Link className="btn btn-primary" to="/admin/dashboard">대시보드로 이동</Link>
            </Card>
        </section>
    )
}

export default AccessDenied
