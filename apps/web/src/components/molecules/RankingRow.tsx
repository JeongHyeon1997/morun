import { CrewDot, MedalImage } from '../atoms';

interface RankingRowProps {
  rank: number;
  name: string;
  color: string;
  distanceKm: number;
  score: number;
}

export function RankingRow({ rank, name, color, distanceKm, score }: RankingRowProps) {
  const isMedal = rank >= 1 && rank <= 3;
  return (
    <li className="flex items-center gap-2 py-2">
      <span className="flex h-7 w-7 items-center justify-center">
        {isMedal ? (
          <MedalImage rank={rank as 1 | 2 | 3} size={22} />
        ) : (
          <span
            className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#EAEAEA] text-[12px] font-medium"
            style={{ color: '#3C3C3C', letterSpacing: '-0.02em' }}
          >
            {rank}
          </span>
        )}
      </span>
      <CrewDot color={color} size={10} />
      <span className="flex-1 truncate text-sm font-medium" style={{ color }}>
        {name}
      </span>
      <span className="w-[84px] text-right text-[13px] font-semibold tabular-nums text-text-primary">
        {distanceKm.toLocaleString(undefined, { minimumFractionDigits: 1 })}km
      </span>
      <span className="w-9 text-right text-sm font-bold tabular-nums text-text-primary">
        {score}
      </span>
    </li>
  );
}
