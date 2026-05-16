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

const periods = [
  '202205', '202206', '202207', '202208', '202209', '202210', '202211', '202212',
  '202301', '202302', '202303', '202304', '202305', '202306', '202307', '202308', '202309', '202310', '202311', '202312',
  '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408', '202409', '202410', '202411', '202412',
  '202501', '202502', '202503', '202504', '202505', '202506', '202507', '202508', '202509', '202510', '202511', '202512',
  '202601', '202602', '202603', '202604',
]

const regions = [
  {code: '00', name: '계', nameEng: 'Total', total: 63.0, male: 70.5, female: 55.7},
  {code: '11', name: '서울특별시', nameEng: 'Seoul', total: 61.4, male: 67.2, female: 56.2},
  {code: '21', name: '부산광역시', nameEng: 'Busan', total: 58.2, male: 65.0, female: 52.0},
  {code: '22', name: '대구광역시', nameEng: 'Daegu', total: 58.4, male: 65.6, female: 51.6},
  {code: '23', name: '인천광역시', nameEng: 'Incheon', total: 63.3, male: 72.2, female: 54.6},
  {code: '24', name: '광주광역시', nameEng: 'Gwangju', total: 61.7, male: 68.9, female: 54.8},
  {code: '25', name: '대전광역시', nameEng: 'Daejeon', total: 61.7, male: 68.9, female: 54.6},
  {code: '26', name: '울산광역시', nameEng: 'Ulsan', total: 61.0, male: 71.7, female: 49.5},
  {code: '29', name: '세종특별자치시', nameEng: 'Sejong', total: 65.7, male: 72.2, female: 59.3},
  {code: '31', name: '경기도', nameEng: 'Gyeonggi-do', total: 63.5, male: 71.5, female: 55.5},
  {code: '32', name: '강원특별자치도', nameEng: 'Gangwon-do', total: 66.4, male: 73.0, female: 60.0},
  {code: '33', name: '충청북도', nameEng: 'Chungcheongbuk-do', total: 66.9, male: 74.5, female: 58.9},
  {code: '34', name: '충청남도', nameEng: 'Chungcheongnam-do', total: 67.8, male: 76.6, female: 58.4},
  {code: '35', name: '전북특별자치도', nameEng: 'Jeollabuk-do', total: 64.5, male: 71.3, female: 57.8},
  {code: '36', name: '전라남도', nameEng: 'Jeollanam-do', total: 65.9, male: 72.8, female: 58.8},
  {code: '37', name: '경상북도', nameEng: 'Gyeongsangbuk-do', total: 63.5, male: 71.9, female: 54.9},
  {code: '38', name: '경상남도', nameEng: 'Gyeongsangnam-do', total: 63.8, male: 71.6, female: 55.7},
  {code: '39', name: '제주도', nameEng: 'Jeju-do', total: 71.7, male: 74.8, female: 68.8},
]

const genders = [
  {code: '0', name: '계', nameEng: 'Total', key: 'total'},
  {code: '2', name: '남자', nameEng: 'Male', key: 'male'},
  {code: '3', name: '여자', nameEng: 'Female', key: 'female'},
]

function getMonthDrift(index) {
  const progress = index / (periods.length - 1)
  const seasonal = Math.sin((index % 12) / 12 * Math.PI * 2) * 0.5
  return (progress - 1) * 1.8 + seasonal
}

function createRow(region, gender, period, periodIndex) {
  const value = Number((region[gender.key] + getMonthDrift(periodIndex)).toFixed(1))
  const year = period.slice(0, 4)
  const month = period.slice(4, 6)

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
    LST_CHN_DE: `${year}-${month}-30`,
  }
}

export const fallbackEmploymentRows = periods.flatMap((period, periodIndex) =>
  regions.flatMap((region) =>
    genders.map((gender) => createRow(region, gender, period, periodIndex)),
  ),
)
