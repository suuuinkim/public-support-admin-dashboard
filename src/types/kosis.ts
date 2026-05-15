export type KosisEmploymentRow = {
    ORG_ID: string
    TBL_ID: string
    TBL_NM: string
    ITM_ID: string
    ITM_NM: string
    C1: string
    C1_NM: string
    C1_OBJ_NM: string
    C2: string
    C2_NM: string
    C2_OBJ_NM: string
    PRD_SE: string
    PRD_DE: string
    DT: string
    UNIT_NM: string
    LST_CHN_DE: string
}

export type EmploymentSummary = {
    latestPeriod: string
    nationalRate: number
    selectedRegionRate: number | null
    yearlyChange: number | null
    genderGap: number | null
}

export type RegionEmploymentRank = {
    regionCode: string
    regionName: string
    rate: number
}

export type KosisDataSource = 'kosis' | 'fallback'

export type KosisEmploymentResponse = {
    source: KosisDataSource
    reason?: string
    rows: KosisEmploymentRow[]
}
