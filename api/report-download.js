import {fallbackEmploymentRows} from './fallbackEmploymentRows.js'

const KOSIS_URL = 'https://kosis.kr/openapi/Param/statisticsParameterData.do'

const CSV_HEADERS = [
  '\uB9AC\uD3EC\uD2B8\uBA85',
  '\uC870\uD68C\uC9C0\uC5ED',
  '\uC870\uD68C\uAE30\uAC04',
  '\uAE30\uC900\uC6D4',
  '\uC2DC\uB3C4',
  '\uC131\uBCC4',
  '\uACE0\uC6A9\uB960',
  '\uB2E8\uC704',
  '\uCD5C\uC885\uC218\uC815\uC77C',
]

function escapeCsv(value) {
  const text = String(value ?? '')
  return `"${text.replace(/"/g, '""')}"`
}

function getQueryValue(value, fallback) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback
  }

  return value ?? fallback
}

function getPeriodCode(period) {
  if (!period) {
    return null
  }

  if (/^\d{4}\.\d{2}$/.test(period)) {
    return period.replace('.', '')
  }

  if (/^\d{6}$/.test(period)) {
    return period
  }

  return null
}

function getLatestPeriods(rows, count) {
  return [...new Set(rows.map((row) => row.PRD_DE))]
    .filter(Boolean)
    .sort()
    .slice(-count)
}

function getPeriods(rows, period) {
  const periodCode = getPeriodCode(period)

  if (periodCode) {
    return [periodCode]
  }

  if (period?.includes('12')) {
    return getLatestPeriods(rows, 12)
  }

  return getLatestPeriods(rows, 48)
}

function isAllRegionTarget(target) {
  return (
    !target ||
    target === 'all-regions' ||
    target.toLowerCase() === 'all' ||
    target.includes('\uC804\uCCB4') ||
    target.includes('\uC804\uAD6D')
  )
}

function filterRows(rows, {target, period}) {
  const periods = getPeriods(rows, period)

  const filteredRows = rows.filter((row) => {
    const matchesPeriod = periods.includes(row.PRD_DE)
    const matchesRegion =
      isAllRegionTarget(target) ||
      row.C1_NM === target ||
      row.C1_NM?.includes(target)

    return matchesPeriod && matchesRegion
  })

  if (filteredRows.length > 0) {
    return filteredRows
  }

  return rows.filter((row) => periods.includes(row.PRD_DE))
}

async function fetchKosisRows() {
  const apiKey = process.env.KOSIS_API_KEY || process.env.VITE_KOSIS_API_KEY
  const orgId = process.env.KOSIS_ORG_ID || process.env.VITE_KOSIS_ORG_ID || '101'
  const tableId =
    process.env.KOSIS_EMPLOYMENT_TBL_ID ||
    process.env.VITE_KOSIS_EMPLOYMENT_TBL_ID ||
    'INH_1DA7014S_03'
  const itemId =
    process.env.KOSIS_EMPLOYMENT_ITEM_ID ||
    process.env.VITE_KOSIS_EMPLOYMENT_ITEM_ID ||
    'T90'

  if (!apiKey) {
    return fallbackEmploymentRows
  }

  const params = new URLSearchParams({
    method: 'getList',
    apiKey,
    itmId: `${itemId} `,
    objL1: 'ALL',
    objL2: '0 2 3 ',
    objL3: '',
    objL4: '',
    objL5: '',
    objL6: '',
    objL7: '',
    objL8: '',
    format: 'json',
    jsonVD: 'Y',
    prdSe: 'M',
    newEstPrdCnt: '48',
    outputFields:
      'ORG_ID TBL_ID TBL_NM OBJ_ID OBJ_NM OBJ_NM_ENG NM NM_ENG ITM_ID ITM_NM ITM_NM_ENG UNIT_NM UNIT_NM_ENG PRD_SE PRD_DE LST_CHN_DE ',
    orgId,
    tblId: tableId,
  })

  try {
    const response = await fetch(`${KOSIS_URL}?${params.toString()}`)

    if (!response.ok) {
      return fallbackEmploymentRows
    }

    const rows = await response.json()
    return Array.isArray(rows) ? rows : fallbackEmploymentRows
  } catch (error) {
    console.error('KOSIS report download failed', error)
    return fallbackEmploymentRows
  }
}

function createCsv(rows, {name, target, period}) {
  const body = rows.map((row) => [
    name,
    target,
    period,
    row.PRD_DE,
    row.C1_NM,
    row.C2_NM,
    row.DT,
    row.UNIT_NM,
    row.LST_CHN_DE,
  ])

  return [CSV_HEADERS, ...body]
    .map((line) => line.map(escapeCsv).join(','))
    .join('\n')
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({message: 'Method not allowed'})
    return
  }

  const name = getQueryValue(request.query.name, '\uACE0\uC6A9\uB960 \uB9AC\uD3EC\uD2B8')
  const target = getQueryValue(request.query.target, '\uC804\uCCB4 \uC9C0\uC5ED')
  const period = getQueryValue(request.query.period, '\uCD5C\uADFC 48\uAC1C\uC6D4')

  const rows = await fetchKosisRows()
  const filteredRows = filterRows(rows, {target, period})
  const csv = createCsv(filteredRows, {name, target, period})
  const filename = `employment-report-${Date.now()}.csv`

  response.setHeader('Content-Type', 'text/csv; charset=utf-8')
  response.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  response.status(200).send(`\uFEFF${csv}`)
}
