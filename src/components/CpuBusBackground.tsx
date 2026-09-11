export function CpuBusBackground() {
  return (
    <div className="cpu-bus" aria-hidden="true">
      <svg className="cpu-bus-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="traceGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.55" />
          </linearGradient>
          <pattern id="busGrid" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M0 28 H140" stroke="url(#traceGlow)" strokeWidth="1.2" opacity="0.35" />
            <path d="M0 36 H140" stroke="#2dd4bf" strokeWidth="0.6" opacity="0.28" />
            <path d="M0 44 H140" stroke="#06b6d4" strokeWidth="0.6" opacity="0.22" />
            <path d="M48 0 V140" stroke="url(#traceGlow)" strokeWidth="1.2" opacity="0.32" />
            <path d="M56 0 V140" stroke="#5eead4" strokeWidth="0.6" opacity="0.24" />
            <path d="M64 0 V140" stroke="#06b6d4" strokeWidth="0.55" opacity="0.2" />
            <circle cx="48" cy="28" r="3.2" fill="#061418" stroke="#2ec4b6" strokeWidth="1.1" />
            <circle cx="48" cy="28" r="1.1" fill="#99f6e4" />
            <circle cx="112" cy="92" r="3.2" fill="#061418" stroke="#06b6d4" strokeWidth="1.1" />
            <circle cx="112" cy="92" r="1.1" fill="#67e8f9" />
            <path d="M64 44 L96 76 L112 76 L112 92" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
            <rect x="96" y="8" width="28" height="14" rx="1.5" fill="none" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.35" />
            <rect x="8" y="100" width="22" height="22" rx="2" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#busGrid)" />
        <g opacity="0.55" stroke="url(#traceGlow)" fill="none">
          <path d="M80 120 H420 V210 H710" strokeWidth="3" />
          <path d="M80 132 H408 V222 H710" strokeWidth="1.4" />
          <path d="M80 144 H396 V234 H710" strokeWidth="1.4" />
          <path d="M710 210 H980 V80 H1480" strokeWidth="2.4" />
          <path d="M220 120 V520 H60 V820" strokeWidth="2" />
          <path d="M232 120 V508 H72 V820" strokeWidth="1.2" />
          <path d="M980 80 V340 H1280 V620 H1540" strokeWidth="2.2" />
          <path d="M420 520 H900 V760 H1300" strokeWidth="2.6" />
          <path d="M420 532 H888 V772 H1300" strokeWidth="1.2" />
          <polygon points="1180,430 1280,488 1280,604 1180,662 1080,604 1080,488" strokeWidth="1.8" />
          <polygon points="260,640 330,680 330,760 260,800 190,760 190,680" strokeWidth="1.5" />
          <rect x="710" y="186" width="86" height="52" rx="4" strokeWidth="1.6" />
          <rect x="1288" y="328" width="70" height="40" rx="3" strokeWidth="1.4" />
        </g>
        <g fill="#99f6e4">
          <circle cx="420" cy="120" r="4" />
          <circle cx="710" cy="210" r="4" />
          <circle cx="980" cy="80" r="4" />
          <circle cx="220" cy="520" r="4" />
          <circle cx="900" cy="760" r="4" />
          <circle cx="1280" cy="620" r="4" />
        </g>
      </svg>
    </div>
  )
}
