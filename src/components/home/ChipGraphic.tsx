export default function ChipGraphic() {
  return (
    <div className="chip-scene" aria-hidden="true">
      <svg className="circuit-board" viewBox="-60 0 660 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* SVG Filters for blue glow */}
        <defs>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="glow"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="glow"></feMergeNode>
              <feMergeNode in="glow"></feMergeNode>
            </feMerge>
          </filter>
        </defs>

        {/* ============ BASE CIRCUIT TRACES (Panjang ke Kiri & Tebal) ============ */}
        <g className="base-traces">
          <path className="trace" d="M-60 210 H185"></path>
          <path className="trace" d="M-60 250 H185"></path>
          <path className="trace" d="M-60 290 H185"></path>
          <path className="trace trace-dim" d="M-30 170 H130 Q150 170 150 190 V210"></path>
          <path className="trace trace-dim" d="M-30 330 H130 Q150 330 150 310 V290"></path>

          <path className="trace" d="M415 210 H600"></path>
          <path className="trace" d="M415 250 H600"></path>
          <path className="trace" d="M415 290 H600"></path>
          <path className="trace trace-dim" d="M560 170 H470 Q450 170 450 190 V210"></path>
          <path className="trace trace-dim" d="M560 330 H470 Q450 330 450 310 V290"></path>

          <path className="trace" d="M235 175 V60 Q235 40 255 40 H310"></path>
          <path className="trace" d="M270 175 V80"></path>
          <path className="trace" d="M305 175 V60"></path>
          <path className="trace" d="M340 175 V40 Q340 20 360 20 H450"></path>
          <path className="trace" d="M365 175 V90 Q365 70 385 70 H500"></path>
          <path className="trace trace-accent" d="M395 175 V100 Q395 80 415 80 H530"></path>

          <path className="trace" d="M235 325 V420 Q235 440 215 440 H130"></path>
          <path className="trace" d="M270 325 V420"></path>
          <path className="trace" d="M305 325 V440"></path>
          <path className="trace" d="M340 325 V430 Q340 450 360 450 H480"></path>
          <path className="trace trace-accent" d="M365 325 V400 Q365 420 385 420 H520"></path>

          <path className="trace trace-dim" d="M80 80 H155 Q175 80 175 100 V175"></path>
          <path className="trace trace-dim" d="M520 80 H445 Q425 80 425 100 V175"></path>
          <path className="trace trace-dim" d="M80 420 H155 Q175 420 175 400 V325"></path>
          <path className="trace trace-dim" d="M520 420 H445 Q425 420 425 400 V325"></path>
        </g>

        {/* ============ ANIMATED PATH PULSES (SETIAP LINE ADA ALIRANNYA) ============ */}
        <g className="flow-pulses">
          <path className="flow-path f-1" d="M-60 210 H185"></path>
          <path className="flow-path f-2" d="M-60 250 H185"></path>
          <path className="flow-path f-3" d="M-60 290 H185"></path>
          <path className="flow-path flow-dim f-4" d="M-30 170 H130 Q150 170 150 190 V210"></path>
          <path className="flow-path flow-dim f-5" d="M-30 330 H130 Q150 330 150 310 V290"></path>

          <path className="flow-path f-6" d="M600 210 H415"></path>
          <path className="flow-path f-7" d="M600 250 H415"></path>
          <path className="flow-path f-8" d="M600 290 H415"></path>
          <path className="flow-path flow-dim f-9" d="M560 170 H470 Q450 170 450 190 V210"></path>
          <path className="flow-path flow-dim f-10" d="M560 330 H470 Q450 330 450 310 V290"></path>

          <path className="flow-path f-11" d="M310 40 H255 Q235 40 235 60 V175"></path>
          <path className="flow-path f-12" d="M270 80 V175"></path>
          <path className="flow-path f-13" d="M305 60 V175"></path>
          <path className="flow-path f-14" d="M450 20 H360 Q340 20 340 40 V175"></path>
          <path className="flow-path f-15" d="M500 70 H385 Q365 70 365 90 V175"></path>
          <path className="flow-path f-16" d="M530 80 H415 Q395 80 395 100 V175"></path>

          <path className="flow-path f-17" d="M130 440 H215 Q235 440 235 420 V325"></path>
          <path className="flow-path f-18" d="M270 420 V325"></path>
          <path className="flow-path f-19" d="M305 440 V325"></path>
          <path className="flow-path f-20" d="M480 450 H360 Q340 450 340 430 V325"></path>
          <path className="flow-path f-21" d="M520 420 H385 Q365 420 365 400 V325"></path>

          <path className="flow-path flow-dim f-22" d="M80 80 H155 Q175 80 175 100 V175"></path>
          <path className="flow-path flow-dim f-23" d="M520 80 H445 Q425 80 425 100 V175"></path>
          <path className="flow-path flow-dim f-24" d="M80 420 H155 Q175 420 175 400 V325"></path>
          <path className="flow-path flow-dim f-25" d="M520 420 H445 Q425 420 425 400 V325"></path>
        </g>

        {/* Tiny endpoint dots */}
        <circle className="dot-end" cx="-30" cy="170" r="3"></circle>
        <circle className="dot-end" cx="-30" cy="330" r="3"></circle>
        <circle className="dot-end" cx="560" cy="170" r="3"></circle>
        <circle className="dot-end" cx="560" cy="330" r="3"></circle>
        <circle className="dot-end" cx="310" cy="40" r="3"></circle>
        <circle className="dot-end" cx="450" cy="20" r="3"></circle>
        <circle className="dot-end" cx="500" cy="70" r="3"></circle>
        <circle className="dot-end" cx="530" cy="80" r="3"></circle>
        <circle className="dot-end" cx="130" cy="440" r="3"></circle>
        <circle className="dot-end" cx="480" cy="450" r="3"></circle>
        <circle className="dot-end" cx="520" cy="420" r="3"></circle>
        <circle className="dot-end" cx="80" cy="80" r="3"></circle>
        <circle className="dot-end" cx="520" cy="80" r="3"></circle>
        <circle className="dot-end" cx="80" cy="420" r="3"></circle>
        <circle className="dot-end" cx="520" cy="420" r="3"></circle>

        {/* ============ CHIP BODY (Gelap dengan Soft Glow Biru) ============ */}
        <rect className="chip-glow-outer" x="175" y="165" width="250" height="170" rx="14" filter="url(#softGlow)"></rect>
        <rect className="chip-glow-border" x="183" y="173" width="234" height="154" rx="12"></rect>

        <rect className="chip-outer" x="185" y="175" width="230" height="150" rx="10"></rect>
        <rect className="chip-inner" x="195" y="185" width="210" height="130" rx="6"></rect>

        {/* ============ PIN STUBS ============ */}
        <rect className="pin-stub" x="232" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="252" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="267" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="282" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="302" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="322" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="337" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="352" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="362" y="165" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="392" y="165" width="6" height="14" rx="1"></rect>

        <rect className="pin-stub" x="232" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="252" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="267" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="282" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="302" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="322" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="337" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="352" y="321" width="6" height="14" rx="1"></rect>
        <rect className="pin-stub" x="362" y="321" width="6" height="14" rx="1"></rect>

        <rect className="pin-stub" x="177" y="207" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="177" y="227" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="177" y="247" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="177" y="267" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="177" y="287" width="14" height="6" rx="1"></rect>

        <rect className="pin-stub" x="409" y="207" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="409" y="227" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="409" y="247" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="409" y="267" width="14" height="6" rx="1"></rect>
        <rect className="pin-stub" x="409" y="287" width="14" height="6" rx="1"></rect>

        {/* ============ INNER CHIP DETAIL ============ */}
        <line className="inner-dash" x1="210" y1="240" x2="390" y2="240" strokeDasharray="8 6"></line>
        <line className="inner-dash" x1="210" y1="255" x2="390" y2="255" strokeDasharray="8 6"></line>
        <line className="inner-dash" x1="210" y1="270" x2="390" y2="270" strokeDasharray="8 6"></line>

        <circle className="inner-detail" cx="375" cy="295" r="2"></circle>
        <circle className="inner-detail" cx="375" cy="305" r="2"></circle>
        <circle className="inner-detail" cx="385" cy="295" r="2"></circle>
        <circle className="inner-detail" cx="385" cy="305" r="2"></circle>

        {/* Chip label */}
        <text className="chip-text" x="300" y="218" textAnchor="middle" dominantBaseline="middle">
          Connected
        </text>
      </svg>
    </div>
  );
}