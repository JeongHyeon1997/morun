interface IconHamburgerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconHamburger({
  size = 20,
  color = '#3C3C3C',
  className,
}: IconHamburgerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3 5h14M3 10h14M3 15h14"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}
