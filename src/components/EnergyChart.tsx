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

type Props = {
  lec: Lec
  season: Season
}

const tooltipStyle = {
  background: 'rgba(24, 8, 14, 0.94)',
  border: '1px solid rgba(255, 110, 90, 0.45)',
  borderRadius: 8,
  color: '#ffe8dc',
  fontSize: 12,
}

export function EnergyChart({ lec, season }: Props) {
  const hourly = useMemo(() => hourlyProfile(lec, season), [lec, season])
  const monthly = useMemo(() => monthlyProfile(lec), [lec])

  return (
    <div className="charts">
      <div className="chart-block">
        <h3>Typical {season === 'summer' ? 'July' : 'January'} weekday</h3>
        <p className="chart-note">
          Orange = consumed at the LEC tariff (local solar). Pink = residual from the public grid / power plants.
        </p>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={hourly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lecFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff9a4a" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#ff7a3c" stopOpacity={0.15} />
                </linearGradient>
                <linearGradient id="plantFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4d88" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ff2d6a" stopOpacity={0.12} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,140,120,0.12)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: '#e8c4c0', fontSize: 11 }} interval={3} />
              <YAxis tick={{ fill: '#e8c4c0', fontSize: 11 }} unit=" kWh" width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)} kWh`,
                  name === 'lecKwh' ? 'LEC tariff' : name === 'plantKwh' ? 'Power plant / grid' : String(name),
                ]}
              />
              <Area type="monotone" dataKey="lecKwh" stackId="1" stroke="#ff9a4a" fill="url(#lecFill)" />
              <Area type="monotone" dataKey="plantKwh" stackId="1" stroke="#ff4d88" fill="url(#plantFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart-block">
        <h3>Year split · LEC vs plant</h3>
        <p className="chart-note">Monthly community consumption billed locally versus drawn from the grid mix.</p>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,140,120,0.12)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#e8c4c0', fontSize: 11 }} />
              <YAxis tick={{ fill: '#e8c4c0', fontSize: 11 }} unit=" MWh" width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)} MWh`,
                  name === 'lecMwh' ? 'LEC tariff' : 'Power plant / grid',
                ]}
              />
              <Bar dataKey="lecMwh" stackId="a" fill="#ff8a45" radius={[0, 0, 0, 0]} />
              <Bar dataKey="plantMwh" stackId="a" fill="#ff4d88" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
