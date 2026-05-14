export const dashboardSummaryByTarget = {
  'device-1': {
    consumption: '12,485 kWh',
    peakDemand: '1,204 kW',
    powerFactor: '0.96',
  },
  'device-2': {
    consumption: '9,840 kWh',
    peakDemand: '980 kW',
    powerFactor: '0.93',
  },
  'device-3': {
    consumption: '18,220 kWh',
    peakDemand: '1,540 kW',
    powerFactor: '0.89',
  },
  'group-production': {
    consumption: '42,300 kWh',
    peakDemand: '3,920 kW',
    powerFactor: '0.91',
  },
  'group-admin': {
    consumption: '21,760 kWh',
    peakDemand: '1,870 kW',
    powerFactor: '0.95',
  },
}

export type DashboardTargetId = keyof typeof dashboardSummaryByTarget

export const filterTargets = [
  { value: 'device-1', label: 'Main Building - Floor 1' },
  { value: 'device-2', label: 'Main Building - Floor 2' },
  { value: 'device-3', label: 'Manufacturing Unit 1' },
  { value: 'group-production', label: 'Production Group' },
  { value: 'group-admin', label: 'Administration Group' },
] as const

export const filterDevices = [
  { value: 'device-1', label: 'Main Building - Floor 1' },
  { value: 'device-2', label: 'Main Building - Floor 2' },
  { value: 'device-3', label: 'Manufacturing Unit 1' },
] as const

export const filterGroups = [
  { value: 'group-production', label: 'Production Group' },
  { value: 'group-admin', label: 'Administration Group' },
] as const

export const energyParameters = [
  {
    name: 'KVA',
    fullName: 'Apparent Power',
    value: '1,245.6',
    unit: 'kVA',
    change: '+5.2%',
    trend: 'up',
    status: 'normal',
  },
  {
    name: 'KWH',
    fullName: 'Energy Consumption',
    value: '8,932.4',
    unit: 'kWh',
    change: '+12.8%',
    trend: 'up',
    status: 'high',
  },
  {
    name: 'KVAR',
    fullName: 'Reactive Power',
    value: '342.1',
    unit: 'kVAR',
    change: '-2.1%',
    trend: 'down',
    status: 'normal',
  },
  {
    name: 'PF',
    fullName: 'Power Factor',
    value: '0.92',
    unit: '',
    change: '0.0%',
    trend: 'stable',
    status: 'optimal',
  },
] as const

export const consumptionData = [
  { label: 'HVAC', value: 36 },
  { label: 'Lighting', value: 18 },
  { label: 'Production', value: 32 },
  { label: 'Office', value: 14 },
] as const

export const demandData = [
  { time: '09:00', actual: 720, target: 800 },
  { time: '12:00', actual: 980, target: 900 },
  { time: '15:00', actual: 860, target: 900 },
  { time: '18:00', actual: 640, target: 750 },
] as const
