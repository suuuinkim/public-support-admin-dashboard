import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <section className="admin-page access-page">
            <div className="access-card card">
                <span className="access-code">404</span>
                <h1>페이지를 찾을 수 없습니다</h1>
                <p>요청한 주소가 없거나 이동되었습니다.</p>
                <Link className="btn btn-primary" to="/admin/dashboard">대시보드로 이동</Link>
            </div>
        </section>
    )
}

export default NotFound
