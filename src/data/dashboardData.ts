export const dashboardSummaryByTarget = {
    seoul: {
        certifiedPeople: '61.4%',
        qualificationItems: '서울특별시',
        growthRate: '+0.3%p',
    },
    gyeonggi: {
        certifiedPeople: '63.5%',
        qualificationItems: '경기도',
        growthRate: '+0.2%p',
    },
    busan: {
        certifiedPeople: '58.2%',
        qualificationItems: '부산광역시',
        growthRate: '-0.1%p',
    },
    'capital-area': {
        certifiedPeople: '63.4%',
        qualificationItems: '수도권',
        growthRate: '+0.2%p',
    },
    'chungcheong-area': {
        certifiedPeople: '67.3%',
        qualificationItems: '충청권',
        growthRate: '+0.4%p',
    },
}

export type DashboardTargetId = keyof typeof dashboardSummaryByTarget

export const regionOptions = [
    {value: 'seoul', label: '서울', kosisName: '서울특별시'},
    {value: 'gyeonggi', label: '경기', kosisName: '경기도'},
    {value: 'busan', label: '부산', kosisName: '부산광역시'},
] as const

export const areaOptions = [
    {value: 'capital-area', label: '수도권', kosisName: '경기도'},
    {value: 'chungcheong-area', label: '충청권', kosisName: '충청남도'},
] as const

export const targetOptions = [...regionOptions, ...areaOptions] as const

export const qualificationSummaryCards = [
    {
        name: '지표',
        fullName: 'KOSIS 고용률(시도)',
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
        fullName: '최신 조회 월',
        value: '2026.04',
        unit: '',
        change: '최근 48개월',
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
    {label: '남자', value: 70.5},
    {label: '여자', value: 55.7},
    {label: '선택 지역', value: 61.4},
] as const

export const monthlyTrendData = [
    {month: '2022.05', actual: 61.2, baseline: 60.8},
    {month: '2022.06', actual: 61.5, baseline: 60.9},
    {month: '2022.07', actual: 61.7, baseline: 61.0},
    {month: '2022.08', actual: 61.6, baseline: 61.0},
    {month: '2022.09', actual: 61.8, baseline: 61.1},
    {month: '2022.10', actual: 61.9, baseline: 61.2},
    {month: '2022.11', actual: 62.0, baseline: 61.2},
    {month: '2022.12', actual: 61.9, baseline: 61.3},
    {month: '2023.01', actual: 60.3, baseline: 61.3},
    {month: '2023.02', actual: 60.8, baseline: 61.3},
    {month: '2023.03', actual: 61.4, baseline: 61.4},
    {month: '2023.04', actual: 62.1, baseline: 61.4},
    {month: '2023.05', actual: 62.5, baseline: 61.5},
    {month: '2023.06', actual: 62.7, baseline: 61.5},
    {month: '2023.07', actual: 62.8, baseline: 61.6},
    {month: '2023.08', actual: 62.6, baseline: 61.6},
    {month: '2023.09', actual: 62.8, baseline: 61.7},
    {month: '2023.10', actual: 62.9, baseline: 61.7},
    {month: '2023.11', actual: 63.0, baseline: 61.8},
    {month: '2023.12', actual: 62.9, baseline: 61.8},
    {month: '2024.01', actual: 61.0, baseline: 61.9},
    {month: '2024.02', actual: 61.4, baseline: 61.9},
    {month: '2024.03', actual: 62.0, baseline: 62.0},
    {month: '2024.04', actual: 62.7, baseline: 62.0},
    {month: '2024.05', actual: 63.0, baseline: 62.1},
    {month: '2024.06', actual: 63.2, baseline: 62.1},
    {month: '2024.07', actual: 63.3, baseline: 62.1},
    {month: '2024.08', actual: 63.1, baseline: 62.2},
    {month: '2024.09', actual: 63.2, baseline: 62.2},
    {month: '2024.10', actual: 63.3, baseline: 62.3},
    {month: '2024.11', actual: 63.4, baseline: 62.3},
    {month: '2024.12', actual: 63.3, baseline: 62.4},
    {month: '2025.01', actual: 61.2, baseline: 62.4},
    {month: '2025.02', actual: 61.8, baseline: 62.4},
    {month: '2025.03', actual: 62.5, baseline: 62.5},
    {month: '2025.04', actual: 62.9, baseline: 62.5},
    {month: '2025.05', actual: 63.4, baseline: 62.6},
    {month: '2025.06', actual: 63.6, baseline: 62.6},
    {month: '2025.07', actual: 63.7, baseline: 62.7},
    {month: '2025.08', actual: 63.5, baseline: 62.7},
    {month: '2025.09', actual: 63.6, baseline: 62.8},
    {month: '2025.10', actual: 63.7, baseline: 62.8},
    {month: '2025.11', actual: 63.8, baseline: 62.9},
    {month: '2025.12', actual: 63.7, baseline: 62.9},
    {month: '2026.01', actual: 61.6, baseline: 62.9},
    {month: '2026.02', actual: 62.0, baseline: 63.0},
    {month: '2026.03', actual: 62.5, baseline: 63.0},
    {month: '2026.04', actual: 63.0, baseline: 63.0},
] as const
