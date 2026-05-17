import {useState} from 'react'
import Card from '../components/common/Card'
import RoleBadge from '../components/common/RoleBadge'
import {canEdit} from '../permissions/rolePermissions'
import {useAuth} from '../stores/authHooks'

const regionOptions = ['전체 지역', '서울', '경기', '부산', '대구', '인천']
const periodOptions = ['2026.04', '최근 12개월', '최근 48개월']
const reportTypeOptions = ['지역별 고용률 요약', '성별 고용률 비교', '월별 고용률 변동']

function Settings() {
    const {currentUser} = useAuth()
    const editable = canEdit(currentUser.role)
    const [defaultRegion, setDefaultRegion] = useState('전체 지역')
    const [defaultPeriod, setDefaultPeriod] = useState('2026.04')
    const [defaultReportType, setDefaultReportType] = useState('지역별 고용률 요약')

    return (
        <section className="settings-page">
            <header className="page-header">
                <div>
                    <h1>환경 설정</h1>
                    <p>사용자 프로필과 기본 조회 조건을 관리합니다.</p>
                </div>
            </header>

            <Card className="settings-card">
                <div className="chart-header">
                    <h2>사용자 프로필</h2>
                    <p>Mock 인증 컨텍스트에서 제공되는 현재 사용자 정보입니다.</p>
                </div>

                <div className="profile-summary">
                    <div className="profile-avatar">{currentUser.name.slice(0, 1)}</div>

                    <div>
                        <strong>{currentUser.name}</strong>
                        <p>{currentUser.email}</p>
                        <RoleBadge role={currentUser.role}/>
                    </div>
                </div>
            </Card>

            <Card className="settings-card">
                <div className="chart-header">
                    <h2>기본 조회 조건</h2>
                    <p>대시보드와 리포트에서 기본으로 사용할 조회값입니다.</p>
                </div>

                <div className="settings-form-grid">
                    <label className="filter-field">
                        <span>기본 지역</span>
                        <select
                            value={defaultRegion}
                            onChange={(event) => setDefaultRegion(event.target.value)}
                            disabled={!editable}
                        >
                            {regionOptions.map((region) => <option key={region} value={region}>{region}</option>)}
                        </select>
                    </label>

                    <label className="filter-field">
                        <span>기본 기간</span>
                        <select
                            value={defaultPeriod}
                            onChange={(event) => setDefaultPeriod(event.target.value)}
                            disabled={!editable}
                        >
                            {periodOptions.map((period) => <option key={period} value={period}>{period}</option>)}
                        </select>
                    </label>

                    <label className="filter-field">
                        <span>기본 리포트 유형</span>
                        <select
                            value={defaultReportType}
                            onChange={(event) => setDefaultReportType(event.target.value)}
                            disabled={!editable}
                        >
                            {reportTypeOptions.map((reportType) => (
                                <option key={reportType} value={reportType}>{reportType}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </Card>

            <Card className="settings-card">
                <div className="chart-header">
                    <h2>알림 설정</h2>
                    <p>운영자가 확인해야 하는 주요 이벤트 알림입니다.</p>
                </div>

                <div className="notification-list">
                    <label className="notification-item">
                        <div>
                            <strong>고용 통계 동기화 완료</strong>
                            <p>KOSIS 고용률 데이터가 갱신되면 알림을 표시합니다.</p>
                        </div>
                        <input type="checkbox" defaultChecked disabled={!editable}/>
                    </label>

                    <label className="notification-item">
                        <div>
                            <strong>API 동기화 실패</strong>
                            <p>공공데이터 API 동기화 실패 시 운영 알림을 표시합니다.</p>
                        </div>
                        <input type="checkbox" defaultChecked disabled={!editable}/>
                    </label>
                </div>
            </Card>
        </section>
    )
}

export default Settings
