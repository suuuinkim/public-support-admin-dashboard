const KOSIS_URL = 'https://kosis.kr/openapi/Param/statisticsParameterData.do'

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
    response.status(500).json({message: 'KOSIS API key is not configured'})
    return
  }

  const params = new URLSearchParams({
    method: 'getList',
    apiKey,
    itmId: `${itemId} `,
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

  const kosisResponse = await fetch(`${KOSIS_URL}?${params.toString()}`)

  if (!kosisResponse.ok) {
    response.status(kosisResponse.status).json({message: 'Failed to fetch KOSIS employment data'})
    return
  }

  const data = await kosisResponse.json()

  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  response.status(200).json(data)
}
