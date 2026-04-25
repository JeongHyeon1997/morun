import { type CSSProperties } from 'react';

interface IconPlaceholderProps {
  label?: string;
  size?: number;
  variant?: 'square' | 'circle';
  tone?: 'neutral' | 'primary' | 'muted';
  className?: string;
}

const TONE_CLASS = {
  neutral: 'bg-surface-alt border-border text-text-secondary',
  primary: 'bg-brand border-brand text-white',
  muted: 'bg-surface border-divider text-text-muted',
} as const;

export function IconPlaceholder({
  label,
  size = 24,
  variant = 'square',
  tone = 'neutral',
  className = '',
}: IconPlaceholderProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    fontSize: Math.max(9, size * 0.32),
  };
  const shape = variant === 'circle' ? 'rounded-full' : 'rounded-sm';
  return (
    <span
      role="img"
      aria-label={label ?? 'icon placeholder'}
      style={style}
      className={`inline-flex items-center justify-center border font-bold tracking-tight ${shape} ${TONE_CLASS[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
