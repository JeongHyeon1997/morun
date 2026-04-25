interface IconChevronProps {
  direction?: 'left' | 'right';
  size?: number;
  color?: string;
  className?: string;
}

export function IconChevron({
  direction = 'right',
  size = 16,
  color = '#999999',
  className,
}: IconChevronProps) {
  const d = direction === 'right' ? 'M6 4L10 8L6 12' : 'M10 4L6 8L10 12';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
