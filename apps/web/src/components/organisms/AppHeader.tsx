import Link from 'next/link';
import type { Route } from 'next';
import { IconChevron } from '../atoms';

interface AppHeaderProps {
  title: string;
  /** When set, renders a back button linking to this href. */
  backHref?: Route | URL;
  /** Optional icon rendered immediately before the title text. */
  titleIcon?: React.ReactNode;
  /** Optional element pinned to the right side of the header (e.g. menu button). */
  rightAction?: React.ReactNode;
}

export function AppHeader({
  title,
  backHref,
  titleIcon,
  rightAction,
}: AppHeaderProps) {
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
      <div className="flex items-center gap-1.5">
        {titleIcon}
        <h1 className="truncate text-base font-bold text-text-primary">{title}</h1>
      </div>
      {rightAction && (
        <div className="absolute right-3 inline-flex h-9 w-9 items-center justify-center">
          {rightAction}
        </div>
      )}
    </header>
  );
}
