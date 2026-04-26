import { ICON_PEOPLE } from '@morun/shared';

interface IconPeopleProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconPeople({ size = 20, color = '#3C3C3C', className }: IconPeopleProps) {
  const ratio = ICON_PEOPLE.height / ICON_PEOPLE.width;
  return (
    <svg
      width={size}
      height={Math.round(size * ratio)}
      viewBox={`0 0 ${ICON_PEOPLE.width} ${ICON_PEOPLE.height}`}
      fill={color}
      aria-hidden
      className={className}
    >
      {ICON_PEOPLE.paths.map((p, i) => (
        <path key={i} d={p.d} />
      ))}
    </svg>
  );
}
