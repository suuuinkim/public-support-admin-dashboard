export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({message: 'Method not allowed'})
    return
  }

  response.status(200).json({
    KOSIS_API_KEY: Boolean(process.env.KOSIS_API_KEY),
    KOSIS_ORG_ID: process.env.KOSIS_ORG_ID || null,
    KOSIS_EMPLOYMENT_TBL_ID: process.env.KOSIS_EMPLOYMENT_TBL_ID || null,
    KOSIS_EMPLOYMENT_ITEM_ID: process.env.KOSIS_EMPLOYMENT_ITEM_ID || null,
    VITE_KOSIS_API_KEY: Boolean(process.env.VITE_KOSIS_API_KEY),
    VITE_KOSIS_ORG_ID: process.env.VITE_KOSIS_ORG_ID || null,
    VITE_KOSIS_EMPLOYMENT_TBL_ID: process.env.VITE_KOSIS_EMPLOYMENT_TBL_ID || null,
    VITE_KOSIS_EMPLOYMENT_ITEM_ID: process.env.VITE_KOSIS_EMPLOYMENT_ITEM_ID || null,
    apiKeyLength: process.env.KOSIS_API_KEY?.length ?? 0,
    viteApiKeyLength: process.env.VITE_KOSIS_API_KEY?.length ?? 0,
  })
}
