import Image, { type StaticImageData } from 'next/image';
import rank1 from '@morun/shared/assets/rank-1.png';
import rank2 from '@morun/shared/assets/rank-2.png';
import rank3 from '@morun/shared/assets/rank-3.png';

const RANK_IMAGE: Record<1 | 2 | 3, StaticImageData> = {
  1: rank1,
  2: rank2,
  3: rank3,
};

interface MedalImageProps {
  rank: 1 | 2 | 3;
  /** Width in pixels. Height is auto from the source aspect (18:20). */
  size?: number;
  className?: string;
}

// Source asset is 18×20 with the medal circle centered at (≈9, 7) and ribbon
// tails hanging below. The rank number is overlaid on the circle (≈ y=7/20 = 35%).
const ASPECT = 20 / 18;

export function MedalImage({ rank, size = 22, className = '' }: MedalImageProps) {
  const height = size * ASPECT;
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height }}
    >
      <Image
        src={RANK_IMAGE[rank]}
        alt={`${rank}위`}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
      <span
        className="absolute left-1/2 select-none font-extrabold leading-none text-white"
        style={{
          top: '32%',
          transform: 'translate(-50%, -50%)',
          fontSize: size * 0.46,
          textShadow: '0 1px 1px rgba(0,0,0,0.18)',
          letterSpacing: '-0.04em',
        }}
        aria-hidden
      >
        {rank}
      </span>
    </span>
  );
}
