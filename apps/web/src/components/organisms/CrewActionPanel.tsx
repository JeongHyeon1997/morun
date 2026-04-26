import Link from 'next/link';
import type { Route } from 'next';
import { IconCalendar, IconPeople } from '../atoms';

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  href?: Route | URL;
}

const ACTIONS: readonly ActionItem[] = [
  { label: '크루 관리', icon: <IconPeople size={22} color="#3C3C3C" /> },
  { label: '일정 관리', icon: <IconCalendar size={22} color="#3C3C3C" /> },
  { label: '이미지 등록', icon: <IconImage /> },
  { label: '게시판 작성', icon: <IconEdit />, href: '/board/new' },
];

/**
 * Floating quick-action panel shown on the joined-crew home view.
 * Pinned to the right side of the column, vertically stacked actions.
 */
export function CrewActionPanel() {
  return (
    <ul className="flex flex-col gap-3">
      {ACTIONS.map((action) => (
        <li key={action.label}>
          {action.href ? (
            <Link href={action.href} className="block">
              <ActionRow label={action.label} icon={action.icon} />
            </Link>
          ) : (
            <button type="button" className="block w-full">
              <ActionRow label={action.label} icon={action.icon} />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function ActionRow({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-text-primary">
        {label}
      </span>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-divider">
        {icon}
      </span>
    </div>
  );
}

function IconImage() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x={3} y={4} width={16} height={14} rx={2} stroke="#3C3C3C" strokeWidth={1.6} />
      <circle cx={8} cy={9} r={1.5} fill="#3C3C3C" />
      <path d="m4 16 4-4 3 3 3-3 4 5" stroke="#3C3C3C" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M4 16v3h3l9-9-3-3-9 9Z" stroke="#3C3C3C" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="m13 7 3 3" stroke="#3C3C3C" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}
