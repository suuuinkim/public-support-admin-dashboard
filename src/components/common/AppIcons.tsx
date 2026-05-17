import type {ReactNode} from 'react'

export type IconProps = {
    className?: string
}

function IconBase({children, className}: {children: ReactNode; className?: string}) {
    return (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    )
}

export function DashboardIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
        </IconBase>
    )
}

export function ChartIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M4 19V5"/>
            <path d="M4 19H20"/>
            <path d="M7 15l4-4 3 2 5-6"/>
        </IconBase>
    )
}

export function ProjectIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M3 7h18"/>
            <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
            <rect x="4" y="7" width="16" height="13" rx="2"/>
        </IconBase>
    )
}

export function ApplicationsIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M9 14l2 2 4-5"/>
        </IconBase>
    )
}

export function UsersIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </IconBase>
    )
}

export function ShieldIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/>
            <path d="M9 12l2 2 4-5"/>
        </IconBase>
    )
}

export function SettingsIcon({className}: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.48.52.86 1 1h.6a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z"/>
        </IconBase>
    )
}
