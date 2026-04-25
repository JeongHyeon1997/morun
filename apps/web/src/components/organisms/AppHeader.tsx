import Link from 'next/link';
import type { Route } from 'next';
import { IconChevron } from '../atoms';

interface AppHeaderProps<T extends string> {
  title: string;
  /** When set, renders a back button linking to this href. */
  backHref?: Route<T> | URL;
}

export function AppHeader<T extends string>({ title, backHref }: AppHeaderProps<T>) {
  return (
    <header className="relative flex h-12 items-center justify-center border-b border-divider px-12">
      {backHref && (
        <Link
          href={backHref}
          aria-label="뒤로 가기"
          className="absolute left-3 inline-flex h-9 w-9 items-center justify-center"
        >
          <IconChevron direction="left" size={20} color="#3C3C3C" />
        </Link>
      )}
      <h1 className="truncate text-base font-bold text-text-primary">{title}</h1>
    </header>
  );
}
