import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from 'chart.js'
import type {ChartOptions, TooltipItem} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const rankColors = ['#166534', '#15803d', '#16a34a', '#4ade80', '#86efac']
const rankHoverColors = ['#14532d', '#166534', '#15803d', '#22c55e', '#4ade80']
const barAnimationDuration = 1600
const barAnimationDelay = 140

type BarAnimationContext = {
    type?: string
    dataIndex?: number
    index?: number
    chart: {
        scales: {
            x: {
                getPixelForValue: (value: number) => number
            }
        }
    }
}

function getAnimationIndex(context: unknown) {
    const animationContext = context as BarAnimationContext
    return animationContext.dataIndex ?? animationContext.index ?? 0
}

function getBarDelay(context: unknown) {
    const animationContext = context as BarAnimationContext

    if (animationContext.type !== 'data') {
        return 0
    }

    return getAnimationIndex(context) * barAnimationDelay
}

function getZeroPercentPixel(context: unknown) {
    const animationContext = context as BarAnimationContext
    return animationContext.chart.scales.x.getPixelForValue(0)
}

type RegionEmploymentBarChartProps = {
    data: {
        regionName: string
        rate: number
    }[]
}

function RegionEmploymentBarChart({data}: RegionEmploymentBarChartProps) {
    if (data.length === 0) {
        return <div className="empty-table-message">표시할 고용률 차트 데이터가 없습니다.</div>
    }

    const chartData = {
        labels: data.map((item) => item.regionName),
        datasets: [
            {
                label: '고용률',
                data: data.map((item) => item.rate),
                backgroundColor: data.map((_, index) => rankColors[index] ?? '#bbf7d0'),
                borderColor: data.map((_, index) => rankColors[index] ?? '#bbf7d0'),
                hoverBackgroundColor: data.map((_, index) => rankHoverColors[index] ?? '#86efac'),
                hoverBorderColor: '#052e16',
                hoverBorderWidth: 2,
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
                barThickness: 22,
                maxBarThickness: 28,
            },
        ],
    }

    const chartOptions: ChartOptions<'bar'> = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: barAnimationDuration,
            easing: 'easeOutCubic',
        },
        animations: {
            x: {
                type: 'number',
                from: getZeroPercentPixel,
                duration: barAnimationDuration,
                easing: 'easeOutCubic',
                delay: getBarDelay,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'y',
            intersect: true,
        },
        onHover: (event, activeElements) => {
            const canvas = event.native?.target as HTMLCanvasElement | undefined
            if (canvas) {
                canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
            }
        },
        plugins: {
            legend: {display: false},
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => `고용률 ${Number(context.raw).toFixed(1)}%`,
                },
            },
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {color: 'rgba(229,231,235,.5)'},
                border: {display: false},
                ticks: {
                    color: '#9ca3af',
                    font: {size: 11},
                    callback: (value: string | number) => `${value}%`,
                },
            },
            y: {
                grid: {display: false},
                border: {display: false},
                ticks: {
                    color: '#374151',
                    font: {size: 12, weight: 500 as const},
                },
            },
        },
    }

    return (
        <div className="chart-canvas-box ranking-chart-box">
            <Bar redraw data={chartData} options={chartOptions}/>
        </div>
    )
}

export default RegionEmploymentBarChart
