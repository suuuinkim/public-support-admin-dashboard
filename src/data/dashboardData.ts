export const dashboardSummaryByTarget = {
    'device-1': {
        certifiedPeople: '61.5%',
        qualificationItems: '서울특별시',
        growthRate: '-0.2%p',
    },
    'device-2': {
        certifiedPeople: '63.8%',
        qualificationItems: '경기도',
        growthRate: '-0.3%p',
    },
    'device-3': {
        certifiedPeople: '58.4%',
        qualificationItems: '부산광역시',
        growthRate: '+0.6%p',
    },
    'group-production': {
        certifiedPeople: '62.8%',
        qualificationItems: '수도권',
        growthRate: '-0.1%p',
    },
    'group-admin': {
        certifiedPeople: '64.5%',
        qualificationItems: '남부권',
        growthRate: '+0.4%p',
    },
}

export type DashboardTargetId = keyof typeof dashboardSummaryByTarget

export const filterTargets = [
    {value: 'device-1', label: '서울'},
    {value: 'device-2', label: '경기'},
    {value: 'device-3', label: '부산'},
    {value: 'group-production', label: '수도권'},
    {value: 'group-admin', label: '남부권'},
] as const

export const filterDevices = [
    {value: 'device-1', label: '서울'},
    {value: 'device-2', label: '경기'},
    {value: 'device-3', label: '부산'},
] as const

export const filterGroups = [
    {value: 'group-production', label: '수도권'},
    {value: 'group-admin', label: '남부권'},
] as const

export const qualificationSummaryCards = [
    {
        name: '지표',
        fullName: 'KOSIS 고용률 지표',
        value: '1',
        unit: '개',
        change: 'API',
        trend: 'stable',
        status: '연동',
    },
    {
        name: '지역',
        fullName: '분석 대상 시도',
        value: '17',
        unit: '개 시도',
        change: '전국',
        trend: 'stable',
        status: '유지',
    },
    {
        name: '기준',
        fullName: '최신 조회 연도',
        value: '2025',
        unit: '년',
        change: '+1년',
        trend: 'up',
        status: '최신',
    },
    {
        name: '출처',
        fullName: '공공데이터 통계',
        value: 'KOSIS',
        unit: '',
        change: 'API',
        trend: 'stable',
        status: '정상',
    },
] as const

export const qualificationCategoryData = [
    {label: '전체', value: 63},
    {label: '남자', value: 71},
    {label: '여자', value: 55},
    {label: '선택 지역', value: 62},
] as const

export const yearlyTrendData = [
    {year: '2022', actual: 61.9, baseline: 61.3},
    {year: '2023', actual: 62.6, baseline: 61.9},
    {year: '2024', actual: 62.7, baseline: 62.1},
    {year: '2025', actual: 62.9, baseline: 62.4},
] as const
