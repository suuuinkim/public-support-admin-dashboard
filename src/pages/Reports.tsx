import {useState} from 'react'
import Card from '../components/common/Card'
import {canEdit} from '../permissions/rolePermissions'
import {useAuth} from '../stores/authHooks'

type ReportStatus = 'Ready' | 'Processing'

type ReportHistoryItem = {
    id: string
    name: string
    target: string
    period: string
    status: ReportStatus
    createdAt: string
}

const initialReportHistory: ReportHistoryItem[] = [
    {id: 'RPT-2026-001', name: '지역별 고용률 요약', target: '서울', period: '2026.04', status: 'Ready', createdAt: '2026-05-14 09:30'},
    {id: 'RPT-2026-002', name: '성별 고용률 비교', target: '수도권', period: '최근 12개월', status: 'Ready', createdAt: '2026-05-13 18:10'},
    {id: 'RPT-2026-003', name: '월별 고용률 변동', target: '전체 지역', period: '최근 48개월', status: 'Processing', createdAt: '2026-05-13 16:45'},
]

const reportTemplates = [
    {value: 'regional-employment-summary', label: '지역별 고용률 요약', description: '선택한 기간의 지역별 고용률을 관리자 보고서 형태로 정리합니다.'},
    {value: 'gender-employment-comparison', label: '성별 고용률 비교', description: '남자, 여자, 전체 고용률을 지역별로 비교합니다.'},
    {value: 'monthly-employment-trend', label: '월별 고용률 변동', description: '최근 기간의 고용률 흐름과 전월 대비 증감을 확인합니다.'},
]

function Reports() {
    const {currentUser} = useAuth()
    const editable = canEdit(currentUser.role)
    const [reportType, setReportType] = useState('regional-employment-summary')
    const [period, setPeriod] = useState('2026.04')
    const [target, setTarget] = useState('all-regions')
    const [reportHistory, setReportHistory] = useState(initialReportHistory)
    const selectedTemplate = reportTemplates.find((template) => template.value === reportType) ?? reportTemplates[0]

    const handleGenerateReport = () => {
        if (!editable) return

        const nextReport: ReportHistoryItem = {
            id: `RPT-2026-${String(reportHistory.length + 1).padStart(3, '0')}`,
            name: selectedTemplate.label,
            target: target === 'all-regions' ? '전체 지역' : target,
            period,
            status: 'Processing',
            createdAt: '2026-05-17 12:00',
        }

        setReportHistory([nextReport, ...reportHistory])
    }

    return (
        <section className="reports-page">
            <header className="page-header">
                <div>
                    <h1>통계 리포트</h1>
                    <p>고용 통계 리포트를 생성하고 이력을 관리합니다.</p>
                </div>
            </header>

            <div className="reports-layout">
                <Card className="report-generator">
                    <div className="chart-header">
                        <h2>리포트 생성</h2>
                        <p>조회 조건을 선택하면 Mock API 기반 리포트 이력이 추가됩니다.</p>
                    </div>

                    <div className="report-form">
                        <label className="filter-field">
                            <span>리포트 유형</span>
                            <select value={reportType} onChange={(event) => setReportType(event.target.value)}>
                                {reportTemplates.map((template) => (
                                    <option key={template.value} value={template.value}>{template.label}</option>
                                ))}
                            </select>
                        </label>

                        <label className="filter-field">
                            <span>지역</span>
                            <select value={target} onChange={(event) => setTarget(event.target.value)}>
                                <option value="all-regions">전체 지역</option>
                                <option value="서울">서울</option>
                                <option value="경기">경기</option>
                                <option value="부산">부산</option>
                            </select>
                        </label>

                        <label className="filter-field">
                            <span>기간</span>
                            <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                                <option value="2026.04">2026.04</option>
                                <option value="최근 12개월">최근 12개월</option>
                                <option value="최근 48개월">최근 48개월</option>
                            </select>
                        </label>

                        {editable && (
                            <button className="btn btn-primary report-button" onClick={handleGenerateReport}>
                                리포트 생성
                            </button>
                        )}
                    </div>
                </Card>

                <Card className="report-preview-card">
                    <div className="chart-header">
                        <h2>리포트 미리보기</h2>
                        <p>{selectedTemplate.description}</p>
                    </div>
                    <div className="report-preview-grid">
                        <div className="report-preview-metric"><span>최신 고용률</span><strong>63.0%</strong></div>
                        <div className="report-preview-metric"><span>상위 지역</span><strong>제주</strong></div>
                        <div className="report-preview-metric"><span>전월 대비</span><strong>+0.5%p</strong></div>
                    </div>
                </Card>
            </div>

            <Card className="report-history-card">
                <div className="chart-header">
                    <h2>리포트 이력</h2>
                    <p>VIEWER 권한에서는 생성/다운로드 버튼이 숨김 처리됩니다.</p>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>리포트 ID</th>
                        <th>이름</th>
                        <th>지역</th>
                        <th>기간</th>
                        <th>상태</th>
                        <th>생성 일시</th>
                        {editable && <th>작업</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {reportHistory.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.name}</td>
                            <td>{report.target}</td>
                            <td>{report.period}</td>
                            <td>
                                <span className={report.status === 'Ready' ? 'badge badge-default' : 'badge badge-secondary'}>
                                    {report.status === 'Ready' ? '완료' : '처리 중'}
                                </span>
                            </td>
                            <td>{report.createdAt}</td>
                            {editable && (
                                <td>
                                    <button className="btn btn-outline report-action-button" disabled={report.status !== 'Ready'}>
                                        다운로드
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Reports
