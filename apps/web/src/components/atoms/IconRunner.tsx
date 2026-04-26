import { ICON_RUNNER } from '@morun/shared';

interface IconRunnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconRunner({ size = 22, color = '#3C3C3C', className }: IconRunnerProps) {
  const ratio = ICON_RUNNER.height / ICON_RUNNER.width;
  return (
    <svg
      width={size}
      height={Math.round(size * ratio)}
      viewBox={`0 0 ${ICON_RUNNER.width} ${ICON_RUNNER.height}`}
      fill={color}
      aria-hidden
      className={className}
    >
      {ICON_RUNNER.paths.map((p, i) => (
        <path key={i} d={p.d} />
      ))}
    </svg>
  );
}
