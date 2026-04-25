interface RegionRankRowProps {
  rank: number;
  label: string;
  count: number;
  delta?: number;
  swatch: string;
}

export function RegionRankRow({ rank, label, count, delta, swatch }: RegionRankRowProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <span className="w-6 text-sm font-bold text-text-secondary">{rank}</span>
      <span
        className="h-3.5 w-3.5 rounded-sm"
        style={{ backgroundColor: swatch }}
        aria-hidden
      />
      <span className="flex-1 text-sm font-semibold text-text-primary">{label}</span>
      <span className="text-sm font-semibold tabular-nums text-text-primary">
        {count.toLocaleString()}
      </span>
      <span className={`w-14 text-right text-xs font-semibold ${deltaTone(delta)}`}>
        {!delta ? '—' : delta > 0 ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`}
      </span>
    </li>
  );
}

function deltaTone(delta?: number) {
  if (!delta) return 'text-text-muted';
  return delta > 0 ? 'text-[#E53935]' : 'text-[#1976D2]';
}
