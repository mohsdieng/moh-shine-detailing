import { RevealSlider } from "./RevealSlider";

/**
 * Headlight Restoration demo — a draggable before/after of a single SVG
 * headlight: oxidised/yellowed and hazy on the "before" side, optically
 * clear on the "after" side. Pure vector, no photography; accessible and
 * reduced-motion safe via RevealSlider.
 */
function Lens({ clear }: { clear: boolean }) {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={clear ? "lensClear" : "lensCloudy"} cx="38%" cy="34%" r="80%">
          {clear ? (
            <>
              <stop offset="0%" stopColor="#eaf6ff" />
              <stop offset="45%" stopColor="#9cc7e6" />
              <stop offset="100%" stopColor="#2a3b49" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#d9c48f" />
              <stop offset="45%" stopColor="#9a8a55" />
              <stop offset="100%" stopColor="#3a3420" />
            </>
          )}
        </radialGradient>
        <filter id="haze">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      <rect width="320" height="200" fill="#070b10" />

      {/* Lens housing */}
      <g transform="translate(28 30)">
        <path
          d="M6 28 C70 -6 200 -8 256 18 C266 22 264 60 260 96 C256 132 250 156 232 162 C150 184 60 180 18 160 C2 152 -2 96 2 60 Z"
          fill={`url(#${clear ? "lensClear" : "lensCloudy"})`}
          stroke={clear ? "#bfe0f5" : "#6f6238"}
          strokeWidth="2"
        />
        {/* internal reflectors */}
        <g filter={clear ? undefined : "url(#haze)"} opacity={clear ? 0.85 : 0.4}>
          <circle cx="78" cy="84" r="40" fill="none" stroke={clear ? "#dff1ff" : "#b9a86a"} strokeWidth="3" />
          <circle cx="78" cy="84" r="22" fill="none" stroke={clear ? "#dff1ff" : "#b9a86a"} strokeWidth="2" />
          <circle cx="186" cy="82" r="46" fill="none" stroke={clear ? "#dff1ff" : "#b9a86a"} strokeWidth="3" />
          <circle cx="186" cy="82" r="26" fill="none" stroke={clear ? "#dff1ff" : "#b9a86a"} strokeWidth="2" />
        </g>
        {/* a clean highlight only when clear */}
        {clear && (
          <path d="M30 26 C90 8 180 8 230 26" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        )}
        {/* yellow oxidation film only when cloudy */}
        {!clear && <rect x="0" y="0" width="262" height="172" rx="40" fill="#c9b15c" opacity="0.22" />}
      </g>
    </svg>
  );
}

export function HeadlightDemo({ className = "" }: { className?: string }) {
  return (
    <RevealSlider
      className={className}
      label="Headlight restoration: cloudy, oxidised lens restored to optically clear"
      beforeLabel="Cloudy"
      afterLabel="Clear"
      before={<Lens clear={false} />}
      after={<Lens clear />}
    />
  );
}
