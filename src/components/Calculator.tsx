import { useMemo, useState } from 'react'
import { evaluateJoin, type Lec, type Role } from '../data/lecs'
import { useLanguage } from '../i18n/LanguageContext'
import { formatTemplate } from '../i18n/translations'

type Props = {
  lec: Lec
}

export function Calculator({ lec }: Props) {
  const { t } = useLanguage()
  const [role, setRole] = useState<Role>('consumer')
  const [kwh, setKwh] = useState(4500)
  const [kwp, setKwp] = useState(10)
  const producerKwh = Math.round(kwp * 970)
  const userKwh = role === 'consumer' ? kwh : producerKwh
  const result = useMemo(() => evaluateJoin(lec, role, userKwh), [lec, role, userKwh])
  const message = t.join[result.messageId]

  const households = [
    { label: t.household1, kwh: 1600 },
    { label: t.household2, kwh: 2700 },
    { label: t.householdH4, kwh: 4500 },
    { label: t.householdHeatPump, kwh: 9000 },
  ]

  const maxBar = Math.max(result.newSupplyKwh, result.newDemandKwh, 1)
  const supplyPct = (result.newSupplyKwh / maxBar) * 100
  const demandPct = (result.newDemandKwh / maxBar) * 100
  const youOnSupply = role === 'producer'
  const youShare = youOnSupply
    ? (result.userKwh / result.newSupplyKwh) * 100
    : (result.userKwh / result.newDemandKwh) * 100

  return (
    <div className="calculator">
      <div className="role-toggle" role="tablist" aria-label={t.roleAria}>
        <button
          type="button"
          role="tab"
          aria-selected={role === 'consumer'}
          className={role === 'consumer' ? 'on' : ''}
          onClick={() => setRole('consumer')}
        >
          {t.roleConsumer}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === 'producer'}
          className={role === 'producer' ? 'on' : ''}
          onClick={() => setRole('producer')}
        >
          {t.roleProducer}
        </button>
      </div>

      {role === 'consumer' ? (
        <div className="calc-inputs">
          <label htmlFor="kwh">{t.annualUse}</label>
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
              aria-label={t.kwhAria}
            />
            <span className="unit">{t.kwhPerYear}</span>
          </div>
          <div className="chips">
            {households.map((h) => (
              <button key={h.label} type="button" className={kwh === h.kwh ? 'on' : ''} onClick={() => setKwh(h.kwh)}>
                {h.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="calc-inputs">
          <label htmlFor="kwp">{t.rooftopPv}</label>
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
              aria-label={t.kwpAria}
            />
            <span className="unit">kWp</span>
          </div>
          <p className="chart-note">
            {formatTemplate(t.yieldNote, { kwh: producerKwh.toLocaleString('de-CH') })}
          </p>
        </div>
      )}

      <div className="balance" aria-label={t.balanceAria}>
        <div className="balance-row">
          <span>{t.supply}</span>
          <div className="balance-track">
            <div className="balance-fill supply" style={{ width: `${supplyPct}%` }}>
              {youOnSupply && <span className="you-slice" style={{ width: `${youShare}%` }} title={t.yourOffer} />}
            </div>
          </div>
          <b>{Math.round(result.newSupplyKwh / 1000)} MWh</b>
        </div>
        <div className="balance-row">
          <span>{t.demand}</span>
          <div className="balance-track">
            <div className="balance-fill demand" style={{ width: `${demandPct}%` }}>
              {!youOnSupply && <span className="you-slice" style={{ width: `${youShare}%` }} title={t.yourDemand} />}
            </div>
          </div>
          <b>{Math.round(result.newDemandKwh / 1000)} MWh</b>
        </div>
        <p className="legend-inline">
          <i className="swatch supply" /> {t.legendSolar}
          <i className="swatch you" /> {t.legendYou}
          <i className="swatch demand" /> {t.legendDemand}
        </p>
      </div>

      <div className={`verdict verdict-${result.verdict}`}>
        <strong>{message.headline}</strong>
        <p>
          {message.detail({
            coveragePct: result.coveragePct,
            offtakePct: result.offtakePct,
            producers: lec.producers,
            consumers: lec.consumers,
          })}
        </p>
        <dl>
          {role === 'consumer' ? (
            <>
              <div>
                <dt>{t.yourLecShare}</dt>
                <dd>{Math.round(result.coveragePct)}%</dd>
              </div>
              <div>
                <dt>{t.stillFromPlants}</dt>
                <dd>{Math.round(result.plantKwh)} kWh</dd>
              </div>
            </>
          ) : (
            <>
              <div>
                <dt>{t.takenUpLocally}</dt>
                <dd>{Math.round(result.offtakePct)}%</dd>
              </div>
              <div>
                <dt>{t.spillToFeedIn}</dt>
                <dd>{Math.round(result.plantKwh)} kWh</dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  )
}
