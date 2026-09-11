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
  background: '#ffffff',
  border: '1px solid #d7d7d7',
  borderRadius: 0,
  color: '#202020',
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
                  <stop offset="0%" stopColor="#e87524" stopOpacity={0.75} />
                  <stop offset="100%" stopColor="#e87524" stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="plantFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a8a8a" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#8a8a8a" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e6e6e6" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: '#666666', fontSize: 11 }} interval={3} />
              <YAxis tick={{ fill: '#666666', fontSize: 11 }} unit=" kWh" width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)} kWh`,
                  name === 'lecKwh' ? t.tooltipLec : name === 'plantKwh' ? t.tooltipPlant : String(name),
                ]}
              />
              <Area type="monotone" dataKey="lecKwh" stackId="1" stroke="#e87524" fill="url(#lecFill)" />
              <Area type="monotone" dataKey="plantKwh" stackId="1" stroke="#8a8a8a" fill="url(#plantFill)" />
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
              <CartesianGrid stroke="#e6e6e6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#666666', fontSize: 11 }} />
              <YAxis tick={{ fill: '#666666', fontSize: 11 }} unit=" MWh" width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)} MWh`,
                  name === 'lecMwh' ? t.tooltipLec : t.tooltipPlant,
                ]}
              />
              <Bar dataKey="lecMwh" stackId="a" fill="#e87524" radius={[0, 0, 0, 0]} />
              <Bar dataKey="plantMwh" stackId="a" fill="#8a8a8a" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
