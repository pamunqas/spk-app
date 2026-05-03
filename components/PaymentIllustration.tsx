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
        <linearGradient id="lgCard1" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#003D7A" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#0057FF" stopOpacity="0.28"/>
        </linearGradient>
        <linearGradient id="lgCard2" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#7B2FBE" stopOpacity="0.22"/>
        </linearGradient>
        <linearGradient id="lgCard3" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#F39C12" stopOpacity="0.38"/>
          <stop offset="100%" stopColor="#E67E22" stopOpacity="0.18"/>
        </linearGradient>
      </defs>

      {/* Ambient glows */}
      <ellipse cx="180" cy="210" rx="320" ry="260" fill="rgba(0,87,255,0.045)"/>
      <ellipse cx="1320" cy="680" rx="300" ry="230" fill="rgba(108,92,231,0.055)"/>
      <ellipse cx="1220" cy="190" rx="210" ry="180" fill="rgba(243,156,18,0.035)"/>
      <ellipse cx="720" cy="450" rx="380" ry="280" fill="rgba(99,102,241,0.025)"/>

      {/* ── Credit Card 1 – top-right (Xendit / Midtrans blue) ── */}
      <g transform="translate(1060,55) rotate(-14)">
        <rect width="370" height="232" rx="20" fill="url(#lgCard1)" stroke="rgba(0,87,255,0.28)" strokeWidth="1"/>
        {/* shine */}
        <rect x="0" y="0" width="370" height="232" rx="20" fill="url(#lgCard1)" opacity="0.3"/>
        <rect x="1" y="1" width="240" height="80" rx="19" fill="rgba(255,255,255,0.025)"/>
        {/* chip */}
        <rect x="32" y="68" width="48" height="37" rx="6" fill="rgba(255,210,0,0.28)" stroke="rgba(255,210,0,0.38)" strokeWidth="1"/>
        <line x1="43" y1="68" x2="43" y2="105" stroke="rgba(0,0,0,0.18)" strokeWidth="1.3"/>
        <line x1="57" y1="68" x2="57" y2="105" stroke="rgba(0,0,0,0.18)" strokeWidth="1.3"/>
        <line x1="71" y1="68" x2="71" y2="105" stroke="rgba(0,0,0,0.18)" strokeWidth="1.3"/>
        <line x1="32" y1="82" x2="80" y2="82" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
        <line x1="32" y1="92" x2="80" y2="92" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
        {/* card number dots */}
        {[34,48,62,76,96,110,124,138,158,172,186,200,220,234,248,262].map((x,i) => (
          <circle key={i} cx={x} cy={148} r={3.8} fill="rgba(255,255,255,0.38)"/>
        ))}
        {/* network logos */}
        <circle cx={330} cy={72} r={17} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx={313} cy={72} r={17} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
        {/* label */}
        <text x="32" y="195" fill="rgba(255,255,255,0.52)" fontSize="11" fontFamily="monospace" letterSpacing="2.5">XENDIT</text>
        <text x="32" y="212" fill="rgba(255,255,255,0.28)" fontSize="9" fontFamily="monospace">Payment Gateway</text>
      </g>

      {/* ── Credit Card 2 – bottom-left (HitPay / Prismalink purple) ── */}
      <g transform="translate(-35,608) rotate(9)">
        <rect width="330" height="207" rx="18" fill="url(#lgCard2)" stroke="rgba(108,92,231,0.28)" strokeWidth="1"/>
        <rect x="1" y="1" width="200" height="70" rx="17" fill="rgba(255,255,255,0.022)"/>
        <rect x="30" y="62" width="44" height="34" rx="5" fill="rgba(255,210,0,0.22)" stroke="rgba(255,210,0,0.28)" strokeWidth="1"/>
        <line x1="40" y1="62" x2="40" y2="96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.1"/>
        <line x1="53" y1="62" x2="53" y2="96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.1"/>
        <line x1="66" y1="62" x2="66" y2="96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.1"/>
        {[30,43,56,69,87,100,113,126,144,157,170,183,201,214,227,240].map((x,i) => (
          <circle key={i} cx={x} cy={133} r={3.2} fill="rgba(255,255,255,0.32)"/>
        ))}
        <circle cx={298} cy={68} r={15} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <circle cx={284} cy={68} r={15} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <text x="30" y="175" fill="rgba(255,255,255,0.48)" fontSize="10" fontFamily="monospace" letterSpacing="2">HITPAY</text>
        <text x="30" y="190" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="monospace">SME Gateway</text>
      </g>

      {/* ── Credit Card 3 – bottom-right (Durianpay gold) ── */}
      <g transform="translate(1058,648) rotate(11)">
        <rect width="295" height="185" rx="16" fill="url(#lgCard3)" stroke="rgba(243,156,18,0.24)" strokeWidth="1"/>
        <rect x="1" y="1" width="180" height="60" rx="15" fill="rgba(255,255,255,0.02)"/>
        <rect x="26" y="56" width="40" height="30" rx="5" fill="rgba(255,210,0,0.2)" stroke="rgba(255,210,0,0.25)" strokeWidth="1"/>
        <line x1="35" y1="56" x2="35" y2="86" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="47" y1="56" x2="47" y2="86" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="59" y1="56" x2="59" y2="86" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        {[26,38,50,62,78,90,102,114,130,142,154,166,182,194,206,218].map((x,i) => (
          <circle key={i} cx={x} cy={120} r={3} fill="rgba(255,255,255,0.3)"/>
        ))}
        <text x="26" y="158" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace" letterSpacing="2">DURIANPAY</text>
      </g>

      {/* ── Connection lines ── */}
      <line x1="1110" y1="152" x2="968" y2="85" stroke="rgba(0,87,255,0.14)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1110" y1="152" x2="1255" y2="295" stroke="rgba(0,87,255,0.11)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1110" y1="152" x2="1358" y2="175" stroke="rgba(108,92,231,0.13)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="968" y1="85"  x2="388" y2="128" stroke="rgba(99,102,241,0.09)" strokeWidth="1" strokeDasharray="8 8"/>
      <line x1="388" y1="128" x2="158" y2="178" stroke="rgba(123,47,190,0.13)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="158" y1="178" x2="265" y2="348" stroke="rgba(0,170,91,0.13)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="265" y1="348" x2="108" y2="398" stroke="rgba(0,82,155,0.12)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1255" y1="295" x2="1355" y2="595" stroke="rgba(243,156,18,0.11)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1355" y1="595" x2="1140" y2="715" stroke="rgba(255,102,0,0.1)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="1140" y1="715" x2="218" y2="648" stroke="rgba(39,174,96,0.08)" strokeWidth="1" strokeDasharray="8 8"/>
      <line x1="218" y1="648" x2="88" y2="715" stroke="rgba(45,156,219,0.1)" strokeWidth="1" strokeDasharray="5 5"/>
      <line x1="108" y1="398" x2="88" y2="715" stroke="rgba(232,70,26,0.09)" strokeWidth="1" strokeDasharray="7 7"/>
      <line x1="265" y1="348" x2="1255" y2="295" stroke="rgba(99,102,241,0.06)" strokeWidth="1" strokeDasharray="10 10"/>
      <line x1="388" y1="128" x2="1358" y2="175" stroke="rgba(99,102,241,0.05)" strokeWidth="1" strokeDasharray="12 8"/>

      {/* ── Provider Nodes ── */}
      {/* Xendit */}
      <circle cx="1110" cy="152" r="36" fill="rgba(0,87,255,0.1)" stroke="rgba(0,87,255,0.25)" strokeWidth="1.5"/>
      <circle cx="1110" cy="152" r="23" fill="rgba(0,87,255,0.18)" stroke="rgba(0,87,255,0.42)" strokeWidth="1"/>
      <text x="1110" y="157" textAnchor="middle" fill="rgba(100,165,255,0.95)" fontSize="11" fontWeight="600" fontFamily="monospace">XD</text>
      <text x="1110" y="198" textAnchor="middle" fill="rgba(100,165,255,0.38)" fontSize="8" fontFamily="monospace">Xendit</text>

      {/* Midtrans */}
      <circle cx="968" cy="85" r="31" fill="rgba(0,61,122,0.14)" stroke="rgba(0,90,200,0.28)" strokeWidth="1.5"/>
      <circle cx="968" cy="85" r="20" fill="rgba(0,61,122,0.22)" stroke="rgba(0,90,200,0.42)" strokeWidth="1"/>
      <text x="968" y="90" textAnchor="middle" fill="rgba(120,175,255,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">MT</text>
      <text x="968" y="126" textAnchor="middle" fill="rgba(120,175,255,0.38)" fontSize="8" fontFamily="monospace">Midtrans</text>

      {/* Durianpay */}
      <circle cx="1255" cy="295" r="33" fill="rgba(243,156,18,0.11)" stroke="rgba(243,156,18,0.28)" strokeWidth="1.5"/>
      <circle cx="1255" cy="295" r="21" fill="rgba(243,156,18,0.18)" stroke="rgba(243,156,18,0.42)" strokeWidth="1"/>
      <text x="1255" y="300" textAnchor="middle" fill="rgba(243,156,18,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">DP</text>
      <text x="1255" y="338" textAnchor="middle" fill="rgba(243,156,18,0.38)" fontSize="8" fontFamily="monospace">Durianpay</text>

      {/* HitPay */}
      <circle cx="1358" cy="175" r="29" fill="rgba(108,92,231,0.12)" stroke="rgba(108,92,231,0.28)" strokeWidth="1.5"/>
      <circle cx="1358" cy="175" r="18" fill="rgba(108,92,231,0.2)" stroke="rgba(108,92,231,0.42)" strokeWidth="1"/>
      <text x="1358" y="180" textAnchor="middle" fill="rgba(160,145,255,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">HP</text>
      <text x="1358" y="214" textAnchor="middle" fill="rgba(160,145,255,0.35)" fontSize="8" fontFamily="monospace">HitPay</text>

      {/* OY! Indonesia */}
      <circle cx="158" cy="178" r="31" fill="rgba(0,170,91,0.12)" stroke="rgba(0,170,91,0.27)" strokeWidth="1.5"/>
      <circle cx="158" cy="178" r="20" fill="rgba(0,170,91,0.18)" stroke="rgba(0,170,91,0.4)" strokeWidth="1"/>
      <text x="158" y="183" textAnchor="middle" fill="rgba(0,215,125,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">OY</text>
      <text x="158" y="219" textAnchor="middle" fill="rgba(0,215,125,0.35)" fontSize="8" fontFamily="monospace">OY!</text>

      {/* DOKU */}
      <circle cx="265" cy="348" r="33" fill="rgba(0,82,155,0.12)" stroke="rgba(0,82,155,0.26)" strokeWidth="1.5"/>
      <circle cx="265" cy="348" r="21" fill="rgba(0,82,155,0.2)" stroke="rgba(0,82,155,0.4)" strokeWidth="1"/>
      <text x="265" y="353" textAnchor="middle" fill="rgba(100,165,255,0.88)" fontSize="10" fontWeight="600" fontFamily="monospace">DK</text>
      <text x="265" y="391" textAnchor="middle" fill="rgba(100,165,255,0.32)" fontSize="8" fontFamily="monospace">DOKU</text>

      {/* Faspay */}
      <circle cx="108" cy="398" r="29" fill="rgba(232,70,26,0.12)" stroke="rgba(232,70,26,0.26)" strokeWidth="1.5"/>
      <circle cx="108" cy="398" r="18" fill="rgba(232,70,26,0.2)" stroke="rgba(232,70,26,0.4)" strokeWidth="1"/>
      <text x="108" y="403" textAnchor="middle" fill="rgba(255,125,85,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">FP</text>
      <text x="108" y="436" textAnchor="middle" fill="rgba(255,125,85,0.32)" fontSize="8" fontFamily="monospace">Faspay</text>

      {/* Nicepay */}
      <circle cx="1355" cy="595" r="31" fill="rgba(255,102,0,0.12)" stroke="rgba(255,102,0,0.26)" strokeWidth="1.5"/>
      <circle cx="1355" cy="595" r="19" fill="rgba(255,102,0,0.2)" stroke="rgba(255,102,0,0.4)" strokeWidth="1"/>
      <text x="1355" y="600" textAnchor="middle" fill="rgba(255,145,65,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">NP</text>
      <text x="1355" y="636" textAnchor="middle" fill="rgba(255,145,65,0.32)" fontSize="8" fontFamily="monospace">Nicepay</text>

      {/* iPaymu */}
      <circle cx="218" cy="648" r="29" fill="rgba(45,156,219,0.12)" stroke="rgba(45,156,219,0.26)" strokeWidth="1.5"/>
      <circle cx="218" cy="648" r="18" fill="rgba(45,156,219,0.2)" stroke="rgba(45,156,219,0.4)" strokeWidth="1"/>
      <text x="218" y="653" textAnchor="middle" fill="rgba(80,185,245,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">IP</text>
      <text x="218" y="686" textAnchor="middle" fill="rgba(80,185,245,0.32)" fontSize="8" fontFamily="monospace">iPaymu</text>

      {/* Winpay */}
      <circle cx="1140" cy="715" r="31" fill="rgba(39,174,96,0.12)" stroke="rgba(39,174,96,0.26)" strokeWidth="1.5"/>
      <circle cx="1140" cy="715" r="20" fill="rgba(39,174,96,0.2)" stroke="rgba(39,174,96,0.4)" strokeWidth="1"/>
      <text x="1140" y="720" textAnchor="middle" fill="rgba(65,215,125,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">WP</text>
      <text x="1140" y="756" textAnchor="middle" fill="rgba(65,215,125,0.32)" fontSize="8" fontFamily="monospace">Winpay</text>

      {/* Prismalink */}
      <circle cx="388" cy="128" r="31" fill="rgba(123,47,190,0.12)" stroke="rgba(123,47,190,0.28)" strokeWidth="1.5"/>
      <circle cx="388" cy="128" r="20" fill="rgba(123,47,190,0.2)" stroke="rgba(123,47,190,0.42)" strokeWidth="1"/>
      <text x="388" y="133" textAnchor="middle" fill="rgba(185,145,255,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">PL</text>
      <text x="388" y="169" textAnchor="middle" fill="rgba(185,145,255,0.32)" fontSize="8" fontFamily="monospace">Prismalink</text>

      {/* Espay */}
      <circle cx="88" cy="715" r="27" fill="rgba(230,126,34,0.12)" stroke="rgba(230,126,34,0.26)" strokeWidth="1.5"/>
      <circle cx="88" cy="715" r="17" fill="rgba(230,126,34,0.2)" stroke="rgba(230,126,34,0.4)" strokeWidth="1"/>
      <text x="88" y="720" textAnchor="middle" fill="rgba(255,165,85,0.95)" fontSize="10" fontWeight="600" fontFamily="monospace">EP</text>
      <text x="88" y="752" textAnchor="middle" fill="rgba(255,165,85,0.32)" fontSize="8" fontFamily="monospace">Espay</text>

      {/* Floating micro-dots */}
      <circle cx="590" cy="225" r="2.5" fill="rgba(99,102,241,0.35)"/>
      <circle cx="720" cy="385" r="2"   fill="rgba(167,139,250,0.28)"/>
      <circle cx="855" cy="488" r="3"   fill="rgba(99,102,241,0.22)"/>
      <circle cx="648" cy="582" r="2.5" fill="rgba(243,156,18,0.32)"/>
      <circle cx="490" cy="705" r="2"   fill="rgba(0,170,91,0.26)"/>
      <circle cx="905" cy="752" r="2.5" fill="rgba(45,156,219,0.28)"/>
      <circle cx="755" cy="155" r="2"   fill="rgba(108,92,231,0.32)"/>
      <circle cx="1025" cy="358" r="2.5" fill="rgba(255,102,0,0.26)"/>
      <circle cx="558" cy="448" r="2"   fill="rgba(123,47,190,0.28)"/>
      <circle cx="708" cy="682" r="3"   fill="rgba(99,102,241,0.2)"/>
      <circle cx="1180" cy="460" r="2"  fill="rgba(39,174,96,0.24)"/>
      <circle cx="430" cy="540" r="2.5" fill="rgba(232,70,26,0.22)"/>
      <circle cx="820" cy="280" r="2"   fill="rgba(0,87,255,0.3)"/>
      <circle cx="1060" cy="580" r="2.5" fill="rgba(243,156,18,0.24)"/>
      <circle cx="320" cy="760" r="2"   fill="rgba(45,156,219,0.26)"/>

      {/* Transaction success indicators */}
      <g opacity="0.55">
        <circle cx="724" cy="315" r="6" stroke="rgba(16,185,129,0.5)" strokeWidth="1" fill="rgba(16,185,129,0.07)"/>
        <path d="M721 315l3 3 6-6" stroke="rgba(16,185,129,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.45">
        <circle cx="928" cy="525" r="6" stroke="rgba(16,185,129,0.5)" strokeWidth="1" fill="rgba(16,185,129,0.07)"/>
        <path d="M925 525l3 3 6-6" stroke="rgba(16,185,129,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.38">
        <circle cx="555" cy="652" r="6" stroke="rgba(16,185,129,0.5)" strokeWidth="1" fill="rgba(16,185,129,0.07)"/>
        <path d="M552 652l3 3 6-6" stroke="rgba(16,185,129,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g opacity="0.35">
        <circle cx="1180" cy="380" r="5" stroke="rgba(245,158,11,0.5)" strokeWidth="1" fill="rgba(245,158,11,0.07)"/>
        <path d="M1177 380l3 3 5-5" stroke="rgba(245,158,11,0.8)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  )
}
