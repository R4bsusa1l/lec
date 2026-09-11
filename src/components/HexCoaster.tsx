import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Variant = 'tile' | 'wide' | 'panel'

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  glow?: string
}

function hexInset(width: number, height: number, tile: boolean) {
  if (tile) return Math.min(width, height) * 0.18
  return Math.min(height / (2 * Math.sqrt(3)), width * 0.15)
}

function hexPoints(width: number, height: number, tile: boolean) {
  const pad = 1.25
  if (tile) {
    return [
      [width / 2, pad],
      [width - pad, height * 0.25],
      [width - pad, height * 0.75],
      [width / 2, height - pad],
      [pad, height * 0.75],
      [pad, height * 0.25],
    ]
      .map((p) => p.join(','))
      .join(' ')
  }
  const r = hexInset(width, height, false)
  return [
    [r, pad],
    [width - r, pad],
    [width - pad, height / 2],
    [width - r, height - pad],
    [r, height - pad],
    [pad, height / 2],
  ]
    .map((p) => p.join(','))
    .join(' ')
}

export function HexCoaster({ children, variant = 'wide', className = '', glow }: Props) {
  const gid = useId().replace(/:/g, '')
  const boxRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 320, h: 180 })

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const sync = () => {
      const rect = el.getBoundingClientRect()
      const w = Math.max(1, Math.round(rect.width))
      const h = Math.max(1, Math.round(rect.height))
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }))
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const tile = variant === 'tile'
  const inset = hexInset(size.w, size.h, tile)
  const gutter = Math.round(inset + (tile ? 10 : 12))
  const points = hexPoints(size.w, size.h, tile)

  return (
    <div
      ref={boxRef}
      className={`hex-coaster hex-${variant} ${className}`}
      style={{ '--hex-inset': `${gutter}px`, '--hex-glow': glow ?? 'rgba(45, 212, 191, 0.4)' } as CSSProperties}
    >
      <svg
        className="hex-plate"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        <polygon
          points={points}
          fill="rgba(6, 22, 26, 0.9)"
          stroke={`url(#${gid})`}
          strokeWidth={tile ? 2.6 : 2.4}
          strokeLinejoin="miter"
          style={{ filter: `drop-shadow(0 0 14px var(--hex-glow))` }}
        />
      </svg>
      <div className="hex-content">{children}</div>
    </div>
  )
}
