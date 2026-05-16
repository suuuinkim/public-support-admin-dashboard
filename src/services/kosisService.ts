import type {
    EmploymentSummary,
    KosisEmploymentResponse,
    KosisEmploymentRow,
    RegionEmploymentRank,
    GenderEmploymentRate,
    MonthlyEmploymentTrend,
    EmploymentChangeRank,
    GenderMonthlyTrend,
} from '../types/kosis'

export async function fetchEmploymentRows(): Promise<KosisEmploymentResponse> {
    const response = await fetch('/api/kosis-employment')

    if (!response.ok) {
        throw new Error('KOSIS 고용률 데이터를 불러오지 못했습니다.')
    }

    return response.json()
}

function getLatestPeriod(rows: KosisEmploymentRow[], basePeriod?: string) {
    return rows
        .map((row) => row.PRD_DE)
        .filter((period) => !basePeriod || Number(period) <= Number(basePeriod))
        .sort((a, b) => Number(b) - Number(a))[0]
}

function getPreviousPeriod(rows: KosisEmploymentRow[], selectedPeriod: string) {
    return rows
        .map((row) => row.PRD_DE)
        .filter((period) => Number(period) < Number(selectedPeriod))
        .sort((a, b) => Number(b) - Number(a))[0]
}

function toNumber(value: string) {
    return Number(value)
}

function isTotalGender(row: KosisEmploymentRow) {
    return row.C2 === '0' || row.C2_NM === '계' || row.C2_NM_ENG === 'Total'
}

function isMale(row: KosisEmploymentRow) {
    return row.C2 === '2' || row.C2_NM === '남자' || row.C2_NM_ENG === 'Male'
}

function isFemale(row: KosisEmploymentRow) {
    return row.C2 === '3' || row.C2_NM === '여자' || row.C2_NM_ENG === 'Female'
}

function isNational(row: KosisEmploymentRow) {
    return row.C1 === '00' || row.C1_NM === '계' || row.C1_NM_ENG === 'Total'
}

function isSelectedRegion(row: KosisEmploymentRow, selectedRegionName: string) {
    return row.C1_NM.includes(selectedRegionName)
}

export function createEmploymentSummary(
    rows: KosisEmploymentRow[],
    selectedRegionName: string,
    basePeriod?: string,
): EmploymentSummary {
    const latestPeriod = getLatestPeriod(rows, basePeriod)
    const previousPeriod = getPreviousPeriod(rows, latestPeriod)

    const nationalLatest = rows.find(
        (row) => row.PRD_DE === latestPeriod && isNational(row) && isTotalGender(row),
    )

    const selectedRegionLatest = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            isSelectedRegion(row, selectedRegionName) &&
            isTotalGender(row),
    )

    const selectedRegionPrevious = rows.find(
        (row) =>
            row.PRD_DE === previousPeriod &&
            isSelectedRegion(row, selectedRegionName) &&
            isTotalGender(row),
    )

    const maleLatest = rows.find(
        (row) => row.PRD_DE === latestPeriod && isSelectedRegion(row, selectedRegionName) && isMale(row),
    )

    const femaleLatest = rows.find(
        (row) => row.PRD_DE === latestPeriod && isSelectedRegion(row, selectedRegionName) && isFemale(row),
    )

    const selectedRegionRate = selectedRegionLatest ? toNumber(selectedRegionLatest.DT) : null
    const previousRate = selectedRegionPrevious ? toNumber(selectedRegionPrevious.DT) : null

    const monthlyChange =
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
        monthlyChange,
        genderGap,
    }
}

export function createRegionTopFive(rows: KosisEmploymentRow[], basePeriod?: string): RegionEmploymentRank[] {
    const latestPeriod = getLatestPeriod(rows, basePeriod)

    return rows
        .filter(
            (row) =>
                row.PRD_DE === latestPeriod &&
                isTotalGender(row) &&
                !isNational(row),
        )
        .map((row) => ({
            regionCode: row.C1,
            regionName: row.C1_NM,
            rate: toNumber(row.DT),
        }))
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 5)
}

