import Link from 'next/link';
import type { Route } from 'next';
import { IconChevron } from '../atoms';

interface MenuRowProps<T extends string> {
  label: string;
  href?: Route<T> | URL;
  onClick?: () => void;
  destructive?: boolean;
  trailing?: React.ReactNode;
}

export function MenuRow<T extends string>({
  label,
  href,
  onClick,
  destructive,
  trailing,
}: MenuRowProps<T>) {
  const body = (
    <div className="flex items-center justify-between border-b border-divider px-5 py-4">
      <span
        className={`text-sm font-medium ${
          destructive ? 'text-[#D26A6A]' : 'text-text-primary'
        }`}
      >
        {label}
      </span>
      {trailing ?? <IconChevron color={destructive ? '#D26A6A' : '#999999'} />}
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block">
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block w-full text-left">
        {body}
      </button>
    );
  }
  return body;
}
