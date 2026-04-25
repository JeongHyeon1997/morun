'use client';

import { forwardRef, useState, type InputHTMLAttributes } from 'react';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Show an inline reveal toggle for password fields. */
  showToggle?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { showToggle, type = 'text', ...rest },
  ref,
) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === 'password';
  const inputType = showToggle && isPassword ? (reveal ? 'text' : 'password') : type;

  return (
    <label className="flex h-[60px] w-full items-center gap-2.5 border-b border-tab-bar-dark px-4">
      <input
        ref={ref}
        {...rest}
        type={inputType}
        className="min-w-0 flex-1 bg-transparent text-lg tracking-[-0.36px] text-ink outline-none placeholder:text-input-placeholder"
      />
      {showToggle && isPassword && (
        <button
          type="button"
          onClick={() => setReveal((v) => !v)}
          aria-label={reveal ? '비밀번호 숨기기' : '비밀번호 표시'}
          className="text-input-placeholder shrink-0 px-1 text-base"
        >
          {reveal ? '🙈' : '👁'}
        </button>
      )}
    </label>
  );
});
