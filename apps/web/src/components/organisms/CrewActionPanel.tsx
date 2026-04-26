'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useState } from 'react';
import { IconCalendar, IconPeople, IconPlus } from '../atoms';

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  /** Tailwind background class for the icon button. */
  toneClass: string;
  href?: Route | URL;
}

const ACTIONS: readonly ActionItem[] = [
  {
    label: '크루 관리',
    icon: <IconPeople size={20} color="#FEFEFE" />,
    toneClass: 'bg-[#709BDA]',
  },
  {
    label: '일정 관리',
    icon: <IconCalendar size={20} color="#FEFEFE" />,
    toneClass: 'bg-[#8EB58F]',
  },
  {
    label: '이미지 등록',
    icon: <IconImage />,
    toneClass: 'bg-[#D26A6A]',
  },
  {
    label: '게시판 작성',
    icon: <IconEdit />,
    toneClass: 'bg-[#B791D9]',
    href: '/board/new',
  },
];

/**
 * Floating speed-dial menu shown on the joined-crew home view.
 * Collapsed: a single + FAB. Tap → rotates to × and reveals the four
 * colored action buttons stacked above. Tap again to close.
 */
export function CrewActionPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Stack expands above the FAB. Reverse so the items animate from the
          bottom up when opening. */}
      <ul
        className={[
          'flex flex-col gap-3 transition-all duration-200 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0',
        ].join(' ')}
        aria-hidden={!open}
      >
        {ACTIONS.map((action) => (
          <li key={action.label}>
            {action.href ? (
              <Link
                href={action.href}
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <ActionRow {...action} />
              </Link>
            ) : (
              <button
                type="button"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <ActionRow {...action} />
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-tab-bar-dark shadow-lg ring-1 ring-black/10 transition-transform duration-200 ease-out"
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
      >
        <IconPlus size={20} color="#FEFEFE" />
      </button>
    </div>
  );
}

function ActionRow({
  label,
  icon,
  toneClass,
}: Pick<ActionItem, 'label' | 'icon' | 'toneClass'>) {
  return (
    <>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-primary shadow-sm ring-1 ring-divider">
        {label}
      </span>
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ${toneClass}`}
      >
        {icon}
      </span>
    </>
  );
}

function IconImage() {
  return (
    <svg width={20} height={20} viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x={3} y={4} width={16} height={14} rx={2} stroke="#FEFEFE" strokeWidth={1.6} />
      <circle cx={8} cy={9} r={1.5} fill="#FEFEFE" />
      <path
        d="m4 16 4-4 3 3 3-3 4 5"
        stroke="#FEFEFE"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width={20} height={20} viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M4 16v3h3l9-9-3-3-9 9Z"
        stroke="#FEFEFE"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="m13 7 3 3"
        stroke="#FEFEFE"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}
