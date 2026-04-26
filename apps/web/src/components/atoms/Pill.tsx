type PillTone = 'muted' | 'accent';
type PillSize = 'sm' | 'md';

interface PillProps {
  tone?: PillTone;
  size?: PillSize;
  children: React.ReactNode;
  className?: string;
}

const TONE_CLASS: Record<PillTone, string> = {
  muted: 'bg-surface-alt text-text-muted',
  accent: 'bg-brand/10 text-brand',
};

const SIZE_CLASS: Record<PillSize, string> = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-[12px]',
};

export function Pill({
  tone = 'muted',
  size = 'sm',
  children,
  className = '',
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${SIZE_CLASS[size]} ${TONE_CLASS[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
