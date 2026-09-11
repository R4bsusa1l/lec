import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { hourlyProfile, monthlyProfile, type Lec, type Season } from '../data/lecs'
import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  lec: Lec
  season: Season
}

const tooltipStyle = {
  background: 'rgba(6, 22, 26, 0.94)',
  border: '1px solid rgba(45, 212, 191, 0.45)',
  borderRadius: 8,
  color: '#e4faf6',
  fontSize: 12,
}

export function EnergyChart({ lec, season }: Props) {
  const { t } = useLanguage()
  const hourly = useMemo(() => hourlyProfile(lec, season), [lec, season])
  const monthly = useMemo(
    () =>
      monthlyProfile(lec).map((row, i) => ({
        ...row,
        month: t.months[i],
      })),
    [lec, t.months],
  )

  return (
    <div className="charts">
      <div className="chart-block">
        <h3>{season === 'summer' ? t.hourlyTitleSummer : t.hourlyTitleWinter}</h3>
        <p className="chart-note">{t.hourlyNote}</p>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={hourly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lecFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0.15} />
                </linearGradient>
                <linearGradient id="plantFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0.12} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(45,212,191,0.12)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: '#b8dcd6', fontSize: 11 }} interval={3} />
              <YAxis tick={{ fill: '#b8dcd6', fontSize: 11 }} unit=" kWh" width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)} kWh`,
                  name === 'lecKwh' ? t.tooltipLec : name === 'plantKwh' ? t.tooltipPlant : String(name),
                ]}
              />
              <Area type="monotone" dataKey="lecKwh" stackId="1" stroke="#5eead4" fill="url(#lecFill)" />
              <Area type="monotone" dataKey="plantKwh" stackId="1" stroke="#06b6d4" fill="url(#plantFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart-block">
        <h3>{t.yearlyTitle}</h3>
        <p className="chart-note">{t.yearlyNote}</p>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(45,212,191,0.12)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#b8dcd6', fontSize: 11 }} />
              <YAxis tick={{ fill: '#b8dcd6', fontSize: 11 }} unit=" MWh" width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)} MWh`,
                  name === 'lecMwh' ? t.tooltipLec : t.tooltipPlant,
                ]}
              />
              <Bar dataKey="lecMwh" stackId="a" fill="#2dd4bf" radius={[0, 0, 0, 0]} />
              <Bar dataKey="plantMwh" stackId="a" fill="#0284c7" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
