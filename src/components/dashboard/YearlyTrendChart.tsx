import {useEffect, useRef} from 'react'
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js'
import type {MonthlyEmploymentTrend} from '../../types/kosis'
import Card from '../common/Card'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend)

type MonthlyTrendChartProps = {
    dataScope: string
    data: MonthlyEmploymentTrend[]
}

function YearlyTrendChart({dataScope, data}: MonthlyTrendChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const chartRef = useRef<Chart | null>(null)

    useEffect(() => {
        if (!canvasRef.current || data.length === 0) return

        chartRef.current?.destroy()

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return

        const grad = ctx.createLinearGradient(0, 0, 0, 280)
        grad.addColorStop(0, 'rgba(34,197,94,0.26)')
        grad.addColorStop(1, 'rgba(34,197,94,0)')

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((item) => item.month),
                datasets: [
                    {
                        label: '고용률',
                        data: data.map((item) => item.rate),
                        borderColor: '#22c55e',
                        borderWidth: 2,
                        backgroundColor: grad,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointBackgroundColor: '#22c55e',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {mode: 'index', intersect: false},
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {boxWidth: 12, color: '#6b7280', font: {size: 12}, padding: 16},
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${Number(context.raw).toFixed(1)}%`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {color: 'rgba(229,231,235,.45)'},
                        border: {display: false},
                        ticks: {color: '#9ca3af', font: {size: 11}, maxRotation: 0, autoSkip: true, maxTicksLimit: 8},
                    },
                    y: {
                        min: 0,
                        max: 100,
                        grid: {color: 'rgba(229,231,235,.5)'},
                        border: {display: false},
                        ticks: {
                            color: '#9ca3af',
                            font: {size: 11},
                            stepSize: 20,
                            callback: (value) => `${Number(value)}%`,
                        },
                    },
                },
            },
        })

        return () => {
            chartRef.current?.destroy()
        }
    }, [data])

    return (
        <Card className="chart-card">
            <div className="chart-header">
                <h2>월별 고용률 추이</h2>
                <p>{dataScope}</p>
            </div>

            <div className="monthly-trend-chart">
                {data.length === 0 ? (
                    <div className="empty-table-message">표시할 월별 고용률 데이터가 없습니다.</div>
                ) : (
                    <canvas ref={canvasRef}/>
                )}
            </div>
        </Card>
    )
}

export default YearlyTrendChart
