interface IconPlusProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconPlus({ size = 20, color = '#3C3C3C', className }: IconPlusProps) {
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
        d="M10 4v12M4 10h12"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}
