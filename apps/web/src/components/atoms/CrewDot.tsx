interface CrewDotProps {
  color: string;
  size?: number;
  className?: string;
}

export function CrewDot({ color, size = 10, className = '' }: CrewDotProps) {
  return (
    <span
      className={`inline-block flex-shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size, backgroundColor: color }}
      aria-hidden
    />
  );
}
