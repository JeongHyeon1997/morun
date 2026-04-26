interface IconBookmarkProps {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
}

export function IconBookmark({
  size = 20,
  color = '#3C3C3C',
  filled = false,
  className,
}: IconBookmarkProps) {
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
        d="M5 3h10v14l-5-3-5 3V3Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
