import { RegionRankRow } from '../molecules';
import { heatColor } from '@/lib/heatScale';
import type { SeoulDistrictId } from '@morun/shared';

export interface RegionStat {
  id: SeoulDistrictId;
  label: string;
  count: number;
  delta?: number;
}

interface RegionRankingProps {
  stats: readonly RegionStat[];
  limit?: number;
}

export function RegionRanking({ stats, limit = 8 }: RegionRankingProps) {
  const top = [...stats].sort((a, b) => b.count - a.count).slice(0, limit);
  return (
    <ol className="divide-y divide-divider rounded-xl border border-border bg-white">
      {top.map((s, i) => (
        <RegionRankRow
          key={s.id}
          rank={i + 1}
          label={s.label}
          count={s.count}
          delta={s.delta}
          swatch={heatColor(s.count)}
        />
      ))}
    </ol>
  );
}
