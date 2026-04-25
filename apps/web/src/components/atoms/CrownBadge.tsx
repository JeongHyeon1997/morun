const PALETTE: Record<1 | 2 | 3, { fill: string; stroke: string }> = {
  1: { fill: '#F4B939', stroke: '#D49417' },
  2: { fill: '#B6BCC4', stroke: '#8C949C' },
  3: { fill: '#C98456', stroke: '#9E6238' },
};

// Crown peaks (3) + circular medallion as a single continuous outline.
// viewBox 36x40; the circle base sits at y=8, radius 14, center (18, 22).
const CROWN_PATH =
  'M 4 8 L 8 0 L 12 6 L 18 0 L 24 6 L 28 0 L 32 8 A 14 14 0 1 1 4 8 Z';

interface CrownBadgeProps {
  rank: 1 | 2 | 3;
  size?: number;
}

export function CrownBadge({ rank, size = 36 }: CrownBadgeProps) {
  const palette = PALETTE[rank];
  const w = size;
  const h = (size * 40) / 36;

  return (
    <span
      className="relative inline-block"
      style={{ width: w, height: h }}
      aria-label={`${rank}위`}
    >
      <svg width={w} height={h} viewBox="0 0 36 40" className="block">
        <path
          d={CROWN_PATH}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="absolute inset-x-0 flex items-center justify-center font-extrabold text-white"
        style={{
          top: `${((22 / 40) * 100).toFixed(2)}%`,
          transform: 'translateY(-50%)',
          fontSize: size * 0.36,
          textShadow: '0 1px 1px rgba(0,0,0,0.18)',
          letterSpacing: '-0.02em',
        }}
      >
        {rank}
      </span>
    </span>
  );
}
