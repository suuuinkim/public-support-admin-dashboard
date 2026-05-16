import {useEffect, useState} from 'react'
import MonthlyChangePolarChart from '../components/charts/MonthlyChangePolarChart'
import GenderTrendAreaChart from '../components/charts/GenderTrendAreaChart'
import {
    createGenderMonthlyTrend,
    createMonthlyChangeTopFive,
    fetchEmploymentRows,
} from '../services/kosisService'
import type {EmploymentChangeRank, GenderMonthlyTrend} from '../types/kosis'

function Analytics() {
    const [changeTopFive, setChangeTopFive] = useState<EmploymentChangeRank[]>([])
    const [genderMonthlyTrend, setGenderMonthlyTrend] = useState<GenderMonthlyTrend[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setIsLoading(true)
        setErrorMessage('')

        fetchEmploymentRows()
            .then((data) => {
                setChangeTopFive(createMonthlyChangeTopFive(data.rows, '202604'))
                setGenderMonthlyTrend(createGenderMonthlyTrend(data.rows, '202604'))
            })
            .catch(() => {
                setChangeTopFive([])
                setGenderMonthlyTrend([])
                setErrorMessage('KOSIS 고용률 분석 데이터를 불러오지 못했습니다.')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <section className="analytics-page">
            <header className="page-header">
                <div>
                    <h1>분석</h1>
                    <p>같은 KOSIS 응답을 변화량과 성별 격차 관점으로 다시 분석합니다.</p>
                </div>
            </header>

            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}

            {isLoading ? (
                <div className="empty-table-message">분석 데이터를 불러오는 중입니다.</div>
            ) : (
                <div className="analytics-chart-grid">
                    <MonthlyChangePolarChart data={changeTopFive}/>
                    <GenderTrendAreaChart data={genderMonthlyTrend}/>
                </div>
            )}
        </section>
    )
}

export default Analytics
