import {fallbackEmploymentRows} from './fallbackEmploymentRows.js'

const KOSIS_URL = 'http://kosis.kr/openapi/Param/statisticsParameterData.do'
const FETCH_TIMEOUT_MS = 10000
const RETRY_COUNT = 2

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url) {
  let lastError

  for (let attempt = 0; attempt <= RETRY_COUNT; attempt += 1) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const result = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json,text/plain,*/*',
          'User-Agent': 'public-support-admin-dashboard/1.0',
        },
      })

      clearTimeout(timeoutId)
      return result
    } catch (error) {
      clearTimeout(timeoutId)
      lastError = error

      if (attempt < RETRY_COUNT) {
        await sleep(500 * (attempt + 1))
      }
    }
  }

  throw lastError
}

function sendFallback(response, reason) {
  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600')
  response.status(200).json({
    source: 'fallback',
    reason,
    rows: fallbackEmploymentRows,
  })
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({message: 'Method not allowed'})
    return
  }

  const apiKey = process.env.KOSIS_API_KEY || process.env.VITE_KOSIS_API_KEY
  const orgId = process.env.KOSIS_ORG_ID || process.env.VITE_KOSIS_ORG_ID || '101'
  const tableId =
    process.env.KOSIS_EMPLOYMENT_TBL_ID ||
    process.env.VITE_KOSIS_EMPLOYMENT_TBL_ID ||
    'INH_1DA7014S_03'
  const itemId = process.env.KOSIS_EMPLOYMENT_ITEM_ID || process.env.VITE_KOSIS_EMPLOYMENT_ITEM_ID || 'T90'

  if (!apiKey) {
    sendFallback(response, 'KOSIS API key is not configured')
    return
  }

  const params = new URLSearchParams({
    method: 'getList',
    apiKey,
    itmId: itemId,
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
    orgId,
    tblId: tableId,
  })

  const kosisApiUrl = `${KOSIS_URL}?${params.toString()}`
  let kosisResponse

  try {
    kosisResponse = await fetchWithRetry(kosisApiUrl)
  } catch (error) {
    console.error('KOSIS fetch failed', error)
    sendFallback(response, error instanceof Error ? error.message : 'KOSIS connection failed')
    return
  }

  if (!kosisResponse.ok) {
    sendFallback(response, `KOSIS responded with HTTP ${kosisResponse.status}`)
    return
  }

  const rows = await kosisResponse.json()

  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  response.status(200).json({
    source: 'kosis',
    rows,
  })
}
