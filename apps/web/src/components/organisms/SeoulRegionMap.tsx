'use client';

import { useMemo } from 'react';
import {
  SEOUL_DISTRICTS,
  SEOUL_VIEWBOX,
  type SeoulDistrictId,
} from '@morun/shared';

interface SeoulRegionMapProps {
  fills?: Partial<Record<SeoulDistrictId, string>>;
  selectedId?: SeoulDistrictId;
  onSelect?: (id: SeoulDistrictId) => void;
  defaultFill?: string;
  className?: string;
}

export function SeoulRegionMap({
  fills,
  selectedId,
  onSelect,
  defaultFill = '#F5F5F5',
  className = '',
}: SeoulRegionMapProps) {
  const paths = useMemo(
    () =>
      SEOUL_DISTRICTS.map((d) => ({
        ...d,
        fill: fills?.[d.id] ?? defaultFill,
        active: selectedId === d.id,
      })),
    [fills, selectedId, defaultFill],
  );

  return (
    <svg
      role="img"
      aria-label="서울 자치구 지도"
      viewBox={`0 0 ${SEOUL_VIEWBOX.width} ${SEOUL_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      className={`block h-auto w-full ${className}`}
    >
      <g>
        {paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill={p.fill}
            stroke={p.active ? '#1E2338' : '#FFFFFF'}
            strokeWidth={p.active ? 6 : 2}
            onClick={onSelect ? () => onSelect(p.id) : undefined}
            className={onSelect ? 'cursor-pointer transition-[stroke,stroke-width]' : undefined}
          >
            <title>{p.label}</title>
          </path>
        ))}
      </g>
    </svg>
  );
}
