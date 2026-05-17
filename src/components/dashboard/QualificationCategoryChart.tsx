import {useEffect, useMemo, useRef} from 'react'
import {ArcElement, Chart, Legend, Tooltip} from 'chart.js'
import type {ChartOptions} from 'chart.js'
import Card from '../common/Card'
import CountUpNumber from '../common/CountUpNumber'
import type {GenderEmploymentRate} from '../../types/kosis'

Chart.register(ArcElement, Tooltip, Legend)

type QualificationCategoryChartProps = {
    targetName: string
    period: string
    data: GenderEmploymentRate[]
}

const genderColors: Record<string, string> = {
    전체: '#176b87',
    남자: '#22c55e',
    여자: '#3b82f6',
}

const genderHoverColors: Record<string, string> = {
    전체: '#0f4f66',
    남자: '#16a34a',
    여자: '#2563eb',
}

function QualificationCategoryChart({targetName, period, data}: QualificationCategoryChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const chartRef = useRef<Chart<'doughnut'> | null>(null)
    const totalRate = data.find((item) => item.label === '전체')?.value
    const segmentData = useMemo(() => {
        const genderOnly = data.filter((item) => item.label !== '전체')
        return genderOnly.length > 0 ? genderOnly : data
    }, [data])

    useEffect(() => {
        if (!canvasRef.current || segmentData.length === 0) return

        chartRef.current?.destroy()

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return

        const chartOptions: ChartOptions<'doughnut'> = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '55%',
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1200,
                easing: 'easeOutCubic',
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
                    labels: {
                        padding: 14,
                        boxWidth: 12,
                        color: '#6b7280',
                        font: {size: 12},
                    },
                },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => `${context.label}: ${Number(context.raw).toFixed(1)}%`,
                    },
                },
            },
        }

        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: segmentData.map((item) => item.label),
                datasets: [
                    {
                        data: segmentData.map((item) => item.value),
                        backgroundColor: segmentData.map((item) => genderColors[item.label] ?? '#94a3b8'),
                        hoverBackgroundColor: segmentData.map((item) => genderHoverColors[item.label] ?? '#64748b'),
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        hoverBorderWidth: 3,
                    },
                ],
            },
            options: chartOptions,
        })

        return () => {
            chartRef.current?.destroy()
            chartRef.current = null
        }
    }, [segmentData])

    return (
        <Card className="chart-card">
            <div className="chart-header">
                <h2>성별 고용률 구성</h2>
                <p>{targetName} / {period}</p>
            </div>

            {segmentData.length === 0 ? (
                <div className="empty-table-message">표시할 성별 고용률 데이터가 없습니다.</div>
            ) : (
                <div className="gender-donut-layout">
                    <div className="gender-donut-chart interactive-chart-box">
                        <canvas ref={canvasRef}/>
                        <div className="gender-donut-center">
                            <span>전체</span>
                            <strong>
                                {totalRate !== undefined ? (
                                    <CountUpNumber value={totalRate} suffix="%" decimals={1}/>
                                ) : '-'}
                            </strong>
                        </div>
                    </div>

                    <div className="gender-donut-summary">
                        {data.map((item) => (
                            <div key={item.label} className="gender-donut-row">
                                <span>
                                    <i style={{backgroundColor: genderColors[item.label] ?? '#94a3b8'}}/>
                                    {item.label}
                                </span>
                                <strong>
                                    <CountUpNumber value={item.value} suffix="%" decimals={1}/>
                                </strong>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    )
}

export default QualificationCategoryChart
