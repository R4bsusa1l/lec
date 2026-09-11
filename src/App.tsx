import { useState } from 'react'
import { CpuBusBackground } from './components/CpuBusBackground'
import { HexCoaster } from './components/HexCoaster'
import { LanguageToggle } from './components/LanguageToggle'
import { LecPanel } from './components/LecPanel'
import { WinterthurMap } from './components/WinterthurMap'
import { coveragePct, lecByDistrictId, lecs } from './data/lecs'
import { useLanguage } from './i18n/LanguageContext'
import { formatTemplate } from './i18n/translations'

export default function App() {
  const { t } = useLanguage()
  const [districtId, setDistrictId] = useState<string | undefined>()
  const selected = districtId ? lecByDistrictId(districtId) : undefined

  return (
    <div className="app">
      <CpuBusBackground />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="kicker">{t.brandKicker}</p>
            <h1>{t.brandTitle}</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <LanguageToggle />
          <p className="proto">{t.proto}</p>
        </div>
      </header>

      <main>
        <HexCoaster variant="wide" className="hero-coaster">
          <div className="hero-media" role="img" aria-label="Solardach in natürlicher Umgebung" />
          <div className="hero-copy">
            <p className="kicker">{t.heroKicker}</p>
            <h2>{t.heroTitle}</h2>
            <p>{t.heroBody}</p>
          </div>
        </HexCoaster>

        <div className="stage">
          <HexCoaster variant="wide" className="map-coaster">
            <WinterthurMap selectedId={districtId} onSelect={setDistrictId} />
          </HexCoaster>

          <ul className="lec-rail">
            {lecs.map((lec) => (
              <li key={lec.id}>
                <button type="button" className="lec-chip" onClick={() => setDistrictId(lec.districtId)}>
                  <HexCoaster variant="wide" className="chip-coaster" glow={lec.color}>
                    <span className="chip-name">{lec.shortName}</span>
                    <span className="chip-meta">
                      {formatTemplate(t.chipMeta, {
                        producers: lec.producers,
                        consumers: lec.consumers,
                        pct: Math.round(coveragePct(lec)),
                      })}
                    </span>
                  </HexCoaster>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {selected && <LecPanel lec={selected} onClose={() => setDistrictId(undefined)} />}
    </div>
  )
}
