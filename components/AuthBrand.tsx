import Link from 'next/link'

export default function AuthBrand() {
  return (
    <div className="auth-brand">
      <Link href="/" className="auth-brand-link">
        {/* Logo mark: hexagon + MOORA ranking bars + decision network */}
        <svg className="auth-logo-mark" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="spk-logo-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#4F46E5"/>
              <stop offset="55%"  stopColor="#7C3AED"/>
              <stop offset="100%" stopColor="#A78BFA"/>
            </linearGradient>
            <linearGradient id="spk-logo-bar-hi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,1)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.7)"/>
            </linearGradient>
            <linearGradient id="spk-logo-bar-lo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.8)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
            </linearGradient>
            <filter id="spk-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Hexagon body */}
          <path d="M28 2.5 L51 15.25 L51 40.75 L28 53.5 L5 40.75 L5 15.25 Z" fill="url(#spk-logo-bg)"/>

          {/* Inner hex ring (subtle depth) */}
          <path d="M28 6 L47.5 17 L47.5 39 L28 50 L8.5 39 L8.5 17 Z"
                stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none"/>

          {/* Ranking bars (MOORA podium) */}
          <rect x="13" y="31" width="7" height="12" rx="2.5" fill="url(#spk-logo-bar-lo)"/>
          <rect x="25" y="19" width="7" height="24" rx="2.5" fill="url(#spk-logo-bar-hi)"/>
          <rect x="37" y="26" width="7" height="17" rx="2.5" fill="url(#spk-logo-bar-lo)"/>

          {/* Decision network nodes at bar tops */}
          <circle cx="16.5" cy="29" r="3"   fill="rgba(255,255,255,0.78)" filter="url(#spk-logo-glow)"/>
          <circle cx="28.5" cy="17" r="3.8" fill="white"                  filter="url(#spk-logo-glow)"/>
          <circle cx="40.5" cy="24" r="3"   fill="rgba(255,255,255,0.82)" filter="url(#spk-logo-glow)"/>

          {/* Trend line connecting nodes */}
          <polyline
            points="16.5,29 28.5,17 40.5,24"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.4"
            fill="none" strokeLinejoin="round" strokeLinecap="round"
          />
        </svg>

        <div className="auth-wordmark">
          <span className="auth-spk">SPK</span>
          <span className="auth-gateway">Gateway</span>
        </div>
      </Link>

      <div className="auth-pills">
        <span className="auth-pill">Startup</span>
        <span className="auth-pill-dot"/>
        <span className="auth-pill">Sleman</span>
        <span className="auth-pill-dot"/>
        <span className="auth-pill">MOORA</span>
      </div>

      <p className="auth-tagline-text">
        Sistem Pendukung Keputusan Pemilihan<br/>
        Payment Gateway untuk Startup
      </p>
    </div>
  )
}
