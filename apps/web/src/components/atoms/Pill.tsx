interface PillProps {
  label: string;
  active?: boolean;
  className?: string;
}

export function Pill({ label, active = false, className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-border bg-white text-text-secondary'
      } ${className}`}
    >
      {label}
    </span>
  );
}
