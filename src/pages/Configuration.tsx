import {useState} from 'react'
import Card from '../components/common/Card'

const metricOptions = [
    {value: 'employment-rate', label: '고용률', status: 'API 연동'},
    {value: 'unemployment-rate', label: '실업률', status: '준비 중'},
    {value: 'employed-count', label: '취업자 수', status: '준비 중'},
]

const monthOptions = ['2026.04', '2026.03', '최근 12개월', '최근 48개월']

const regionCodes = [
    {code: '00', name: '전국', memo: '전국 합계'},
    {code: '11', name: '서울특별시', memo: '수도권'},
    {code: '21', name: '부산광역시', memo: '영남권'},
    {code: '22', name: '대구광역시', memo: '영남권'},
    {code: '23', name: '인천광역시', memo: '수도권'},
    {code: '31', name: '경기도', memo: '수도권'},
]

function Configuration() {
    const [defaultMetric, setDefaultMetric] = useState('employment-rate')
    const [baseMonth, setBaseMonth] = useState('2026.04')
    const [defaultRegionCode, setDefaultRegionCode] = useState('11')

    const selectedMetric = metricOptions.find((metric) => metric.value === defaultMetric)
    const selectedRegion = regionCodes.find((region) => region.code === defaultRegionCode)

    return (
        <section className="configuration-page">
            <header className="page-header">
                <div>
                    <h1>Configuration</h1>
                    <p>KOSIS 고용 통계 조회에 사용할 기본 지표, 기준 월, 지역 코드를 설정합니다.</p>
                </div>
            </header>

            <div className="configuration-grid">
                <Card className="configuration-card">
                    <div className="chart-header">
                        <h2>기본 지표 설정</h2>
                        <p>현재 화면에서 우선 조회할 고용 통계 지표입니다.</p>
                    </div>

                    <div className="configuration-form-grid">
                        <label className="filter-field">
                            <span>기본 지표</span>
                            <select value={defaultMetric} onChange={(event) => setDefaultMetric(event.target.value)}>
                                {metricOptions.map((metric) => (
                                    <option key={metric.value} value={metric.value}>
                                        {metric.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="configuration-summary-box">
                            <span>연동 상태</span>
                            <strong>{selectedMetric?.status}</strong>
                            <p>현재 KOSIS API의 고용률 지표를 우선 연동합니다.</p>
                        </div>
                    </div>
                </Card>

                <Card className="configuration-card">
                    <div className="chart-header">
                        <h2>조회 기간 설정</h2>
                        <p>리포트와 분석 화면에서 기본으로 사용할 기준 월입니다.</p>
                    </div>

                    <div className="configuration-form-grid">
                        <label className="filter-field">
                            <span>기준 월</span>
                            <select value={baseMonth} onChange={(event) => setBaseMonth(event.target.value)}>
                                {monthOptions.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="configuration-summary-box">
                            <span>현재 기준</span>
                            <strong>{baseMonth}</strong>
                            <p>KOSIS 응답 데이터의 최신 월을 화면 기준으로 사용합니다.</p>
                        </div>
                    </div>
                </Card>

                <Card className="configuration-card">
                    <div className="chart-header">
                        <h2>지역 코드 설정</h2>
                        <p>KOSIS 시도별 고용률 데이터의 지역 코드입니다.</p>
                    </div>

                    <div className="configuration-form-grid">
                        <label className="filter-field">
                            <span>기본 지역</span>
                            <select
                                value={defaultRegionCode}
                                onChange={(event) => setDefaultRegionCode(event.target.value)}
                            >
                                {regionCodes.map((region) => (
                                    <option key={region.code} value={region.code}>
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="configuration-summary-box">
                            <span>선택 지역 코드</span>
                            <strong>{selectedRegion?.code}</strong>
                            <p>{selectedRegion?.name} / {selectedRegion?.memo}</p>
                        </div>
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>지역 코드</th>
                            <th>지역명</th>
                            <th>권역</th>
                        </tr>
                        </thead>
                        <tbody>
                        {regionCodes.map((region) => (
                            <tr key={region.code}>
                                <td>{region.code}</td>
                                <td>{region.name}</td>
                                <td>{region.memo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </section>
    )
}

export default Configuration
