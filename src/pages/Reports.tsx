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
        totalAcquirers: string
        topRegion: string
        growthRate: string
    }
}

const initialReportHistory: ReportHistoryItem[] = [
    {
        id: 'RPT-2026-001',
        name: '자격 취득 현황 요약',
        target: '서울',
        period: '2024',
        status: 'Ready',
        createdAt: '2026-05-14 09:30',
    },
    {
        id: 'RPT-2026-002',
        name: '지역별 취득자 분석',
        target: '수도권',
        period: '2021-2024',
        status: 'Ready',
        createdAt: '2026-05-13 18:10',
    },
    {
        id: 'RPT-2026-003',
        name: '연도별 자격 취득 추이',
        target: '전체 지역',
        period: '2020-2024',
        status: 'Processing',
        createdAt: '2026-05-13 16:45',
    },
]

const reportTemplates: ReportTemplate[] = [
    {
        value: 'qualification-summary',
        label: '자격 취득 현황 요약',
        description: '취득자 수, 인기 자격군, 지역별 분포를 요약합니다.',
        metrics: {
            totalAcquirers: '18,420명',
            topRegion: '서울',
            growthRate: '+12.8%',
        },
    },
    {
        value: 'regional-analysis',
        label: '지역별 취득자 분석',
        description: '시도별 자격 취득 규모와 주요 자격군을 비교합니다.',
        metrics: {
            totalAcquirers: '41,320명',
            topRegion: '수도권',
            growthRate: '+9.6%',
        },
    },
    {
        value: 'yearly-trend',
        label: '연도별 자격 취득 추이',
        description: '선택한 자격군과 지역의 연도별 취득자 변화를 분석합니다.',
        metrics: {
            totalAcquirers: '68,900명',
            topRegion: '경기',
            growthRate: '+15.4%',
        },
    },
]

const periodOptions: SelectOption[] = [
    {
        value: '2024',
        label: '2024',
    },
    {
        value: '2021-2024',
        label: '2021-2024',
    },
    {
        value: '2020-2024',
        label: '2020-2024',
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
    const [reportType, setReportType] = useState('qualification-summary')
    const [period, setPeriod] = useState('2024')
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
            label: '총 취득자 수',
            value: selectedTemplate.metrics.totalAcquirers,
        },
        {
            label: '상위 지역',
            value: selectedTemplate.metrics.topRegion,
        },
        {
            label: '증가율',
            value: selectedTemplate.metrics.growthRate,
        },
    ]

    const getStatusLabel = (status: ReportStatus) => {
        return status === 'Ready' ? '완료' : '처리 중'
    }

    const handleGenerateReport = () => {
        const createdAt = new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date()).replace(',', '')

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
        window.alert(`${report.name} 다운로드를 시작합니다.`)
    }

    return (
        <section className="reports-page">
            <header className="page-header">
                <div>
                    <h1>리포트</h1>
                    <p>자격군, 지역, 분석 기간별 취득자 리포트를 생성하고 관리합니다.</p>
                </div>
            </header>

            <div className="reports-layout">
                <Card className="report-generator">
                    <div className="report-history-header">
                        <div className="chart-header">
                            <h2>리포트 생성</h2>
                            <p>리포트 유형, 지역, 분석 기간을 선택하세요.</p>
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
                    <p>최근 생성된 자격 통계 리포트입니다.</p>
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
                                생성된 리포트가 없습니다.
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
