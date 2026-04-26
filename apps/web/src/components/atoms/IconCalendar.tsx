interface IconCalendarProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconCalendar({
  size = 22,
  color = '#FEFEFE',
  className,
}: IconCalendarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x={3}
        y={5}
        width={16}
        height={14}
        rx={2}
        stroke={color}
        strokeWidth={1.6}
      />
      <path
        d="M3 9h16M7 3v4M15 3v4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}
