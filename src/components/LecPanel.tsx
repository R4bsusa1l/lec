import { useEffect, useState } from 'react'
import { coveragePct, type Lec, type Season } from '../data/lecs'
import { Calculator } from './Calculator'
import { EnergyChart } from './EnergyChart'
import { HexCoaster } from './HexCoaster'

type Props = {
  lec: Lec
  onClose: () => void
}

export function LecPanel({ lec, onClose }: Props) {
  const [season, setSeason] = useState<Season>('summer')
  const coverage = coveragePct(lec)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lec-overlay" role="dialog" aria-modal="true" aria-labelledby="lec-title">
      <button type="button" className="overlay-backdrop" aria-label="Close" onClick={onClose} />
      <div className="lec-page">
        <HexCoaster variant="wide" className="lec-hero" glow={lec.color}>
          <header className="lec-head">
            <button type="button" className="close-x" onClick={onClose}>
              Close
            </button>
            <p className="kicker">
              Kreis {lec.districtId} · {lec.districtName} · {lec.transformer}
            </p>
            <h2 id="lec-title">{lec.name}</h2>
            <p className="lede">{lec.description}</p>
          </header>
        </HexCoaster>

        <div className="stat-row">
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">Producers</span>
            <strong>{lec.producers}</strong>
            <em>solar roofs</em>
          </HexCoaster>
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">Consumers</span>
            <strong>{lec.consumers}</strong>
            <em>meters</em>
          </HexCoaster>
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">PV fleet</span>
            <strong>{lec.installedKwp}</strong>
            <em>kWp</em>
          </HexCoaster>
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">LEC coverage</span>
            <strong>{Math.round(coverage)}%</strong>
            <em>of yearly demand</em>
          </HexCoaster>
        </div>

        <HexCoaster variant="wide" className="lec-charts">
          <div className="tariff-line">
            <span>LEC tariff {lec.lecTariffRp.toFixed(1)} Rp/kWh</span>
            <span>Grid {lec.gridTariffRp.toFixed(1)} Rp/kWh</span>
            <span>Feed-in {lec.feedInRp.toFixed(1)} Rp/kWh</span>
            <span>Founded {lec.founded}</span>
            <span>
              {lec.annualProductionMwh} MWh produced · {lec.annualDemandMwh} MWh demanded
            </span>
          </div>
          <div className="season-toggle">
            <button type="button" className={season === 'summer' ? 'on' : ''} onClick={() => setSeason('summer')}>
              Summer day
            </button>
            <button type="button" className={season === 'winter' ? 'on' : ''} onClick={() => setSeason('winter')}>
              Winter day
            </button>
          </div>
          <EnergyChart lec={lec} season={season} />
        </HexCoaster>

        <HexCoaster variant="wide" className="lec-calc">
          <section className="calc-section">
            <h3>Join calculator</h3>
            <p className="chart-note">
              Test whether this LEC still has spare solar for a new consumer, or spare demand for a new producer.
              Figures are modelled, not metered.
            </p>
            <Calculator lec={lec} />
          </section>
        </HexCoaster>
      </div>
    </div>
  )
}
