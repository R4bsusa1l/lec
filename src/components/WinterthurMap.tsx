import { useMemo } from 'react'
import { GeoJSON, MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { Layer, PathOptions, LeafletMouseEvent } from 'leaflet'
import districts from '../data/districts.json'
import { lecByDistrictId, lecs } from '../data/lecs'

type DistrictProps = {
  id: string
  name: string
  centroid: [number, number]
}

type DistrictFeature = Feature<Geometry, DistrictProps>

const collection = districts as FeatureCollection<Geometry, DistrictProps>

type Props = {
  selectedId?: string
  onSelect: (districtId: string) => void
}

function styleFor(feature: DistrictFeature, selectedId?: string): PathOptions {
  const lec = lecByDistrictId(feature.properties.id)
  const selected = selectedId === feature.properties.id
  return {
    color: lec?.color ?? '#ff7a45',
    weight: selected ? 3.4 : 2.1,
    fillColor: lec?.color ?? '#ff4d88',
    fillOpacity: selected ? 0.48 : 0.28,
    opacity: 0.95,
  }
}

function labelIcon(name: string) {
  return L.divIcon({
    className: 'hex-label-icon',
    html: `<span>${name}</span>`,
    iconSize: [108, 30],
    iconAnchor: [54, 15],
  })
}

export function WinterthurMap({ selectedId, onSelect }: Props) {
  const icons = useMemo(
    () => Object.fromEntries(lecs.map((lec) => [lec.id, labelIcon(lec.shortName)])),
    [],
  )

  return (
    <MapContainer
      center={[47.499, 8.729]}
      zoom={12}
      minZoom={11}
      maxZoom={15}
      scrollWheelZoom
      className="winti-map"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={selectedId ?? 'none'}
        data={collection}
        style={(feature) => styleFor(feature as DistrictFeature, selectedId)}
        onEachFeature={(feature, layer: Layer) => {
          const f = feature as DistrictFeature
          const lec = lecByDistrictId(f.properties.id)
          layer.on({
            click: (e: LeafletMouseEvent) => {
              e.originalEvent.stopPropagation()
              onSelect(f.properties.id)
            },
            mouseover: () => {
              const path = layer as unknown as { setStyle: (s: PathOptions) => void; bringToFront: () => void }
              path.setStyle({ fillOpacity: 0.5, weight: 3.2 })
              path.bringToFront()
            },
            mouseout: () => {
              const path = layer as unknown as { setStyle: (s: PathOptions) => void }
              path.setStyle(styleFor(f, selectedId))
            },
          })
          const path = layer as unknown as { bindTooltip: (html: string, opts: object) => void }
          path.bindTooltip(
            `<div class="map-tip"><strong>${lec?.name ?? f.properties.name}</strong><span>${lec ? `${lec.producers} producers · ${lec.consumers} consumers` : ''}</span></div>`,
            { sticky: true, direction: 'top', opacity: 1, className: 'lec-tooltip' },
          )
        }}
      />
      {lecs.map((lec) => {
        const feature = collection.features.find((item) => item.properties.id === lec.districtId)
        if (!feature) return null
        const [lng, lat] = feature.properties.centroid
        return (
          <Marker
            key={lec.id}
            position={[lat, lng]}
            icon={icons[lec.id]}
            eventHandlers={{ click: () => onSelect(lec.districtId) }}
          />
        )
      })}
    </MapContainer>
  )
}
