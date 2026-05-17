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
import type {ChartOptions} from 'chart.js'
import type {MonthlyEmploymentTrend} from '../../types/kosis'
import Card from '../common/Card'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend)

const totalDuration = 1800
const delayBetweenPoints = 130

type ProgressiveAnimationContext = {
    type?: string
    dataIndex?: number
    index?: number
    datasetIndex: number
    chart: {
        scales: {
            y: {
                min: number
                getPixelForValue: (value: number) => number
            }
        }
        getDatasetMeta: (datasetIndex: number) => {
            data: {
                getProps: (keys: string[], final: boolean) => {y: number}
            }[]
        }
    }
}

function getProgressiveIndex(context: unknown) {
    const animationContext = context as ProgressiveAnimationContext
    return animationContext.dataIndex ?? animationContext.index ?? 0
}

function getPointDelay(context: unknown) {
    const animationContext = context as ProgressiveAnimationContext

    if (animationContext.type !== 'data') {
        return 0
    }

    return getProgressiveIndex(context) * delayBetweenPoints
}

const previousY = (context: unknown) => {
    const animationContext = context as ProgressiveAnimationContext
    const index = getProgressiveIndex(context)

    if (index === 0) {
        return animationContext.chart.scales.y.getPixelForValue(animationContext.chart.scales.y.min)
    }

    const meta = animationContext.chart.getDatasetMeta(animationContext.datasetIndex)

    return meta.data[index - 1].getProps(['y'], true).y
}

type MonthlyTrendChartProps = {
    dataScope: string
    data: MonthlyEmploymentTrend[]
}

function YearlyTrendChart({dataScope, data}: MonthlyTrendChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const chartRef = useRef<Chart<'line'> | null>(null)

    useEffect(() => {
        if (!canvasRef.current || data.length === 0) return

        chartRef.current?.destroy()

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return

        const grad = ctx.createLinearGradient(0, 0, 0, 280)
        grad.addColorStop(0, 'rgba(34,197,94,0.26)')
        grad.addColorStop(1, 'rgba(34,197,94,0)')

        const chartOptions: ChartOptions<'line'> = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: totalDuration,
                easing: 'easeOutCubic',
            },
            animations: {
                x: {
                    type: 'number',
                    easing: 'linear',
                    duration: delayBetweenPoints,
                    from: Number.NaN,
                    delay: getPointDelay,
                },
                y: {
                    type: 'number',
                    easing: 'easeOutCubic',
                    duration: delayBetweenPoints * 1.8,
                    from: previousY,
                    delay: getPointDelay,
                },
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            onHover: (event, activeElements) => {
                const canvas = event.native?.target as HTMLCanvasElement | undefined
                if (canvas) {
                    canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {boxWidth: 12, color: '#6b7280', font: {size: 12}, padding: 16},
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#111827',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    padding: 12,
                    cornerRadius: 8,
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
        }

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
                        hoverBorderWidth: 3,
                        backgroundColor: grad,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 2,
                        pointHoverRadius: 6,
                        pointHitRadius: 12,
                        pointBackgroundColor: '#22c55e',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#166534',
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3,
                    },
                ],
            },
            options: chartOptions,
        })

        return () => {
            chartRef.current?.destroy()
            chartRef.current = null
        }
    }, [data])

    return (
        <Card className="chart-card">
            <div className="chart-header">
                <h2>월별 고용률 추이</h2>
                <p>{dataScope}</p>
            </div>

            <div className="monthly-trend-chart interactive-chart-box">
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
