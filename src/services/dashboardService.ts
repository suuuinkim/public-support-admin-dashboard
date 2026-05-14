import {
    dashboardSummaryByTarget
    , type DashboardTargetId
} from "../data/dashboardData"

export type DashboardSummary = {
    consumption: string
    peakDemand: string
    powerFactor: string
}

export function getDashboardSummary(targetId: string) : DashboardSummary {
    const summary = dashboardSummaryByTarget[targetId as DashboardTargetId]

    if (!summary) {
        throw new Error('Dashboard summary not found')
    }
    return summary
}

export function fetchDashboardSummary(targetId: string) : Promise<DashboardSummary> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                resolve(getDashboardSummary(targetId))
            } catch (error) {
                reject(error)
            }
        }, 300)
    })
}