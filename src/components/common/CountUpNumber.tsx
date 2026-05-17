import {useEffect, useState} from 'react'

type CountUpNumberProps = {
    value: number
    suffix?: string
    duration?: number
    decimals?: number
}

function easeOutCubic(progress: number) {
    return 1 - Math.pow(1 - progress, 3)
}

function CountUpNumber({value, suffix = '', duration = 1200, decimals = 1}: CountUpNumberProps) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        let animationFrame = 0
        const startedAt = performance.now()

        const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1)
            setDisplayValue(value * easeOutCubic(progress))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(tick)
            }
        }

        animationFrame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(animationFrame)
    }, [duration, value])

    return <>{displayValue.toFixed(decimals)}{suffix}</>
}

export default CountUpNumber
