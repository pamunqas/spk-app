'use client'

export default function EcofarmingBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="ecoBg1" cx="0" cy="0" r="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4C5C2D" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#4C5C2D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ecoBg2" cx="1440" cy="0" r="800" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E67E22" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#E67E22" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ecoBg3" cx="1440" cy="900" r="800" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4956A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D4956A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ecoBg4" cx="0" cy="900" r="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B8C5A" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#5B8C5A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ecoBg5" cx="720" cy="450" r="800" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4C5C2D" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#4C5C2D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Corner gradient blooms */}
        <rect width="1440" height="900" fill="url(#ecoBg1)" />
        <rect width="1440" height="900" fill="url(#ecoBg2)" />
        <rect width="1440" height="900" fill="url(#ecoBg3)" />
        <rect width="1440" height="900" fill="url(#ecoBg4)" />
        <rect width="1440" height="900" fill="url(#ecoBg5)" />

        {/* Large botanical leaf — top left, partially off-screen */}
        <g transform="translate(-160, -190) rotate(-22, 200, 300)" opacity="0.072">
          <path
            d="M 200,50 C 320,100 360,200 360,300 C 360,400 300,480 200,520 C 100,480 40,400 40,300 C 40,200 80,100 200,50 Z"
            fill="#3A4D1E"
          />
          <line x1="200" y1="52" x2="200" y2="518" stroke="#2A3518" strokeWidth="3.5" opacity="0.5" />
          <path d="M 200,130 C 170,144 142,155 122,162" stroke="#2A3518" strokeWidth="2" fill="none" opacity="0.44" />
          <path d="M 200,130 C 230,144 258,155 278,162" stroke="#2A3518" strokeWidth="2" fill="none" opacity="0.44" />
          <path d="M 200,200 C 162,218 122,230 94,238" stroke="#2A3518" strokeWidth="2" fill="none" opacity="0.44" />
          <path d="M 200,200 C 238,218 278,230 306,238" stroke="#2A3518" strokeWidth="2" fill="none" opacity="0.44" />
          <path d="M 200,272 C 165,289 128,300 102,307" stroke="#2A3518" strokeWidth="1.5" fill="none" opacity="0.38" />
          <path d="M 200,272 C 235,289 272,300 298,307" stroke="#2A3518" strokeWidth="1.5" fill="none" opacity="0.38" />
          <path d="M 200,348 C 170,362 142,370 124,374" stroke="#2A3518" strokeWidth="1.5" fill="none" opacity="0.33" />
          <path d="M 200,348 C 230,362 258,370 276,374" stroke="#2A3518" strokeWidth="1.5" fill="none" opacity="0.33" />
          <path d="M 200,420 C 174,432 152,438 140,441" stroke="#2A3518" strokeWidth="1" fill="none" opacity="0.27" />
          <path d="M 200,420 C 226,432 248,438 260,441" stroke="#2A3518" strokeWidth="1" fill="none" opacity="0.27" />
        </g>

        {/* Leaf fan — top right, partially off-screen */}
        <g transform="translate(1230, -50)" opacity="0.065">
          <g transform="rotate(-42, 120, 200)">
            <path
              d="M 120,0 C 210,50 240,160 208,290 C 185,394 136,430 120,434 C 104,430 55,394 32,290 C 0,160 30,50 120,0 Z"
              fill="#A86C10"
            />
            <line x1="120" y1="2" x2="120" y2="432" stroke="#7A4C08" strokeWidth="3" opacity="0.48" />
            <path d="M 120,90 C 88,106 58,118 40,125" stroke="#7A4C08" strokeWidth="1.5" fill="none" opacity="0.42" />
            <path d="M 120,90 C 152,106 182,118 200,125" stroke="#7A4C08" strokeWidth="1.5" fill="none" opacity="0.42" />
            <path d="M 120,180 C 78,197 42,209 22,215" stroke="#7A4C08" strokeWidth="1.5" fill="none" opacity="0.38" />
            <path d="M 120,180 C 162,197 198,209 218,215" stroke="#7A4C08" strokeWidth="1.5" fill="none" opacity="0.38" />
            <path d="M 120,265 C 86,279 58,287 40,291" stroke="#7A4C08" strokeWidth="1" fill="none" opacity="0.32" />
            <path d="M 120,265 C 154,279 182,287 200,291" stroke="#7A4C08" strokeWidth="1" fill="none" opacity="0.32" />
          </g>
          <g transform="translate(110, 35) rotate(-8, 100, 165)">
            <path
              d="M 100,0 C 178,42 200,136 174,244 C 152,330 112,358 100,362 C 88,358 48,330 26,244 C 0,136 22,42 100,0 Z"
              fill="#C48C30"
              opacity="0.82"
            />
            <line x1="100" y1="2" x2="100" y2="360" stroke="#7A4C08" strokeWidth="2.5" opacity="0.42" />
            <path d="M 100,80 C 74,94 50,104 35,110" stroke="#7A4C08" strokeWidth="1.2" fill="none" opacity="0.35" />
            <path d="M 100,80 C 126,94 150,104 165,110" stroke="#7A4C08" strokeWidth="1.2" fill="none" opacity="0.35" />
          </g>
        </g>

        {/* Seedling with roots — bottom right */}
        <g transform="translate(1082, 558)" opacity="0.088">
          <path
            d="M 54,315 C 53,268 52,202 52,140 C 52,82 53,36 53,0"
            stroke="#3A5220" strokeWidth="5.5" fill="none" strokeLinecap="round"
          />
          <path d="M 53,155 C 87,132 122,98 120,50 C 119,26 97,14 79,30 C 65,42 55,98 53,155 Z" fill="#4A6B32" />
          <path d="M 52,133 C 20,110 -18,76 -14,30 C -12,6 10,-6 28,10 C 43,24 50,80 52,133 Z" fill="#375C22" />
          <path d="M 53,76 C 80,54 107,28 106,-12 C 105,-32 84,-42 68,-27 C 55,-14 53,34 53,76 Z" fill="#4A6B32" opacity="0.88" />
          <path d="M 52,62 C 26,40 0,14 1,-26 C 2,-44 23,-54 38,-40 C 51,-28 51,20 52,62 Z" fill="#375C22" opacity="0.88" />
          <path d="M 54,315 C 30,342 12,370 4,408" stroke="#2A3A18" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.48" />
          <path d="M 54,315 C 54,352 53,388 52,425" stroke="#2A3A18" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.48" />
          <path d="M 54,315 C 78,340 97,368 106,404" stroke="#2A3A18" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.48" />
          <path d="M 54,335 C 26,360 8,388 -2,418" stroke="#2A3A18" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.28" />
          <path d="M 54,335 C 80,358 100,384 110,415" stroke="#2A3A18" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.28" />
        </g>

        {/* Large leaf outline watermark — center, very subtle */}
        <g transform="translate(630, 55)" opacity="0.023">
          <path
            d="M 195,0 C 390,80 450,278 388,476 C 328,674 238,714 195,714 C 152,714 62,674 2,476 C -60,278 0,80 195,0 Z"
            fill="none" stroke="#4C5C2D" strokeWidth="2.5"
          />
          <line x1="195" y1="2" x2="195" y2="712" stroke="#4C5C2D" strokeWidth="2" opacity="0.65" />
          <path d="M 195,105 C 145,132 96,150 64,160" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 195,105 C 245,132 294,150 326,160" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 195,225 C 130,252 70,270 34,278" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 195,225 C 260,252 320,270 356,278" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 195,345 C 136,368 84,382 52,388" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.42" />
          <path d="M 195,345 C 254,368 306,382 338,388" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.42" />
          <path d="M 195,460 C 148,480 108,490 86,495" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.32" />
          <path d="M 195,460 C 242,480 282,490 304,495" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.32" />
          <path d="M 195,570 C 158,586 128,594 110,598" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.22" />
          <path d="M 195,570 C 232,586 262,594 280,598" stroke="#4C5C2D" strokeWidth="1" fill="none" opacity="0.22" />
        </g>

        {/* Scattered small leaf accents */}
        <g fill="#4C5C2D">
          <path opacity="0.053" transform="translate(370, 145) rotate(32)"
            d="M 0,-26 C 13,-20 18,-8 18,0 C 18,8 13,20 0,26 C -13,20 -18,8 -18,0 C -18,-8 -13,-20 0,-26 Z" />
          <path opacity="0.048" transform="translate(740, 78) rotate(-18)"
            d="M 0,-22 C 11,-17 15,-7 15,0 C 15,7 11,17 0,22 C -11,17 -15,7 -15,0 C -15,-7 -11,-17 0,-22 Z" />
          <path opacity="0.052" transform="translate(1060, 205) rotate(52)"
            d="M 0,-20 C 10,-15 14,-6 14,0 C 14,6 10,15 0,20 C -10,15 -14,6 -14,0 C -14,-6 -10,-15 0,-20 Z" />
          <path opacity="0.044" transform="translate(230, 648) rotate(-38)"
            d="M 0,-28 C 14,-22 20,-9 20,0 C 20,9 14,22 0,28 C -14,22 -20,9 -20,0 C -20,-9 -14,-22 0,-28 Z" />
          <path opacity="0.048" transform="translate(665, 772) rotate(16)"
            d="M 0,-23 C 11,-18 16,-7 16,0 C 16,7 11,18 0,23 C -11,18 -16,7 -16,0 C -16,-7 -11,-18 0,-23 Z" />
          <path opacity="0.043" transform="translate(925, 582) rotate(-24)"
            d="M 0,-19 C 9,-15 13,-6 13,0 C 13,6 9,15 0,19 C -9,15 -13,6 -13,0 C -13,-6 -9,-15 0,-19 Z" />
          <path opacity="0.040" transform="translate(555, 188) rotate(48)"
            d="M 0,-17 C 8,-13 12,-5 12,0 C 12,5 8,13 0,17 C -8,13 -12,5 -12,0 C -12,-5 -8,-13 0,-17 Z" />
          <path opacity="0.042" transform="translate(440, 420) rotate(-55)"
            d="M 0,-21 C 10,-16 15,-6 15,0 C 15,6 10,16 0,21 C -10,16 -15,6 -15,0 C -15,-6 -10,-16 0,-21 Z" />
        </g>

        {/* Seed / organic particle ellipses */}
        <g fill="#5B8C5A" opacity="0.073">
          <ellipse cx="412" cy="208" rx="4" ry="5.5" transform="rotate(-15, 412, 208)" />
          <ellipse cx="428" cy="195" rx="3" ry="4.2" transform="rotate(22, 428, 195)" />
          <ellipse cx="442" cy="213" rx="2.5" ry="3.5" transform="rotate(-8, 442, 213)" />
          <ellipse cx="745" cy="91" rx="3.8" ry="5" transform="rotate(12, 745, 91)" />
          <ellipse cx="758" cy="77" rx="2.5" ry="3.5" transform="rotate(-18, 758, 77)" />
          <ellipse cx="965" cy="244" rx="4" ry="5.5" transform="rotate(6, 965, 244)" />
          <ellipse cx="978" cy="230" rx="2.5" ry="3.5" transform="rotate(-12, 978, 230)" />
          <ellipse cx="315" cy="485" rx="3.5" ry="4.8" transform="rotate(26, 315, 485)" />
          <ellipse cx="328" cy="498" rx="2.5" ry="3.5" transform="rotate(-9, 328, 498)" />
          <ellipse cx="595" cy="688" rx="3.5" ry="5" transform="rotate(-22, 595, 688)" />
          <ellipse cx="608" cy="675" rx="2.5" ry="3.5" transform="rotate(18, 608, 675)" />
        </g>

        {/* Organic soil horizon lines at bottom */}
        <g opacity="0.038" stroke="#5B4323" fill="none" strokeLinecap="round">
          <path strokeWidth="1.5"
            d="M -20,828 C 100,812 242,836 382,818 C 522,800 662,824 802,804 C 942,784 1082,810 1222,792 C 1342,778 1422,794 1462,787" />
          <path strokeWidth="1.5"
            d="M -20,862 C 122,850 264,870 404,855 C 544,840 684,860 824,845 C 964,830 1104,850 1244,833 C 1342,820 1422,836 1462,828" />
          <circle cx="195" cy="843" r="2.5" fill="#5B4323" stroke="none" />
          <circle cx="210" cy="856" r="1.8" fill="#5B4323" stroke="none" />
          <circle cx="505" cy="836" r="2" fill="#5B4323" stroke="none" />
          <circle cx="524" cy="850" r="1.5" fill="#5B4323" stroke="none" />
          <circle cx="825" cy="826" r="2.5" fill="#5B4323" stroke="none" />
          <circle cx="840" cy="840" r="1.8" fill="#5B4323" stroke="none" />
          <circle cx="1105" cy="816" r="2" fill="#5B4323" stroke="none" />
          <circle cx="1120" cy="830" r="1.5" fill="#5B4323" stroke="none" />
        </g>
      </svg>

      {/* Subtle organic grid overlay */}
      <div className="eco-bg-grid" />
    </div>
  )
}
