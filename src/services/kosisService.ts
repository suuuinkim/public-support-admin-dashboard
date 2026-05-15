import type {
    EmploymentSummary,
    KosisEmploymentRow,
    RegionEmploymentRank,
} from '../types/kosis'

const KOSIS_API_KEY = import.meta.env.VITE_KOSIS_API_KEY
const KOSIS_ORG_ID = import.meta.env.VITE_KOSIS_ORG_ID
const KOSIS_EMPLOYMENT_TBL_ID = import.meta.env.VITE_KOSIS_EMPLOYMENT_TBL_ID
const KOSIS_EMPLOYMENT_ITEM_ID = import.meta.env.VITE_KOSIS_EMPLOYMENT_ITEM_ID

const createEmploymentApiUrl = () => {
    const params = new URLSearchParams({
        method: 'getList',
        apiKey: KOSIS_API_KEY,
        itmId: `${KOSIS_EMPLOYMENT_ITEM_ID} `,
        objL1: 'ALL',
        objL2: 'ALL',
        objL3: '',
        objL4: '',
        objL5: '',
        objL6: '',
        objL7: '',
        objL8: '',
        format: 'json',
        jsonVD: 'Y',
        prdSe: 'Y',
        newEstPrdCnt: '3',
        outputFields:
            'ORG_ID TBL_ID TBL_NM OBJ_ID OBJ_NM OBJ_NM_ENG NM NM_ENG ITM_ID ITM_NM ITM_NM_ENG UNIT_NM UNIT_NM_ENG PRD_SE PRD_DE LST_CHN_DE',
        orgId: KOSIS_ORG_ID,
        tblId: KOSIS_EMPLOYMENT_TBL_ID,
    })

    return `https://kosis.kr/openapi/Param/statisticsParameterData.do?${params.toString()}`
}

export async function fetchEmploymentRows(): Promise<KosisEmploymentRow[]> {
    const response = await fetch(createEmploymentApiUrl())

    if (!response.ok) {
        throw new Error('KOSIS 고용률 데이터를 불러오지 못했습니다.')
    }

    return response.json()
}

function getLatestPeriod(rows: KosisEmploymentRow[]) {
    return rows
        .map((row) => row.PRD_DE)
        .sort((a, b) => Number(b) - Number(a))[0]
}

function toNumber(value: string) {
    return Number(value)
}

export function createEmploymentSummary(
    rows: KosisEmploymentRow[],
    selectedRegionName: string,
): EmploymentSummary {
    const latestPeriod = getLatestPeriod(rows)

    const nationalLatest = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM === '계' &&
            row.C2_NM === '계',
    )

    const selectedRegionLatest = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            row.C2_NM === '계',
    )

    const previousPeriod = rows
        .map((row) => row.PRD_DE)
        .filter((period) => period !== latestPeriod)
        .sort((a, b) => Number(b) - Number(a))[0]

    const selectedRegionPrevious = rows.find(
        (row) =>
            row.PRD_DE === previousPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            row.C2_NM === '계',
    )

    const maleLatest = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            row.C2_NM === '남자',
    )

    const femaleLatest = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            row.C2_NM === '여자',
    )

    const selectedRegionRate = selectedRegionLatest
        ? toNumber(selectedRegionLatest.DT)
        : null

    const previousRate = selectedRegionPrevious
        ? toNumber(selectedRegionPrevious.DT)
        : null

    const yearlyChange =
        selectedRegionRate !== null && previousRate !== null
            ? Number((selectedRegionRate - previousRate).toFixed(1))
            : null

    const genderGap =
        maleLatest && femaleLatest
            ? Number((toNumber(maleLatest.DT) - toNumber(femaleLatest.DT)).toFixed(1))
            : null

    return {
        latestPeriod,
        nationalRate: nationalLatest ? toNumber(nationalLatest.DT) : 0,
        selectedRegionRate,
        yearlyChange,
        genderGap,
    }
}

export function createRegionTopFive(rows: KosisEmploymentRow[]): RegionEmploymentRank[] {
    const latestPeriod = getLatestPeriod(rows)

    return rows
        .filter(
            (row) =>
                row.PRD_DE === latestPeriod &&
                row.C2_NM === '계' &&
                row.C1_NM !== '계',
        )
        .map((row) => ({
            regionCode: row.C1,
            regionName: row.C1_NM,
            rate: toNumber(row.DT),
        }))
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 5)
}
