import { MedalImage } from '../atoms';

const FRAME: Record<1 | 2 | 3, string> = {
  1: '#709BDA',
  2: '#8EB58F',
  3: '#B791D9',
};

const CARD_W = 116;
const CARD_H = 140;
const PHOTO_INSET = 5;
const PHOTO_SIZE = CARD_W - PHOTO_INSET * 2; // 106
const RIBBON_W = 42;
const RIBBON_OVERFLOW = 23;

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  crewName: string;
}

export function PodiumCard({ rank, crewName }: PodiumCardProps) {
  const frame = FRAME[rank];
  return (
    <div
      className="relative shrink-0"
      style={{ width: CARD_W, height: CARD_H + RIBBON_OVERFLOW }}
    >
      <div
        className="absolute bottom-0 left-0 flex flex-col items-center rounded-[12px] border border-[#EAEAEA]"
        style={{
          width: CARD_W,
          height: CARD_H,
          backgroundColor: frame,
          boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
        }}
      >
        <div
          className="mt-[5px] overflow-hidden rounded-[8px] border border-[#EAEAEA] bg-[#E5E5E5]"
          style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
        />
        <p
          className="mt-auto mb-[8px] px-1 text-center"
          style={{
            color: '#3C3C3C',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {crewName}
        </p>
      </div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <MedalImage rank={rank} size={RIBBON_W} />
      </div>
    </div>
  );
}
