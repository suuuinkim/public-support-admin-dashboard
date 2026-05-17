export type SupportProject = {
    id: string
    name: string
    owner: string
    status: '모집중' | '심사중' | '종료'
    budget: string
    applicants: number
}

export type ApplicationItem = {
    id: string
    applicant: string
    projectName: string
    region: string
    status: '접수' | '검토중' | '승인' | '반려'
    submittedAt: string
}

export const mockProjects: SupportProject[] = [
    {id: 'PRJ-2026-001', name: '청년 고용 촉진 지원사업', owner: '지원사업운영팀', status: '모집중', budget: '12.4억', applicants: 248},
    {id: 'PRJ-2026-002', name: '지역 일자리 전환 지원사업', owner: '고용정책팀', status: '심사중', budget: '8.7억', applicants: 136},
    {id: 'PRJ-2026-003', name: '중소기업 채용 장려금', owner: '기업지원팀', status: '종료', budget: '19.2억', applicants: 512},
]

export const mockApplications: ApplicationItem[] = [
    {id: 'APP-2026-1031', applicant: '서울청년센터', projectName: '청년 고용 촉진 지원사업', region: '서울', status: '검토중', submittedAt: '2026-05-17 10:12'},
    {id: 'APP-2026-1028', applicant: '경기일자리재단', projectName: '지역 일자리 전환 지원사업', region: '경기', status: '접수', submittedAt: '2026-05-16 17:44'},
    {id: 'APP-2026-1014', applicant: '부산상공회의소', projectName: '중소기업 채용 장려금', region: '부산', status: '승인', submittedAt: '2026-05-15 09:35'},
    {id: 'APP-2026-1009', applicant: '대구고용센터', projectName: '청년 고용 촉진 지원사업', region: '대구', status: '반려', submittedAt: '2026-05-14 16:18'},
]

export function fetchMockProjects(): Promise<SupportProject[]> {
    return new Promise((resolve) => window.setTimeout(() => resolve(mockProjects), 180))
}

export function fetchMockApplications(): Promise<ApplicationItem[]> {
    return new Promise((resolve) => window.setTimeout(() => resolve(mockApplications), 180))
}
