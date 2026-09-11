import { useEffect, useState } from 'react'
import { coveragePct, type Lec, type Season } from '../data/lecs'
import { useLanguage } from '../i18n/LanguageContext'
import { formatTemplate } from '../i18n/translations'
import { Calculator } from './Calculator'
import { EnergyChart } from './EnergyChart'
import { HexCoaster } from './HexCoaster'

type Props = {
  lec: Lec
  onClose: () => void
}

export function LecPanel({ lec, onClose }: Props) {
  const { t } = useLanguage()
  const [season, setSeason] = useState<Season>('summer')
  const coverage = coveragePct(lec)
  const copy = t.lecs[lec.id]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lec-overlay" role="dialog" aria-modal="true" aria-labelledby="lec-title">
      <button type="button" className="overlay-backdrop" aria-label={t.closeAria} onClick={onClose} />
      <div className="lec-page">
        <HexCoaster variant="wide" className="lec-hero" glow={lec.color}>
          <header className="lec-head">
            <button type="button" className="close-x" onClick={onClose}>
              {t.close}
            </button>
            <p className="kicker">
              {formatTemplate(t.districtLabel, {
                id: lec.districtId,
                name: lec.districtName,
                transformer: lec.transformer,
              })}
            </p>
            <h2 id="lec-title">{lec.name}</h2>
            <p className="lede">{copy?.description}</p>
          </header>
        </HexCoaster>

        <div className="stat-row">
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">{t.producers}</span>
            <strong>{lec.producers}</strong>
            <em>{t.producersUnit}</em>
          </HexCoaster>
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">{t.consumers}</span>
            <strong>{lec.consumers}</strong>
            <em>{t.consumersUnit}</em>
          </HexCoaster>
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">{t.pvFleet}</span>
            <strong>{lec.installedKwp}</strong>
            <em>kWp</em>
          </HexCoaster>
          <HexCoaster variant="tile" className="stat-tile">
            <span className="stat-label">{t.lecCoverage}</span>
            <strong>{Math.round(coverage)}%</strong>
            <em>{t.coverageUnit}</em>
          </HexCoaster>
        </div>

        <HexCoaster variant="wide" className="lec-charts">
          <div className="tariff-line">
            <span>{formatTemplate(t.lecTariff, { value: lec.lecTariffRp.toFixed(1) })}</span>
            <span>{formatTemplate(t.gridTariff, { value: lec.gridTariffRp.toFixed(1) })}</span>
            <span>{formatTemplate(t.feedIn, { value: lec.feedInRp.toFixed(1) })}</span>
            <span>{formatTemplate(t.founded, { value: copy?.founded ?? '' })}</span>
            <span>
              {formatTemplate(t.energyBalance, {
                produced: lec.annualProductionMwh,
                demanded: lec.annualDemandMwh,
              })}
            </span>
          </div>
          <div className="season-toggle">
            <button type="button" className={season === 'summer' ? 'on' : ''} onClick={() => setSeason('summer')}>
              {t.summerDay}
            </button>
            <button type="button" className={season === 'winter' ? 'on' : ''} onClick={() => setSeason('winter')}>
              {t.winterDay}
            </button>
          </div>
          <EnergyChart lec={lec} season={season} />
        </HexCoaster>

        <HexCoaster variant="wide" className="lec-calc">
          <section className="calc-section">
            <h3>{t.joinCalculator}</h3>
            <p className="chart-note">{t.joinNote}</p>
            <Calculator lec={lec} />
          </section>
        </HexCoaster>
      </div>
    </div>
  )
}
