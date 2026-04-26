import Link from 'next/link';
import { IconPlus } from '../atoms';

export function CreateCrewFab() {
  return (
    <Link
      href="/crew/new"
      className="flex flex-col items-center gap-1"
      aria-label="크루 생성"
    >
      <span className="text-[11px] font-semibold text-text-primary">크루생성!</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-divider">
        <IconPlus size={20} color="#3C3C3C" />
      </span>
    </Link>
  );
}
