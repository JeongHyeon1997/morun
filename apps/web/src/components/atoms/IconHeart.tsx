interface IconHeartProps {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
}

export function IconHeart({
  size = 20,
  color = '#3C3C3C',
  filled = false,
  className,
}: IconHeartProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? color : 'none'}
      aria-hidden
      className={className}
    >
      <path
        d="M10 17.5s-6.25-3.875-6.25-8.75A3.75 3.75 0 0 1 10 5.5a3.75 3.75 0 0 1 6.25 3.25c0 4.875-6.25 8.75-6.25 8.75Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
