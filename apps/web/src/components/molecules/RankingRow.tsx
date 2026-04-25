import Image, { type StaticImageData } from 'next/image';
import rank1 from '@morun/shared/assets/rank-1.png';
import rank2 from '@morun/shared/assets/rank-2.png';
import rank3 from '@morun/shared/assets/rank-3.png';
import { CrewDot } from '../atoms';

const RANK_IMAGE: Record<1 | 2 | 3, StaticImageData> = {
  1: rank1,
  2: rank2,
  3: rank3,
};

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
          <Image
            src={RANK_IMAGE[rank as 1 | 2 | 3]}
            alt={`${rank}위`}
            width={22}
            height={24}
            className="h-6 w-auto"
          />
        ) : (
          <span className="text-sm font-bold text-text-secondary">{rank}</span>
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
