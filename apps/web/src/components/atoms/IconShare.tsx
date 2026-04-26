interface IconShareProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconShare({ size = 20, color = '#3C3C3C', className }: IconShareProps) {
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
        d="m17 3-7.5 8.5M17 3l-5 14-3-6-6-3 14-5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
