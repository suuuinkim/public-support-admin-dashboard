import {useState} from 'react'
import Card from '../components/common/Card'

type ReportStatus = 'Ready' | 'Processing'

type ReportHistoryItem = {
    id: string
    name: string
    target: string
    period: string
    status: ReportStatus
    createdAt: string
}

type SelectOption = {
    value: string
    label: string
}

type ReportTemplate = SelectOption & {
    description: string
    metrics: {
        latestRate: string
        topRegion: string
        changeRate: string
    }
}

const initialReportHistory: ReportHistoryItem[] = [
    {
        id: 'RPT-2026-001',
        name: '지역별 고용률 요약',
        target: '서울',
        period: '2026.04',
        status: 'Ready',
        createdAt: '2026-05-14 09:30',
    },
    {
        id: 'RPT-2026-002',
        name: '성별 고용률 비교',
        target: '수도권',
        period: '최근 12개월',
        status: 'Ready',
        createdAt: '2026-05-13 18:10',
    },
    {
        id: 'RPT-2026-003',
        name: '월별 고용률 변화',
        target: '전체 지역',
        period: '최근 48개월',
        status: 'Processing',
        createdAt: '2026-05-13 16:45',
    },
]

const reportTemplates: ReportTemplate[] = [
    {
        value: 'regional-employment-summary',
        label: '지역별 고용률 요약',
        description: '선택한 기간의 지역별 고용률을 표 형태로 정리합니다.',
        metrics: {
            latestRate: '2026.04 63.0%',
            topRegion: '제주도',
            changeRate: '+0.5%p',
        },
    },
    {
        value: 'gender-employment-comparison',
        label: '성별 고용률 비교',
        description: '남자, 여자, 전체 고용률을 지역별로 비교합니다.',
        metrics: {
            latestRate: '남자 70.5%',
            topRegion: '제주도',
            changeRate: '14.8%p',
        },
    },
    {
        value: 'monthly-employment-trend',
        label: '월별 고용률 변화',
        description: '최근 48개월 고용률 흐름과 전월 대비 증감률을 확인합니다.',
        metrics: {
            latestRate: '2026.04 63.0%',
            topRegion: '충청남도',
            changeRate: '+0.5%p',
        },
    },
]

const periodOptions: SelectOption[] = [
    {
        value: '2026.04',
        label: '2026.04',
    },
    {
        value: 'last-12-months',
        label: '최근 12개월',
    },
    {
        value: 'last-48-months',
        label: '최근 48개월',
    },
]

const targetOptions: SelectOption[] = [
    {
        value: 'all-regions',
        label: '전체 지역',
    },
    {
        value: 'seoul',
        label: '서울',
    },
    {
        value: 'gyeonggi',
        label: '경기',
    },
    {
        value: 'busan',
        label: '부산',
    },
]

