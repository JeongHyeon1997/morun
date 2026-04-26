interface IconDotsProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconDots({ size = 20, color = '#3C3C3C', className }: IconDotsProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={color}
      aria-hidden
      className={className}
    >
      <circle cx={4} cy={10} r={1.5} />
      <circle cx={10} cy={10} r={1.5} />
      <circle cx={16} cy={10} r={1.5} />
    </svg>
  );
}
