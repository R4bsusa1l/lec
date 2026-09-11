export type Role = 'consumer' | 'producer'
export type Season = 'summer' | 'winter'
export type LoadMix = 'residential' | 'mixed' | 'urban'

export type HourSample = {
  hour: string
  hourNum: number
  demandKwh: number
  solarKwh: number
  lecKwh: number
  plantKwh: number
}

export type MonthSample = {
  month: string
  lecMwh: number
  plantMwh: number
  solarMwh: number
}

export type Lec = {
  id: string
  districtId: string
  districtName: string
  name: string
  shortName: string
  transformer: string
  mix: LoadMix
  producers: number
  consumers: number
  installedKwp: number
  annualProductionMwh: number
  annualDemandMwh: number
  lecTariffRp: number
  gridTariffRp: number
  feedInRp: number
  color: string
}

export type JoinVerdict = 'strong' | 'moderate' | 'weak'

export type JoinMessageId =
  | 'consumerStrong'
  | 'consumerModerate'
  | 'consumerWeak'
  | 'producerStrong'
  | 'producerModerate'
  | 'producerWeak'

export type CalculatorResult = {
  role: Role
  verdict: JoinVerdict
  messageId: JoinMessageId
  coveragePct: number
  offtakePct: number
  supplyKwh: number
  demandKwh: number
  userKwh: number
  newSupplyKwh: number
  newDemandKwh: number
  localKwh: number
  plantKwh: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const SOLAR_MONTH = [0.32, 0.52, 0.88, 1.18, 1.38, 1.48, 1.5, 1.32, 1.02, 0.68, 0.38, 0.26]
const DEMAND_MONTH = [1.2, 1.14, 1.06, 0.96, 0.88, 0.84, 0.85, 0.87, 0.94, 1.02, 1.12, 1.22]

function solarCurve(hour: number, season: Season) {
  const peak = season === 'summer' ? 13.1 : 12.4
  const width = season === 'summer' ? 5.1 : 3.2
  const start = season === 'summer' ? 5.4 : 8.1
  const end = season === 'summer' ? 21.2 : 16.8
  if (hour < start || hour > end) return 0
  const x = (hour - peak) / width
  return Math.max(0, Math.exp(-x * x) - 0.035)
}

function demandCurve(hour: number, mix: LoadMix) {
  const base = mix === 'urban' ? 0.44 : mix === 'mixed' ? 0.36 : 0.3
  const morning = Math.exp(-(((hour - 7.35) / 1.3) ** 2))
  const lunch = Math.exp(-(((hour - 12.1) / 1.55) ** 2))
  const evening = Math.exp(-(((hour - 19.15) / 1.65) ** 2))
  const lunchW = mix === 'urban' ? 0.62 : mix === 'mixed' ? 0.4 : 0.22
  const eveningW = mix === 'residential' ? 0.95 : mix === 'mixed' ? 0.78 : 0.66
  return base + morning * 0.52 + lunch * lunchW + evening * eveningW
}

function scale(values: number[], total: number) {
  const sum = values.reduce((a, b) => a + b, 0)
  return values.map((v) => (v / sum) * total)
}

export function hourlyProfile(lec: Lec, season: Season): HourSample[] {
  const seasonProd = season === 'summer' ? 1.52 : 0.38
  const seasonDemand = season === 'summer' ? 0.9 : 1.14
  const dailyDemand = (lec.annualDemandMwh * 1000) / 365 * seasonDemand
  const dailySolar = (lec.annualProductionMwh * 1000) / 365 * seasonProd
  const hours = Array.from({ length: 24 }, (_, h) => h)
  const demand = scale(hours.map((h) => demandCurve(h, lec.mix)), dailyDemand)
  const solar = scale(hours.map((h) => solarCurve(h, season) + 0.0001), dailySolar)
  return hours.map((h) => {
    const lecKwh = Math.min(demand[h], solar[h])
    return {
      hour: `${String(h).padStart(2, '0')}:00`,
      hourNum: h,
      demandKwh: demand[h],
      solarKwh: solar[h],
      lecKwh,
      plantKwh: Math.max(0, demand[h] - lecKwh),
    }
  })
}

export function monthlyProfile(lec: Lec): MonthSample[] {
  const solar = scale(SOLAR_MONTH, lec.annualProductionMwh)
  const demand = scale(DEMAND_MONTH, lec.annualDemandMwh)
  return MONTHS.map((month, i) => {
    const coincidence = 0.58 + (SOLAR_MONTH[i] > 1 ? 0.08 : 0)
    const lecMwh = Math.min(demand[i], solar[i]) * coincidence + Math.min(demand[i], solar[i]) * 0.12
    const capped = Math.min(demand[i], lecMwh)
    return {
      month,
      solarMwh: solar[i],
      lecMwh: capped,
      plantMwh: Math.max(0, demand[i] - capped),
    }
  })
}

export function coveragePct(lec: Lec) {
  const months = monthlyProfile(lec)
  const lecSum = months.reduce((s, m) => s + m.lecMwh, 0)
  return (lecSum / lec.annualDemandMwh) * 100
}

export function evaluateJoin(lec: Lec, role: Role, annualKwh: number): CalculatorResult {
  const supplyKwh = lec.annualProductionMwh * 1000
  const demandKwh = lec.annualDemandMwh * 1000
  const userKwh = Math.max(0, annualKwh)
  const newSupplyKwh = role === 'producer' ? supplyKwh + userKwh : supplyKwh
  const newDemandKwh = role === 'consumer' ? demandKwh + userKwh : demandKwh
  const matched = Math.min(newSupplyKwh, newDemandKwh)
  const coincidence = 0.64
  const localPool = matched * coincidence
  const coveragePctValue = newDemandKwh === 0 ? 0 : (localPool / newDemandKwh) * 100
  const offtakePct = newSupplyKwh === 0 ? 0 : (localPool / newSupplyKwh) * 100
  const localKwh = role === 'consumer' ? userKwh * (coveragePctValue / 100) : userKwh * (offtakePct / 100)
  const plantKwh = userKwh - localKwh
  const tightness = supplyKwh / Math.max(1, demandKwh)
  const saturated = supplyKwh >= demandKwh

  if (role === 'consumer') {
    let verdict: JoinVerdict = 'strong'
    let messageId: JoinMessageId = 'consumerStrong'
    if (tightness < 0.72 || coveragePctValue < 38) {
      verdict = 'weak'
      messageId = 'consumerWeak'
    } else if (tightness < 0.95 || coveragePctValue < 50) {
      verdict = 'moderate'
      messageId = 'consumerModerate'
    }
    return {
      role,
      verdict,
      messageId,
      coveragePct: coveragePctValue,
      offtakePct,
      supplyKwh,
      demandKwh,
      userKwh,
      newSupplyKwh,
      newDemandKwh,
      localKwh,
      plantKwh,
    }
  }

  let verdict: JoinVerdict = 'weak'
  let messageId: JoinMessageId = 'producerWeak'
  if (!saturated && (tightness < 0.75 || offtakePct > 58)) {
    verdict = 'strong'
    messageId = 'producerStrong'
  } else if (!saturated && (tightness < 0.98 || offtakePct > 48)) {
    verdict = 'moderate'
    messageId = 'producerModerate'
  }

  return {
    role,
    verdict,
    messageId,
    coveragePct: coveragePctValue,
    offtakePct,
    supplyKwh,
    demandKwh,
    userKwh,
    newSupplyKwh,
    newDemandKwh,
    localKwh,
    plantKwh,
  }
}

export const lecs: Lec[] = [
  {
    id: 'neuwiesen',
    districtId: '1',
    districtName: 'Winterthur-Stadt',
    name: 'LEC Neuwiesen–Altstadt',
    shortName: 'Neuwiesen',
    transformer: 'TS Neuwiesen',
    mix: 'urban',
    producers: 16,
    consumers: 248,
    installedKwp: 142,
    annualProductionMwh: 136,
    annualDemandMwh: 1184,
    lecTariffRp: 19.6,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff7a45',
  },
  {
    id: 'hegi',
    districtId: '2',
    districtName: 'Oberwinterthur',
    name: 'LEC Hegi–Grüze',
    shortName: 'Hegi',
    transformer: 'TS Hegi / TS Grüze',
    mix: 'mixed',
    producers: 47,
    consumers: 186,
    installedKwp: 1280,
    annualProductionMwh: 1246,
    annualDemandMwh: 972,
    lecTariffRp: 18.4,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff9a4a',
  },
  {
    id: 'seen',
    districtId: '3',
    districtName: 'Seen',
    name: 'LEC Seen–Iberg',
    shortName: 'Seen',
    transformer: 'TS Seen-Dorf',
    mix: 'residential',
    producers: 11,
    consumers: 164,
    installedKwp: 98,
    annualProductionMwh: 94,
    annualDemandMwh: 688,
    lecTariffRp: 20.2,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff5c7a',
  },
  {
    id: 'toess',
    districtId: '4',
    districtName: 'Töss',
    name: 'LEC Tösswerk',
    shortName: 'Töss',
    transformer: 'TS Töss-Zentrum',
    mix: 'mixed',
    producers: 29,
    consumers: 102,
    installedKwp: 540,
    annualProductionMwh: 518,
    annualDemandMwh: 464,
    lecTariffRp: 18.9,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff6b3c',
  },
  {
    id: 'rosenberg',
    districtId: '5',
    districtName: 'Veltheim',
    name: 'LEC Rosenberg',
    shortName: 'Veltheim',
    transformer: 'TS Veltheim',
    mix: 'residential',
    producers: 1,
    consumers: 8,
    installedKwp: 22,
    annualProductionMwh: 21,
    annualDemandMwh: 34,
    lecTariffRp: 20.8,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff4d88',
  },
  {
    id: 'auen',
    districtId: '6',
    districtName: 'Wülflingen',
    name: 'LEC Wülflingen–Auen',
    shortName: 'Wülflingen',
    transformer: 'TS Wülflingen',
    mix: 'residential',
    producers: 18,
    consumers: 121,
    installedKwp: 210,
    annualProductionMwh: 201,
    annualDemandMwh: 548,
    lecTariffRp: 19.9,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff7a62',
  },
  {
    id: 'gutschick',
    districtId: '7',
    districtName: 'Mattenbach',
    name: 'LEC Gutschick–Deutweg',
    shortName: 'Mattenbach',
    transformer: 'TS Deutweg',
    mix: 'mixed',
    producers: 22,
    consumers: 138,
    installedKwp: 385,
    annualProductionMwh: 368,
    annualDemandMwh: 612,
    lecTariffRp: 19.2,
    gridTariffRp: 29.4,
    feedInRp: 8.1,
    color: '#ff5a55',
  },
]

export function lecByDistrictId(districtId: string) {
  return lecs.find((l) => l.districtId === districtId)
}

export function lecById(id: string) {
  return lecs.find((l) => l.id === id)
}
