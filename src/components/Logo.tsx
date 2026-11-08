import { useId } from 'react';

/** RoadPilot mark (same artwork as the desktop app): a road running to the horizon as an "A". */
export function LogoMark({ size = 36 }: { size?: number }) {
  const gradientId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="0.6" y2="0">
          <stop offset="0" stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#E24E00" />
        </linearGradient>
      </defs>
      <path d="M21 5h6L13 43H3z" fill={`url(#${gradientId})`} />
      <path d="M27 5h-3.2L36 43h9z" fill="#171717" />
      <path d="M24 17v4M24.4 25.5v5M24.8 35v6" stroke="#171717" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo__word">
        Road<span className="logo__accent">Pilot</span>
      </span>
    </span>
  );
}
