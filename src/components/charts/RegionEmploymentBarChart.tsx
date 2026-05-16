import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

type RegionEmploymentBarChartProps = {
    data: {
        regionName: string
        rate: number
    }[]
}

function RegionEmploymentBarChart({data}: RegionEmploymentBarChartProps) {
    if (data.length === 0) {
        return (
            <div className="empty-table-message">
                표시할 고용률 차트 데이터가 없습니다.
            </div>
        )
    }

    const chartData = {
        labels: data.map((item) => item.regionName),
        datasets: [
            {
                label: '고용률',
                data: data.map((item) => item.rate),
                backgroundColor: 'rgba(34, 197, 94, 0.72)',
                borderColor: '#22c55e',
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
                barThickness: 22,
                maxBarThickness: 28,
            },
        ],
    }

    const chartOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 4,
                right: 12,
                bottom: 4,
                left: 4,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context: any) => `고용률 ${context.raw}%`,
                },
            },
        },
        scales: {
            x: {
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
                    font: {
                        size: 11,
                    },
                    callback: (value: string | number) => `${value}%`,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: '#374151',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
            },
        },
    }

    return (
        <div className="chart-canvas-box">
            <Bar data={chartData} options={chartOptions}/>
        </div>
    )
}

export default RegionEmploymentBarChart