export function createGenderEmploymentRates(
    rows: KosisEmploymentRow[],
    selectedRegionName: string,
    basePeriod?: string,
): GenderEmploymentRate[] {
    const latestPeriod = getLatestPeriod(rows, basePeriod)

    const total = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            (row.C2 === '0' || row.C2_NM === '계' || row.C2_NM_ENG === 'Total'),
    )

    const male = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            (row.C2 === '2' || row.C2_NM === '남자' || row.C2_NM_ENG === 'Male')
    )

    const female = rows.find(
        (row) =>
            row.PRD_DE === latestPeriod &&
            row.C1_NM.includes(selectedRegionName) &&
            (row.C2 === '3' || row.C2_NM === '여자' || row.C2_NM_ENG === 'Female')
    )

    return [
        {label: '전체', value: total ? Number(total.DT) : 0},
        {label: '남자', value: male ? Number(male.DT) : 0},
        {label: '여자', value: female ? Number(female.DT) : 0},
    ].filter((item) => item.value > 0)
}

export function createMonthlyEmploymentTrend(
    rows: KosisEmploymentRow[],
    selectedRegionName: string,
    range: string
): MonthlyEmploymentTrend[] {
    const monthCount = range === 'last-48-months' ? 48 : range === 'last-12-months' ? 12 : 1

    return rows
        .filter((row) =>
            isSelectedRegion(row, selectedRegionName) &&
            isTotalGender(row) &&
            row.PRD_DE &&
            row.DT
        )
        .sort((a,b) => a.PRD_DE.localeCompare(b.PRD_DE))
        .slice(-monthCount)
        .map((row) => ({
            month: `${row.PRD_DE.slice(0, 4)}.${row.PRD_DE.slice(4, 6)}`,
            rate: Number(row.DT),
        }))
}

export function createMonthlyChangeTopFive(
    rows: KosisEmploymentRow[],
    basePeriod?: string
): EmploymentChangeRank[] {
    const latestPeriod = getLatestPeriod(rows, basePeriod)
    const previousPeriod = getPreviousPeriod(rows, latestPeriod)

    return rows
        .filter((row) =>
            row.PRD_DE === latestPeriod &&
            isTotalGender(row) &&
            !isNational(row)
        )
        .map((currentRow) => {
            const previousRow = rows.find((row) =>
                row.PRD_DE === previousPeriod &&
                row.C1 === currentRow.C1 &&
                isTotalGender(row)
            )

            if (!previousRow) {
                return null
            }

            const currentRate = toNumber(currentRow.DT)
            const previousRate = toNumber(previousRow.DT)

            return {
                regionCode: currentRow.C1,
                regionName: currentRow.C1_NM,
                currentRate,
                previousRate,
                change: Number((currentRate - previousRate).toFixed(1)),
            }
        })
        .filter((item): item is EmploymentChangeRank => item !== null)
        .sort((a,b) => b.change - a.change)
        .slice(0,5)
}

export function createGenderMonthlyTrend(
    rows: KosisEmploymentRow[],
    basePeriod?: string,
    monthCount = 12,
): GenderMonthlyTrend[] {
    const latestPeriod = getLatestPeriod(rows, basePeriod)
    const periods = [...new Set(rows.map((row) => row.PRD_DE))]
        .filter((period) => Number(period) <= Number(latestPeriod))
        .sort((a, b) => Number(a) - Number(b))
        .slice(-monthCount)

    return periods.map((period) => {
        const periodRows = rows.filter((row) => row.PRD_DE === period && row.C1 === '00')
        const total = periodRows.find(isTotalGender)
        const male = periodRows.find(isMale)
        const female = periodRows.find(isFemale)

        return {
            month: `${period.slice(0, 4)}.${period.slice(4, 6)}`,
            totalRate: total ? toNumber(total.DT) : null,
            maleRate: male ? toNumber(male.DT) : null,
            femaleRate: female ? toNumber(female.DT) : null,
        }
    })
}
