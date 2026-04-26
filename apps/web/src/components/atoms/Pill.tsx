type PillTone = 'muted' | 'accent';

interface PillProps {
  tone?: PillTone;
  children: React.ReactNode;
  className?: string;
}

const TONE_CLASS: Record<PillTone, string> = {
  muted: 'bg-surface-alt text-text-muted',
  accent: 'bg-brand/10 text-brand',
};

export function Pill({ tone = 'muted', children, className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${TONE_CLASS[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
