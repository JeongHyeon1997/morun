import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'cta' | 'pill';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-tab-bar-dark text-white',
  secondary: 'bg-border-soft text-input-placeholder',
};

const SIZES: Record<Size, string> = {
  cta: 'h-[81px] px-5 text-lg font-semibold tracking-[-0.36px]',
  pill: 'h-[50px] rounded-[10px] px-5 text-sm font-medium tracking-[-0.28px]',
};

export function Button({
  variant = 'primary',
  size = 'cta',
  fullWidth = true,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        'inline-flex items-center justify-center transition-opacity',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
