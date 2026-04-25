import { RankingRow } from '../molecules';

export interface RankedCrew {
  id: string;
  name: string;
  color: string;
  distanceKm: number;
  score: number;
}

interface CrewRankingProps {
  crews: readonly RankedCrew[];
}

export function CrewRanking({ crews }: CrewRankingProps) {
  return (
    <div className="px-5">
      <div className="flex items-center border-b border-divider py-2">
        <span
          className="flex-1 text-xs font-semibold text-text-muted"
          // align with the name column below: badge(28) + gap(8) + dot(10) + gap(8)
          style={{ paddingLeft: 28 + 8 + 10 + 8 }}
        >
          크루명
        </span>
        <span className="w-[84px] text-right text-xs font-semibold text-text-muted">거리</span>
        <span className="w-9 text-right text-xs font-semibold text-text-muted">점수</span>
      </div>
      <ul>
        {crews.map((c, i) => (
          <RankingRow
            key={c.id}
            rank={i + 1}
            name={c.name}
            color={c.color}
            distanceKm={c.distanceKm}
            score={c.score}
          />
        ))}
      </ul>
    </div>
  );
}