function Reports() {
    const [reportType, setReportType] = useState('regional-employment-summary')
    const [period, setPeriod] = useState('2026.04')
    const [target, setTarget] = useState('all-regions')
    const [reportHistory, setReportHistory] = useState(initialReportHistory)

    const selectedTemplate =
        reportTemplates.find((template) => template.value === reportType) ??
        reportTemplates[0]

    const selectedPeriod =
        periodOptions.find((option) => option.value === period) ??
        periodOptions[0]

    const selectedTarget =
        targetOptions.find((option) => option.value === target) ??
        targetOptions[0]

    const previewMetrics = [
        {
            label: '최신 고용률',
            value: selectedTemplate.metrics.latestRate,
        },
        {
            label: '상위 지역',
            value: selectedTemplate.metrics.topRegion,
        },
        {
            label: '증감/격차',
            value: selectedTemplate.metrics.changeRate,
        },
    ]

    const getStatusLabel = (status: ReportStatus) => {
        return status === 'Ready' ? '완료' : '처리 중'
    }

    const handleGenerateReport = () => {
        const createdAt = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date()).replace(/\./g, '-').replace(',', '').trim()

        const nextReport: ReportHistoryItem = {
            id: `RPT-2026-${String(reportHistory.length + 1).padStart(3, '0')}`,
            name: selectedTemplate.label,
            target: selectedTarget.label,
            period: selectedPeriod.label,
            status: 'Processing',
            createdAt,
        }

        setReportHistory([nextReport, ...reportHistory])
    }

    const handleClearHistory = () => {
        const confirmed = window.confirm('리포트 이력을 모두 삭제하시겠습니까?')

        if (!confirmed) {
            return
        }

        setReportHistory([])
    }

    const handleDownloadReport = (report: ReportHistoryItem) => {
        const params = new URLSearchParams({
            name: report.name,
            target: report.target,
            period: report.period
        })

        window.location.href = `/api/report-download?${params.toString()}`
    }

    return (
        <section className="reports-page">
            <header className="page-header">
                <div>
                    <h1>리포트</h1>
                    <p>월별, 지역별 고용 통계 표를 생성하고 관리합니다.</p>
                </div>
            </header>

            <div className="reports-layout">
                <Card className="report-generator">
                    <div className="report-history-header">
                        <div className="chart-header">
                            <h2>리포트 생성</h2>
                            <p>리포트 유형, 지역, 조회 기간을 선택하세요.</p>
                        </div>

                        <button
                            className="btn btn-outline report-clear-button"
                            onClick={handleClearHistory}
                        >
                            이력 초기화
                        </button>
                    </div>

                    <div className="report-form">
                        <label className="filter-field">
                            <span>리포트 유형</span>
                            <select
                                value={reportType}
                                onChange={(event) => setReportType(event.target.value)}
                            >
                                {reportTemplates.map((template) => (
                                    <option key={template.value} value={template.value}>
                                        {template.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="filter-field">
                            <span>지역</span>
                            <select
                                value={target}
                                onChange={(event) => setTarget(event.target.value)}
                            >
                                {targetOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="filter-field">
                            <span>기간</span>
                            <select
                                value={period}
                                onChange={(event) => setPeriod(event.target.value)}
                            >
                                {periodOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button
                            className="btn btn-primary report-button"
                            onClick={handleGenerateReport}
                        >
                            리포트 생성
                        </button>
                    </div>
                </Card>

                <Card className="report-preview-card">
                    <div className="chart-header">
                        <h2>리포트 미리보기</h2>
                        <p>{selectedTemplate.description}</p>
                    </div>

                    <div className="report-preview-meta">
                        <span>{selectedTarget.label}</span>
                        <span>{selectedPeriod.label}</span>
                    </div>

                    <div className="report-preview-grid">
                        {previewMetrics.map((metric) => (
                            <div className="report-preview-metric" key={metric.label}>
                                <span>{metric.label}</span>
                                <strong>{metric.value}</strong>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="report-history-card">
                <div className="chart-header">
                    <h2>리포트 이력</h2>
                    <p>최근 생성한 고용 통계 리포트입니다.</p>
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
                        <th>작업</th>
                    </tr>
                    </thead>

                    <tbody>
                    {reportHistory.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="empty-table-message">
                                생성한 리포트가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        reportHistory.map((report) => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.name}</td>
                                <td>{report.target}</td>
                                <td>{report.period}</td>
                                <td>
                                    <span
                                        className={
                                            report.status === 'Ready'
                                                ? 'badge badge-default'
                                                : 'badge badge-secondary'
                                        }
                                    >
                                        {getStatusLabel(report.status)}
                                    </span>
                                </td>
                                <td>{report.createdAt}</td>
                                <td>
                                    <button
                                        className="btn btn-outline report-action-button"
                                        disabled={report.status !== 'Ready'}
                                        onClick={() => handleDownloadReport(report)}
                                    >
                                        {report.status === 'Ready' ? '다운로드' : '준비 중'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Reports
