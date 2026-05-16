const baseRow = {
  ORG_ID: '101',
  TBL_ID: 'INH_1DA7014S_03',
  TBL_NM: '고용률(시도)',
  ITM_ID: 'T90',
  ITM_NM: '고용률',
  ITM_NM_ENG: 'Employment to population ratio',
  C1_OBJ_NM: '시도별',
  C1_OBJ_NM_ENG: 'By province',
  C2_OBJ_NM: '성별',
  C2_OBJ_NM_ENG: 'By gender',
  PRD_SE: 'M',
  UNIT_NM: '%',
  UNIT_NM_ENG: '%',
}

const regions = [
  {code: '00', name: '계', nameEng: 'Total', total: 63.0, male: 70.5, female: 55.7, previous: 62.5},
  {code: '11', name: '서울특별시', nameEng: 'Seoul', total: 61.4, male: 67.2, female: 56.2, previous: 61.1},
  {code: '21', name: '부산광역시', nameEng: 'Busan', total: 58.2, male: 65.0, female: 52.0, previous: 58.3},
  {code: '22', name: '대구광역시', nameEng: 'Daegu', total: 58.4, male: 65.6, female: 51.6, previous: 58.0},
  {code: '23', name: '인천광역시', nameEng: 'Incheon', total: 63.3, male: 72.2, female: 54.6, previous: 63.0},
  {code: '24', name: '광주광역시', nameEng: 'Gwangju', total: 61.7, male: 68.9, female: 54.8, previous: 61.3},
  {code: '25', name: '대전광역시', nameEng: 'Daejeon', total: 61.7, male: 68.9, female: 54.6, previous: 61.4},
  {code: '26', name: '울산광역시', nameEng: 'Ulsan', total: 61.0, male: 71.7, female: 49.5, previous: 61.2},
  {code: '29', name: '세종특별자치시', nameEng: 'Sejong', total: 65.7, male: 72.2, female: 59.3, previous: 65.2},
  {code: '31', name: '경기도', nameEng: 'Gyeonggi-do', total: 63.5, male: 71.5, female: 55.5, previous: 63.3},
  {code: '32', name: '강원특별자치도', nameEng: 'Gangwon-do', total: 66.4, male: 73.0, female: 60.0, previous: 66.1},
  {code: '33', name: '충청북도', nameEng: 'Chungcheongbuk-do', total: 66.9, male: 74.5, female: 58.9, previous: 66.5},
  {code: '34', name: '충청남도', nameEng: 'Chungcheongnam-do', total: 67.8, male: 76.6, female: 58.4, previous: 67.4},
  {code: '35', name: '전북특별자치도', nameEng: 'Jeollabuk-do', total: 64.5, male: 71.3, female: 57.8, previous: 64.2},
  {code: '36', name: '전라남도', nameEng: 'Jeollanam-do', total: 65.9, male: 72.8, female: 58.8, previous: 65.5},
  {code: '37', name: '경상북도', nameEng: 'Gyeongsangbuk-do', total: 63.5, male: 71.9, female: 54.9, previous: 63.2},
  {code: '38', name: '경상남도', nameEng: 'Gyeongsangnam-do', total: 63.8, male: 71.6, female: 55.7, previous: 63.4},
  {code: '39', name: '제주도', nameEng: 'Jeju-do', total: 71.7, male: 74.8, female: 68.8, previous: 71.2},
]

function createRow(region, gender, period, value, changedDate) {
  return {
    ...baseRow,
    C1: region.code,
    C1_NM: region.name,
    C1_NM_ENG: region.nameEng,
    C2: gender.code,
    C2_NM: gender.name,
    C2_NM_ENG: gender.nameEng,
    PRD_DE: period,
    DT: String(value),
    LST_CHN_DE: changedDate,
  }
}

const latestRows = regions.flatMap((region) => [
  createRow(region, {code: '0', name: '계', nameEng: 'Total'}, '202604', region.total, '2026-04-30'),
  createRow(region, {code: '2', name: '남자', nameEng: 'Male'}, '202604', region.male, '2026-04-30'),
  createRow(region, {code: '3', name: '여자', nameEng: 'Female'}, '202604', region.female, '2026-04-30'),
])

const previousRows = regions.map((region) =>
  createRow(region, {code: '0', name: '계', nameEng: 'Total'}, '202603', region.previous, '2026-03-31'),
)

export const fallbackEmploymentRows = [...previousRows, ...latestRows]
