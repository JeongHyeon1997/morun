interface IconChatProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconChat({ size = 20, color = '#3C3C3C', className }: IconChatProps) {
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
        d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v6a2.5 2.5 0 0 1-2.5 2.5H8l-3.5 3v-3a1.5 1.5 0 0 1-1.5-1.5v-7Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
