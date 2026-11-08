/**
 * Decorative landscape behind the hero screenshot: a road running to the
 * horizon, echoing the RoadPilot logo. Purely illustrative, hidden from
 * assistive technology.
 */
const HORIZON = 200;
const BOTTOM = 480;
const CENTER = 800;

/** Half width of a road element at height y, growing linearly from the horizon. */
const spread = (y: number, halfWidthAtBottom: number) => ((y - HORIZON) / (BOTTOM - HORIZON)) * halfWidthAtBottom;

// Centre-line dashes, longer and further apart towards the viewer.
const dashes: [number, number][] = [
  [206, 211],
  [218, 226],
  [236, 248],
  [262, 282],
  [304, 336],
  [370, 424],
  [470, 560],
];

export function RoadScene() {
  return (
    <svg
      className="road-scene"
      viewBox="0 0 1600 480"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F0E4" />
          <stop offset="0.42" stopColor="#FFE3C8" />
        </linearGradient>
        <linearGradient id="rs-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6A5C4F" />
          <stop offset="1" stopColor="#2B2520" />
        </linearGradient>
        <linearGradient id="rs-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F0E4" stopOpacity="0" />
          <stop offset="1" stopColor="#F7F0E4" />
        </linearGradient>
        <radialGradient id="rs-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF9D57" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FF9D57" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="480" fill="url(#rs-sky)" />
      <circle cx={CENTER} cy={HORIZON - 6} r="170" fill="url(#rs-sun)" />
      <circle cx={CENTER} cy={HORIZON - 6} r="52" fill="#FFB27A" />

      {/* hills, far to near */}
      <path d="M0 196 Q200 150 420 182 T840 176 T1250 166 T1600 186 V480 H0Z" fill="#EDD8BF" />
      <path d="M0 214 Q280 178 560 204 T1080 200 T1600 206 V480 H0Z" fill="#E1C7A7" />
      <path d="M0 250 Q380 214 740 226 L860 226 Q1220 214 1600 248 V480 H0Z" fill="#D4B793" />

      {/* road */}
      <path d={`M${CENTER - 10} ${HORIZON} H${CENTER + 10} L${CENTER + 520} ${BOTTOM} H${CENTER - 520}Z`} fill="url(#rs-road)" />
      <path
        d={`M${CENTER - 10} ${HORIZON} L${CENTER - 520} ${BOTTOM} M${CENTER + 10} ${HORIZON} L${CENTER + 520} ${BOTTOM}`}
        stroke="#F7F0E4"
        strokeWidth="5"
        opacity="0.8"
      />
      {dashes.map(([y1, y2]) => {
        const w1 = Math.max(0.6, spread(y1, 13));
        const w2 = spread(y2, 13);
        return (
          <path key={y1} d={`M${CENTER - w1} ${y1} H${CENTER + w1} L${CENTER + w2} ${y2} H${CENTER - w2}Z`} fill="#FF6B1A" />
        );
      })}
      <rect y="390" width="1600" height="90" fill="url(#rs-fade)" />
    </svg>
  );
}
