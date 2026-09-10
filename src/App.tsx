import { useState } from 'react'
import { CpuBusBackground } from './components/CpuBusBackground'
import { HexCoaster } from './components/HexCoaster'
import { LecPanel } from './components/LecPanel'
import { WinterthurMap } from './components/WinterthurMap'
import { coveragePct, lecByDistrictId, lecs } from './data/lecs'

export default function App() {
  const [districtId, setDistrictId] = useState<string | undefined>()
  const selected = districtId ? lecByDistrictId(districtId) : undefined

  return (
    <div className="app">
      <CpuBusBackground />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="kicker">Winterthur · Lokale Elektrizitätsgemeinschaften</p>
            <h1>Local Energy Communities</h1>
          </div>
        </div>
        <p className="proto">Prototype · all LEC figures are fictional</p>
      </header>

      <main>
        <HexCoaster variant="wide" className="hero-coaster">
          <p className="kicker">Stadtplan der Quartierstrom-Inseln</p>
          <h2>Click a district to open its energy community</h2>
          <p>
            Seven Winterthur Stadtkreise host modelled LECs on the Stadtwerk grid. Outlines follow the official city
            districts; producer counts, tariffs and hourly traces are invented but sized like a 2026 Swiss LEG —
            local solar at the LEC tariff while the rest still comes from the plant mix.
          </p>
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
                      {lec.producers} PV · {lec.consumers} loads · {Math.round(coveragePct(lec))}% LEC
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
