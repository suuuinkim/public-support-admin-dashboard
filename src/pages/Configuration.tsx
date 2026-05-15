import {useState} from 'react'
import Card from '../components/common/Card'

const qualificationGroups = [
    '정보처리',
    '산업안전',
    '조리기능',
    '전기기술',
    '돌봄/복지',
    '데이터/AI',
]

const yearOptions = ['2026', '2025', '2024', '2023', '2022', '2021', '2020']

const regionCodes = [
    {
        code: '11',
        name: '서울',
        group: '수도권',
        enabled: true,
    },
    {
        code: '41',
        name: '경기',
        group: '수도권',
        enabled: true,
    },
    {
        code: '26',
        name: '부산',
        group: '남부권',
        enabled: true,
    },
    {
        code: '27',
        name: '대구',
        group: '남부권',
        enabled: false,
    },
    {
        code: '28',
        name: '인천',
        group: '수도권',
        enabled: false,
    },
]

function Configuration() {
    const [baseYear, setBaseYear] = useState('2026')
    const [startYear, setStartYear] = useState('2020')

    return (
        <section className="configuration-page">
            <header className="page-header">
                <div>
                    <h1>설정 관리</h1>
                    <p>관심 자격군, 분석 기준 연도, 지역 코드를 관리합니다.</p>
                </div>
            </header>

            <Card className="configuration-card">
                <div className="chart-header">
                    <h2>관심 자격군</h2>
                    <p>대시보드와 분석 화면에서 우선 조회할 자격군입니다.</p>
                </div>

                <div className="qualification-group-list">
                    {qualificationGroups.map((group) => (
                        <label key={group} className="qualification-group-item">
                            <input type="checkbox" defaultChecked/>
                            <span>{group}</span>
                        </label>
                    ))}
                </div>
            </Card>

            <Card className="configuration-card">
                <div className="chart-header">
                    <h2>분석 기준 연도</h2>
                    <p>통계 조회와 추이 분석에 사용할 기준 기간입니다.</p>
                </div>

                <div className="configuration-form-grid">
                    <label className="filter-field">
                        <span>기준 연도</span>
                        <select
                            value={baseYear}
                            onChange={(event) => setBaseYear(event.target.value)}
                        >
                            {yearOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="filter-field">
                        <span>비교 시작 연도</span>
                        <select
                            value={startYear}
                            onChange={(event) => setStartYear(event.target.value)}
                        >
                            {yearOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="configuration-summary-box">
                        <span>분석 기간</span>
                        <strong>{startYear} - {baseYear}</strong>
                    </div>
                </div>
            </Card>

            <Card className="configuration-card">
                <div className="chart-header">
                    <h2>지역 코드 설정</h2>
                    <p>외부 통계 API 조회에 사용할 지역 코드 목록입니다.</p>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>지역 코드</th>
                        <th>지역명</th>
                        <th>권역</th>
                        <th>사용 여부</th>
                    </tr>
                    </thead>

                    <tbody>
                    {regionCodes.map((region) => (
                        <tr key={region.code}>
                            <td>{region.code}</td>
                            <td>{region.name}</td>
                            <td>{region.group}</td>
                            <td>
                                <span
                                    className={
                                        region.enabled
                                            ? 'badge badge-default'
                                            : 'badge badge-secondary'
                                    }
                                >
                                    {region.enabled ? '사용' : '미사용'}
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </section>
    )
}

export default Configuration
