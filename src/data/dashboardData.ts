export const dashboardSummaryByTarget = {
  'device-1': {
    certifiedPeople: '18,420명',
    qualificationItems: '1,248개 종목',
    growthRate: '64.8%',
  },
  'device-2': {
    certifiedPeople: '12,760명',
    qualificationItems: '938개 종목',
    growthRate: '58.3%',
  },
  'device-3': {
    certifiedPeople: '9,840명',
    qualificationItems: '812개 종목',
    growthRate: '52.1%',
  },
  'group-production': {
    certifiedPeople: '41,320명',
    qualificationItems: '2,486개 종목',
    growthRate: '67.4%',
  },
  'group-admin': {
    certifiedPeople: '27,580명',
    qualificationItems: '1,724개 종목',
    growthRate: '61.2%',
  },
}

export type DashboardTargetId = keyof typeof dashboardSummaryByTarget

export const filterTargets = [
  { value: 'device-1', label: '서울' },
  { value: 'device-2', label: '경기' },
  { value: 'device-3', label: '부산' },
  { value: 'group-production', label: '수도권' },
  { value: 'group-admin', label: '남부권' },
] as const

export const filterDevices = [
  { value: 'device-1', label: '서울' },
  { value: 'device-2', label: '경기' },
  { value: 'device-3', label: '부산' },
] as const

export const filterGroups = [
  { value: 'group-production', label: '수도권' },
  { value: 'group-admin', label: '남부권' },
] as const

export const qualificationSummaryCards = [
  {
    name: '종목',
    fullName: '등록 자격 종목',
    value: '1,248',
    unit: '개',
    change: '+5.2%',
    trend: 'up',
    status: '활성',
  },
  {
    name: '취득',
    fullName: '자격 취득자',
    value: '18,420',
    unit: '명',
    change: '+12.8%',
    trend: 'up',
    status: '증가',
  },
  {
    name: '지역',
    fullName: '분석 지역',
    value: '17',
    unit: '개 시도',
    change: '0.0%',
    trend: 'stable',
    status: '유지',
  },
  {
    name: '증가',
    fullName: '전년 대비 증가율',
    value: '64.8',
    unit: '%',
    change: '+3.6%',
    trend: 'up',
    status: '상승',
  },
] as const

export const qualificationCategoryData = [
  { label: '정보처리', value: 36 },
  { label: '산업안전', value: 24 },
  { label: '조리기능', value: 21 },
  { label: '전기기술', value: 19 },
] as const

export const yearlyTrendData = [
  { year: '2021', actual: 12400, baseline: 11200 },
  { year: '2022', actual: 13800, baseline: 12500 },
  { year: '2023', actual: 15600, baseline: 14200 },
  { year: '2024', actual: 18420, baseline: 16500 },
] as const
