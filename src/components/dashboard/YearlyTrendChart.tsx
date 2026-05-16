import {useEffect, useRef} from 'react'
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js'
import {monthlyTrendData} from '../../data/dashboardData'
import Card from '../common/Card'

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend)

type MonthlyTrendChartProps = {
    dataScope: string
}

function YearlyTrendChart({dataScope}: MonthlyTrendChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const chartRef = useRef<Chart | null>(null)
    const labels = monthlyTrendData.map((item) => item.month)
    const actualRates = monthlyTrendData.map((item) => Number(item.actual))
    const baselineRates = monthlyTrendData.map((item) => Number(item.baseline))

    useEffect(() => {
        if (!canvasRef.current) return

        chartRef.current?.destroy()

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return

        const grad = ctx.createLinearGradient(0, 0, 0, 280)
        grad.addColorStop(0, 'rgba(34,197,94,0.26)')
        grad.addColorStop(1, 'rgba(34,197,94,0)')

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: '고용률',
                        data: actualRates,
                        borderColor: '#22c55e',
                        borderWidth: 2,
                        backgroundColor: grad,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointBackgroundColor: '#22c55e',
                    },
                    {
                        label: '기준선',
                        data: baselineRates,
                        borderColor: '#94a3b8',
                        borderDash: [5, 5],
                        borderWidth: 1.5,
                        backgroundColor: 'transparent',
                        fill: false,
                        tension: 0.35,
                        pointRadius: 0,
                        pointHoverRadius: 3,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            color: '#6b7280',
                            font: {size: 12},
                            padding: 16,
                        },
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
                        grid: {
                            color: 'rgba(229,231,235,.45)',
                        },
                        border: {
                            display: false,
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: {size: 11},
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 8,
                        },
                    },
                    y: {
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(229,231,235,.5)',
                        },
                        border: {
                            display: false,
                        },
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
    }, [])

    return (
        <Card className="chart-card">
            <div className="chart-header">
                <div>
                    <h2>월별 고용률 추이</h2>
                    <p>{dataScope}</p>
                </div>
            </div>

            <div className="monthly-trend-chart">
                <canvas ref={canvasRef}/>
            </div>
        </Card>
    )
}

export default YearlyTrendChart
