export default function PaymentIllustration() {
  return (
    <svg
      className="login-illustration"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lgBag1" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#1C4A0A" stopOpacity="0.60"/>
          <stop offset="100%" stopColor="#3E7A1C" stopOpacity="0.32"/>
        </linearGradient>
        <linearGradient id="lgBag2" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#5C2E0A" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#8B5230" stopOpacity="0.26"/>
        </linearGradient>
        <linearGradient id="lgBag3" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#8B5A05" stopOpacity="0.48"/>
          <stop offset="100%" stopColor="#C48A18" stopOpacity="0.22"/>
        </linearGradient>
      </defs>

      {/* Ambient glows — organic earth tones */}
      <ellipse cx="180" cy="210" rx="320" ry="260" fill="rgba(60,100,30,0.045)"/>
      <ellipse cx="1320" cy="680" rx="300" ry="230" fill="rgba(100,60,20,0.050)"/>
      <ellipse cx="1220" cy="190" rx="210" ry="180" fill="rgba(180,120,20,0.032)"/>
      <ellipse cx="720" cy="450" rx="380" ry="280" fill="rgba(80,130,50,0.022)"/>

      {/* ── Sack 1 – Kompos (top-right, forest green, portrait) ── */}
      <g transform="translate(1165,15) rotate(-13)">
        {/* Sack body — tapers to tied neck at top */}
        <path d="M 62,14 Q 100,-4 138,14 L 166,40 L 180,256 Q 180,274 100,278 Q 20,274 20,256 L 34,40 Z"
              fill="url(#lgBag1)" stroke="rgba(50,100,25,0.30)" strokeWidth="1.2"/>
        {/* Tie knot */}
        <ellipse cx="100" cy="12" rx="37" ry="14" fill="rgba(25,70,10,0.50)" stroke="rgba(50,110,25,0.38)" strokeWidth="1"/>
        {/* Cinch lines from knot to shoulders */}
        <line x1="63" y1="18" x2="34" y2="40" stroke="rgba(50,100,25,0.24)" strokeWidth="1.2"/>
        <line x1="137" y1="18" x2="166" y2="40" stroke="rgba(50,100,25,0.24)" strokeWidth="1.2"/>
        {/* Woven texture — horizontal */}
        <line x1="30" y1="82"  x2="170" y2="82"  stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="28" y1="124" x2="172" y2="124" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="26" y1="166" x2="174" y2="166" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="24" y1="208" x2="176" y2="208" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        {/* Woven texture — vertical */}
        <line x1="60"  y1="40" x2="52"  y2="258" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <line x1="100" y1="40" x2="100" y2="272" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <line x1="140" y1="40" x2="148" y2="258" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        {/* Label panel */}
        <rect x="30" y="100" width="140" height="135" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
        {/* Leaf icon */}
        <path d="M100,126 C88,118 83,105 91,97 C99,89 111,94 111,102 C111,94 123,89 131,97 C139,105 134,118 100,126 Z" fill="rgba(180,240,150,0.28)"/>
        <line x1="111" y1="102" x2="100" y2="126" stroke="rgba(180,240,150,0.35)" strokeWidth="1.2"/>
        <text x="100" y="160" textAnchor="middle" fill="rgba(180,240,150,0.65)" fontSize="13" fontFamily="monospace" fontWeight="700" letterSpacing="3">KOMPOS</text>
        <text x="100" y="178" textAnchor="middle" fill="rgba(180,240,150,0.32)" fontSize="9" fontFamily="monospace">Pupuk Organik</text>
      </g>

      {/* ── Sack 2 – Pupuk Kandang (bottom-left, earth brown, portrait) ── */}
      <g transform="translate(-28,565) rotate(10)">
        <path d="M 58,13 Q 95,-4 132,13 L 158,38 L 172,243 Q 172,260 95,264 Q 18,260 18,243 L 32,38 Z"
              fill="url(#lgBag2)" stroke="rgba(110,65,20,0.30)" strokeWidth="1.2"/>
        <ellipse cx="95" cy="11" rx="35" ry="13" fill="rgba(75,38,10,0.52)" stroke="rgba(110,65,20,0.38)" strokeWidth="1"/>
        <line x1="60" y1="17" x2="32" y2="38" stroke="rgba(110,65,20,0.24)" strokeWidth="1.2"/>
        <line x1="130" y1="17" x2="158" y2="38" stroke="rgba(110,65,20,0.24)" strokeWidth="1.2"/>
        <line x1="28" y1="78"  x2="162" y2="78"  stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="26" y1="117" x2="164" y2="117" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="24" y1="156" x2="166" y2="156" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="22" y1="195" x2="168" y2="195" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="57"  y1="38" x2="50"  y2="244" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <line x1="95"  y1="38" x2="95"  y2="258" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <line x1="133" y1="38" x2="140" y2="244" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <rect x="26" y="96" width="138" height="128" rx="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <path d="M95,120 C84,113 79,101 87,94 C95,87 106,91 106,99 C106,91 117,87 125,94 C133,101 128,113 95,120 Z" fill="rgba(220,180,140,0.25)"/>
        <line x1="106" y1="99" x2="95" y2="120" stroke="rgba(220,180,140,0.30)" strokeWidth="1.2"/>
        <text x="95" y="152" textAnchor="middle" fill="rgba(220,180,140,0.62)" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="2.5">KANDANG</text>
        <text x="95" y="170" textAnchor="middle" fill="rgba(220,180,140,0.30)" fontSize="9" fontFamily="monospace">Kompos Organik</text>
      </g>

      {/* ── Sack 3 – Bokashi (bottom-right, amber, portrait) ── */}
      <g transform="translate(1145,620) rotate(12)">
        <path d="M 55,12 Q 90,-3 125,12 L 150,36 L 163,230 Q 163,246 90,250 Q 17,246 17,230 L 30,36 Z"
              fill="url(#lgBag3)" stroke="rgba(160,100,10,0.26)" strokeWidth="1.2"/>
        <ellipse cx="90" cy="10" rx="33" ry="12" fill="rgba(110,72,5,0.48)" stroke="rgba(160,100,10,0.34)" strokeWidth="1"/>
        <line x1="57" y1="16" x2="30" y2="36" stroke="rgba(160,100,10,0.24)" strokeWidth="1.2"/>
        <line x1="123" y1="16" x2="150" y2="36" stroke="rgba(160,100,10,0.24)" strokeWidth="1.2"/>
        <line x1="27" y1="74"  x2="153" y2="74"  stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="25" y1="110" x2="155" y2="110" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="23" y1="146" x2="157" y2="146" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="21" y1="182" x2="159" y2="182" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        <line x1="55"  y1="36" x2="48"  y2="231" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <line x1="90"  y1="36" x2="90"  y2="244" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <line x1="125" y1="36" x2="132" y2="231" stroke="rgba(0,0,0,0.038)" strokeWidth="1"/>
        <rect x="24" y="90" width="132" height="118" rx="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <path d="M90,113 C80,106 76,95 83,88 C90,81 100,85 100,93 C100,85 110,81 117,88 C124,95 120,106 90,113 Z" fill="rgba(255,210,120,0.22)"/>
        <line x1="100" y1="93" x2="90" y2="113" stroke="rgba(255,210,120,0.28)" strokeWidth="1.2"/>
        <text x="90" y="145" textAnchor="middle" fill="rgba(255,210,120,0.58)" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="2.5">BOKASHI</text>
        <text x="90" y="162" textAnchor="middle" fill="rgba(255,210,120,0.30)" fontSize="9" fontFamily="monospace">Fermentasi EM4</text>
      </g>

      {/* ── Connection lines — earth / organic tones ── */}
      <line x1="1110" y1="152" x2="968"  y2="85"  stroke="rgba(60,120,30,0.14)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1110" y1="152" x2="1255" y2="295" stroke="rgba(60,120,30,0.11)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1110" y1="152" x2="1358" y2="175" stroke="rgba(100,70,30,0.13)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="968"  y1="85"  x2="388"  y2="128" stroke="rgba(80,120,40,0.09)"  strokeWidth="1" strokeDasharray="8 8"/>
      <line x1="388"  y1="128" x2="158"  y2="178" stroke="rgba(100,60,20,0.13)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="158"  y1="178" x2="265"  y2="348" stroke="rgba(50,130,50,0.13)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="265"  y1="348" x2="108"  y2="398" stroke="rgba(40,90,100,0.12)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1255" y1="295" x2="1355" y2="595" stroke="rgba(180,120,20,0.11)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1355" y1="595" x2="1140" y2="715" stroke="rgba(150,80,20,0.10)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1140" y1="715" x2="218"  y2="648" stroke="rgba(50,130,50,0.08)"  strokeWidth="1" strokeDasharray="8 8"/>
      <line x1="218"  y1="648" x2="88"   y2="715" stroke="rgba(60,140,80,0.10)"  strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="108"  y1="398" x2="88"   y2="715" stroke="rgba(160,80,20,0.09)"  strokeWidth="1" strokeDasharray="7 7"/>
      <line x1="265"  y1="348" x2="1255" y2="295" stroke="rgba(80,130,40,0.06)"  strokeWidth="1" strokeDasharray="10 10"/>
      <line x1="388"  y1="128" x2="1358" y2="175" stroke="rgba(80,130,40,0.05)"  strokeWidth="1" strokeDasharray="12 8"/>

      {/* ── Organic fertilizer nodes ── */}
      <circle cx="1110" cy="152" r="36" fill="rgba(50,120,25,0.10)"  stroke="rgba(50,120,25,0.25)"  strokeWidth="1.5"/>
      <circle cx="1110" cy="152" r="23" fill="rgba(50,120,25,0.18)"  stroke="rgba(50,120,25,0.42)"  strokeWidth="1"/>
      <text x="1110" y="157" textAnchor="middle" fill="rgba(130,220,90,0.95)"  fontSize="11" fontWeight="600" fontFamily="monospace">KM</text>
      <text x="1110" y="198" textAnchor="middle" fill="rgba(130,220,90,0.38)"  fontSize="8"  fontFamily="monospace">Kompos</text>

      <circle cx="968"  cy="85"  r="31" fill="rgba(100,50,15,0.14)"  stroke="rgba(140,80,30,0.28)"  strokeWidth="1.5"/>
      <circle cx="968"  cy="85"  r="20" fill="rgba(100,50,15,0.22)"  stroke="rgba(140,80,30,0.42)"  strokeWidth="1"/>
      <text x="968"  y="90"  textAnchor="middle" fill="rgba(220,170,110,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">KD</text>
      <text x="968"  y="126" textAnchor="middle" fill="rgba(220,170,110,0.38)" fontSize="8"  fontFamily="monospace">Kandang</text>

      <circle cx="1255" cy="295" r="33" fill="rgba(130,70,100,0.11)" stroke="rgba(160,90,130,0.28)" strokeWidth="1.5"/>
      <circle cx="1255" cy="295" r="21" fill="rgba(130,70,100,0.18)" stroke="rgba(160,90,130,0.42)" strokeWidth="1"/>
      <text x="1255" y="300" textAnchor="middle" fill="rgba(220,170,200,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">VK</text>
      <text x="1255" y="338" textAnchor="middle" fill="rgba(220,170,200,0.38)" fontSize="8"  fontFamily="monospace">Vermikompos</text>

      <circle cx="1358" cy="175" r="29" fill="rgba(30,100,110,0.12)"  stroke="rgba(40,140,150,0.28)"  strokeWidth="1.5"/>
      <circle cx="1358" cy="175" r="18" fill="rgba(30,100,110,0.20)"  stroke="rgba(40,140,150,0.42)"  strokeWidth="1"/>
      <text x="1358" y="180" textAnchor="middle" fill="rgba(100,210,220,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">OC</text>
      <text x="1358" y="214" textAnchor="middle" fill="rgba(100,210,220,0.35)" fontSize="8"  fontFamily="monospace">Org. Cair</text>

      <circle cx="158"  cy="178" r="31" fill="rgba(130,80,10,0.12)"  stroke="rgba(180,120,20,0.27)"  strokeWidth="1.5"/>
      <circle cx="158"  cy="178" r="20" fill="rgba(130,80,10,0.18)"  stroke="rgba(180,120,20,0.40)"  strokeWidth="1"/>
      <text x="158"  y="183" textAnchor="middle" fill="rgba(240,190,80,0.95)"  fontSize="10" fontWeight="600" fontFamily="monospace">BK</text>
      <text x="158"  y="219" textAnchor="middle" fill="rgba(240,190,80,0.35)"  fontSize="8"  fontFamily="monospace">Bokashi</text>

      <circle cx="265"  cy="348" r="33" fill="rgba(20,80,60,0.12)"   stroke="rgba(30,120,80,0.26)"   strokeWidth="1.5"/>
      <circle cx="265"  cy="348" r="21" fill="rgba(20,80,60,0.20)"   stroke="rgba(30,120,80,0.40)"   strokeWidth="1"/>
      <text x="265"  y="353" textAnchor="middle" fill="rgba(80,200,150,0.88)"  fontSize="10" fontWeight="600" fontFamily="monospace">EM</text>
      <text x="265"  y="391" textAnchor="middle" fill="rgba(80,200,150,0.32)"  fontSize="8"  fontFamily="monospace">EM4 Kompos</text>

      <circle cx="108"  cy="398" r="29" fill="rgba(80,40,10,0.12)"   stroke="rgba(120,70,20,0.26)"   strokeWidth="1.5"/>
      <circle cx="108"  cy="398" r="18" fill="rgba(80,40,10,0.20)"   stroke="rgba(120,70,20,0.40)"   strokeWidth="1"/>
      <text x="108"  y="403" textAnchor="middle" fill="rgba(200,155,100,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">HM</text>
      <text x="108"  y="436" textAnchor="middle" fill="rgba(200,155,100,0.32)" fontSize="8"  fontFamily="monospace">Humus</text>

      <circle cx="1355" cy="595" r="31" fill="rgba(100,120,20,0.12)" stroke="rgba(140,170,30,0.26)"  strokeWidth="1.5"/>
      <circle cx="1355" cy="595" r="19" fill="rgba(100,120,20,0.20)" stroke="rgba(140,170,30,0.40)"  strokeWidth="1"/>
      <text x="1355" y="600" textAnchor="middle" fill="rgba(190,220,80,0.95)"  fontSize="10" fontWeight="600" fontFamily="monospace">KC</text>
      <text x="1355" y="636" textAnchor="middle" fill="rgba(190,220,80,0.32)"  fontSize="8"  fontFamily="monospace">Kascing</text>

      <circle cx="218"  cy="648" r="29" fill="rgba(20,90,70,0.12)"   stroke="rgba(30,130,100,0.26)"  strokeWidth="1.5"/>
      <circle cx="218"  cy="648" r="18" fill="rgba(20,90,70,0.20)"   stroke="rgba(30,130,100,0.40)"  strokeWidth="1"/>
      <text x="218"  y="653" textAnchor="middle" fill="rgba(60,200,160,0.95)"  fontSize="10" fontWeight="600" fontFamily="monospace">TC</text>
      <text x="218"  y="686" textAnchor="middle" fill="rgba(60,200,160,0.32)"  fontSize="8"  fontFamily="monospace">Tricokom</text>

      <circle cx="1140" cy="715" r="31" fill="rgba(80,100,20,0.12)"  stroke="rgba(110,150,30,0.26)"  strokeWidth="1.5"/>
      <circle cx="1140" cy="715" r="20" fill="rgba(80,100,20,0.20)"  stroke="rgba(110,150,30,0.40)"  strokeWidth="1"/>
      <text x="1140" y="720" textAnchor="middle" fill="rgba(170,220,70,0.95)"  fontSize="10" fontWeight="600" fontFamily="monospace">GN</text>
      <text x="1140" y="756" textAnchor="middle" fill="rgba(170,220,70,0.32)"  fontSize="8"  fontFamily="monospace">Guano</text>

      <circle cx="388"  cy="128" r="31" fill="rgba(100,55,80,0.12)"  stroke="rgba(140,80,110,0.28)"  strokeWidth="1.5"/>
      <circle cx="388"  cy="128" r="20" fill="rgba(100,55,80,0.20)"  stroke="rgba(140,80,110,0.42)"  strokeWidth="1"/>
      <text x="388"  y="133" textAnchor="middle" fill="rgba(200,150,190,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">HP</text>
      <text x="388"  y="169" textAnchor="middle" fill="rgba(200,150,190,0.32)" fontSize="8"  fontFamily="monospace">Humus</text>

      <circle cx="88"   cy="715" r="27" fill="rgba(160,80,30,0.12)"  stroke="rgba(200,110,40,0.26)"  strokeWidth="1.5"/>
      <circle cx="88"   cy="715" r="17" fill="rgba(160,80,30,0.20)"  stroke="rgba(200,110,40,0.40)"  strokeWidth="1"/>
      <text x="88"   y="720" textAnchor="middle" fill="rgba(250,170,100,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">CC</text>
      <text x="88"   y="752" textAnchor="middle" fill="rgba(250,170,100,0.32)" fontSize="8"  fontFamily="monospace">Cacing</text>

      {/* Floating micro-dots */}
      <circle cx="590"  cy="225" r="2.5" fill="rgba(80,140,40,0.35)"/>
      <circle cx="720"  cy="385" r="2"   fill="rgba(120,170,60,0.28)"/>
      <circle cx="855"  cy="488" r="3"   fill="rgba(80,140,40,0.22)"/>
      <circle cx="648"  cy="582" r="2.5" fill="rgba(180,120,20,0.32)"/>
      <circle cx="490"  cy="705" r="2"   fill="rgba(50,140,80,0.26)"/>
      <circle cx="905"  cy="752" r="2.5" fill="rgba(60,150,100,0.28)"/>
      <circle cx="755"  cy="155" r="2"   fill="rgba(100,60,130,0.32)"/>
      <circle cx="1025" cy="358" r="2.5" fill="rgba(150,80,20,0.26)"/>
      <circle cx="558"  cy="448" r="2"   fill="rgba(100,55,80,0.28)"/>
      <circle cx="708"  cy="682" r="3"   fill="rgba(80,140,40,0.20)"/>
      <circle cx="1180" cy="460" r="2"   fill="rgba(50,130,70,0.24)"/>
      <circle cx="430"  cy="540" r="2.5" fill="rgba(180,80,20,0.22)"/>
      <circle cx="820"  cy="280" r="2"   fill="rgba(60,120,40,0.30)"/>
      <circle cx="1060" cy="580" r="2.5" fill="rgba(180,120,20,0.24)"/>
      <circle cx="320"  cy="760" r="2"   fill="rgba(60,150,100,0.26)"/>

      {/* Growth indicators */}
      <g opacity="0.55">
        <circle cx="724" cy="315" r="6" stroke="rgba(80,180,60,0.5)" strokeWidth="1" fill="rgba(80,180,60,0.07)"/>
        <path d="M721 315l3 3 6-6" stroke="rgba(80,180,60,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.45">
        <circle cx="928" cy="525" r="6" stroke="rgba(80,180,60,0.5)" strokeWidth="1" fill="rgba(80,180,60,0.07)"/>
        <path d="M925 525l3 3 6-6" stroke="rgba(80,180,60,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.38">
        <circle cx="555" cy="652" r="6" stroke="rgba(80,180,60,0.5)" strokeWidth="1" fill="rgba(80,180,60,0.07)"/>
        <path d="M552 652l3 3 6-6" stroke="rgba(80,180,60,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.35">
        <circle cx="1180" cy="380" r="5" stroke="rgba(180,150,20,0.5)" strokeWidth="1" fill="rgba(180,150,20,0.07)"/>
        <path d="M1177 380l3 3 5-5" stroke="rgba(180,150,20,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  )
}
