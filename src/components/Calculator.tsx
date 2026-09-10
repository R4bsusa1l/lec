import { useMemo, useState } from 'react'
import { evaluateJoin, type Lec, type Role } from '../data/lecs'

type Props = {
  lec: Lec
}

const HOUSEHOLDS: { label: string; kwh: number }[] = [
  { label: '1 person', kwh: 1600 },
  { label: '2 people', kwh: 2700 },
  { label: 'H4 family', kwh: 4500 },
  { label: 'Heat pump', kwh: 9000 },
]

export function Calculator({ lec }: Props) {
  const [role, setRole] = useState<Role>('consumer')
  const [kwh, setKwh] = useState(4500)
  const [kwp, setKwp] = useState(10)
  const producerKwh = Math.round(kwp * 970)
  const userKwh = role === 'consumer' ? kwh : producerKwh
  const result = useMemo(() => evaluateJoin(lec, role, userKwh), [lec, role, userKwh])

  const maxBar = Math.max(result.newSupplyKwh, result.newDemandKwh, 1)
  const supplyPct = (result.newSupplyKwh / maxBar) * 100
  const demandPct = (result.newDemandKwh / maxBar) * 100
  const youOnSupply = role === 'producer'
  const youShare = youOnSupply
    ? (result.userKwh / result.newSupplyKwh) * 100
    : (result.userKwh / result.newDemandKwh) * 100

  return (
    <div className="calculator">
      <div className="role-toggle" role="tablist" aria-label="Your role">
        <button
          type="button"
          role="tab"
          aria-selected={role === 'consumer'}
          className={role === 'consumer' ? 'on' : ''}
          onClick={() => setRole('consumer')}
        >
          I am a consumer
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === 'producer'}
          className={role === 'producer' ? 'on' : ''}
          onClick={() => setRole('producer')}
        >
          I am a solar producer
        </button>
      </div>

      {role === 'consumer' ? (
        <div className="calc-inputs">
          <label htmlFor="kwh">Annual electricity use</label>
          <div className="input-row">
            <input
              id="kwh"
              type="range"
              min={1200}
              max={14000}
              step={100}
              value={kwh}
              onChange={(e) => setKwh(Number(e.target.value))}
            />
            <input
              type="number"
              min={500}
              max={40000}
              value={kwh}
              onChange={(e) => setKwh(Number(e.target.value))}
              aria-label="Kilowatt-hours per year"
            />
            <span className="unit">kWh/year</span>
          </div>
          <div className="chips">
            {HOUSEHOLDS.map((h) => (
              <button key={h.label} type="button" className={kwh === h.kwh ? 'on' : ''} onClick={() => setKwh(h.kwh)}>
                {h.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="calc-inputs">
          <label htmlFor="kwp">Rooftop PV you would offer</label>
          <div className="input-row">
            <input
              id="kwp"
              type="range"
              min={2}
              max={40}
              step={0.5}
              value={kwp}
              onChange={(e) => setKwp(Number(e.target.value))}
            />
            <input
              type="number"
              min={1}
              max={200}
              step={0.5}
              value={kwp}
              onChange={(e) => setKwp(Number(e.target.value))}
              aria-label="Kilowatt peak"
            />
            <span className="unit">kWp</span>
          </div>
          <p className="chart-note">Winterthur yield modelled at ~970 kWh/kWp · {producerKwh.toLocaleString('de-CH')} kWh/year</p>
        </div>
      )}

      <div className="balance" aria-label="Supply and demand">
        <div className="balance-row">
          <span>Supply</span>
          <div className="balance-track">
            <div className="balance-fill supply" style={{ width: `${supplyPct}%` }}>
              {youOnSupply && <span className="you-slice" style={{ width: `${youShare}%` }} title="Your offer" />}
            </div>
          </div>
          <b>{Math.round(result.newSupplyKwh / 1000)} MWh</b>
        </div>
        <div className="balance-row">
          <span>Demand</span>
          <div className="balance-track">
            <div className="balance-fill demand" style={{ width: `${demandPct}%` }}>
              {!youOnSupply && <span className="you-slice" style={{ width: `${youShare}%` }} title="Your demand" />}
            </div>
          </div>
          <b>{Math.round(result.newDemandKwh / 1000)} MWh</b>
        </div>
        <p className="legend-inline">
          <i className="swatch supply" /> community solar
          <i className="swatch you" /> you
          <i className="swatch demand" /> community demand
        </p>
      </div>

      <div className={`verdict verdict-${result.verdict}`}>
        <strong>{result.headline}</strong>
        <p>{result.detail}</p>
        <dl>
          {role === 'consumer' ? (
            <>
              <div>
                <dt>Your LEC share</dt>
                <dd>{Math.round(result.coveragePct)}%</dd>
              </div>
              <div>
                <dt>Still from plants</dt>
                <dd>{Math.round(result.plantKwh)} kWh</dd>
              </div>
            </>
          ) : (
            <>
              <div>
                <dt>Taken up locally</dt>
                <dd>{Math.round(result.offtakePct)}%</dd>
              </div>
              <div>
                <dt>Spill to feed-in</dt>
                <dd>{Math.round(result.plantKwh)} kWh</dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  )
}
