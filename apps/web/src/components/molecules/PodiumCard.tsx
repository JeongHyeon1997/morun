import { CrownBadge } from '../atoms';

const FRAME: Record<1 | 2 | 3, string> = {
  1: '#5C77BF',
  2: '#52A186',
  3: '#9079C4',
};

const HEIGHT: Record<1 | 2 | 3, number> = {
  1: 156,
  2: 132,
  3: 132,
};

const WIDTH: Record<1 | 2 | 3, number> = {
  1: 112,
  2: 100,
  3: 100,
};

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  crewName: string;
}

export function PodiumCard({ rank, crewName }: PodiumCardProps) {
  const frame = FRAME[rank];
  return (
    <div className="flex flex-col items-center" style={{ width: WIDTH[rank] }}>
      <div className="relative z-10 -mb-4">
        <CrownBadge rank={rank} size={rank === 1 ? 40 : 34} />
      </div>
      <div
        className="flex w-full flex-col overflow-hidden rounded-[14px] border-[3px] bg-white"
        style={{ height: HEIGHT[rank], borderColor: frame }}
      >
        {/* TODO(image): replace with crew cover photo */}
        <div className="flex-1 bg-[#E5E5E5]" />
        <div className="px-1.5 py-1.5 text-center" style={{ backgroundColor: frame }}>
          <p className="truncate text-[11px] font-bold leading-tight tracking-tight text-white">
            {crewName}
          </p>
        </div>
      </div>
    </div>
  );
}
