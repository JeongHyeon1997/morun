'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { SEOUL_DISTRICTS, SEOUL_VIEWBOX } from '@morun/shared';
import { theme } from '@morun/tokens';
import { useCrewStore } from '@/lib/crew/store';

const BAR_WIDTH = 428;
const BAR_HEIGHT = 76;
const DISC_SIZE = 78;

// Notch path adapted from figma's subtract0.svg — keeps the half-moon
// cutout (apex y=50) but shortens the bar's flat skirt to BAR_HEIGHT.
const BAR_PATH =
  'M428 76H0V0H154C159.523 0 163.896 4.52226 164.987 9.93616C169.595 32.7904 189.788 50 214 50C238.212 50 258.405 32.7904 263.013 9.93616C264.104 4.52226 268.477 0 274 0H428V76Z';

export function NotchedTabBar() {
  // Persisted membership only resolves on the client. Render the default
  // "설정" tab during SSR + first paint, swap to "일정" after hydration so
  // a joined user lands on the schedule tab. Avoids hydration mismatch.
  const [hydrated, setHydrated] = useState(false);
  const joinedCrewId = useCrewStore((s) => s.joinedCrewId);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const isJoined = hydrated && joinedCrewId !== null;

  return (
    <div
      className="relative w-full"
      style={{ height: BAR_HEIGHT, color: theme.color.textOnDark }}
    >
      {/* Bar background with center notch — scales with parent width via the
          428×76 viewBox + preserveAspectRatio="none". */}
      <svg
        width="100%"
        height={BAR_HEIGHT}
        viewBox={`0 0 ${BAR_WIDTH} ${BAR_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 block"
      >
        <path d={BAR_PATH} fill={theme.color.tabBarDark} />
      </svg>

      {/* Side tabs — 2 left + 2 right, middle slot empty (the disc lives there) */}
      <div className="absolute inset-0 grid grid-cols-5 items-end">
        <TabButton icon={<CrewIcon />} label="크루" href="/crew" />
        <TabButton icon={<BoardIcon />} label="게시판" href="/board" />
        <span aria-hidden />
        <TabButton icon={<ProfileIcon />} label="내정보" href="/profile" />
        {isJoined ? (
          <TabButton icon={<CalendarIcon />} label="일정" href="/schedule" />
        ) : (
          <TabButton icon={<SettingsIcon />} label="설정" href="/settings" />
        )}
      </div>

      {/* Floating white disc — center sits exactly on the bar's top edge,
          so half (39px) protrudes above and half drops into the notch.
          Inside the disc: Seoul map icon (top) + "서울" label (lower),
          both in dark text on the white disc. Acts as the home link. */}
      <Link
        href="/"
        aria-label="홈으로 이동"
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white"
        style={{
          width: DISC_SIZE,
          height: DISC_SIZE,
          top: -(DISC_SIZE / 2),
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <span className="absolute left-1/2 -translate-x-1/2" style={{ top: 10 }}>
          <SeoulMiniIcon />
        </span>
        <span
          className="absolute left-0 right-0 text-center text-[12px] font-medium leading-none"
          style={{ bottom: 9, color: '#3C3C3C', letterSpacing: '-0.02em' }}
        >
          서울
        </span>
      </Link>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: Route | URL;
}

function TabButton({ icon, label, href }: TabButtonProps) {
  const inner = (
    <div
      className="relative flex flex-col items-center"
      style={{ paddingBottom: 8 }}
    >
      <div className="mb-1 flex h-[22px] items-end justify-center">{icon}</div>
      <span
        className="text-[12px] font-medium"
        style={{ color: theme.color.textOnDark, letterSpacing: '-0.02em' }}
      >
        {label}
      </span>
    </div>
  );
  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}

// --- Icons (white on dark bar) ---

const ICON_FILL = '#FEFEFE';
const SEOUL_FILL = '#B3B3B3';

function CrewIcon() {
  return (
    <svg width={24} height={18} viewBox="0 0 24 18" fill="none">
      <path d="M11 4C11 6.20914 9.20914 8 7 8C4.79086 8 3 6.20914 3 4C3 1.79086 4.79086 0 7 0C9.20914 0 11 1.79086 11 4Z" fill={ICON_FILL} />
      <path d="M21 4C21 6.20914 19.2091 8 17 8C14.7909 8 13 6.20914 13 4C13 1.79086 14.7909 0 17 0C19.2091 0 21 1.79086 21 4Z" fill={ICON_FILL} />
      <path d="M0.356893 13.2155C0.730832 11.3458 2.37249 10 4.27922 10H9.72078C11.6275 10 13.2692 11.3458 13.6431 13.2155L13.947 14.735C13.9822 14.9112 14 15.0905 14 15.2703C14 16.7779 12.7779 18 11.2703 18H2.72971C1.22213 18 0 16.7779 0 15.2703C0 15.0905 0.0177559 14.9112 0.053009 14.735L0.356893 13.2155Z" fill={ICON_FILL} />
      <path d="M19.2206 9.99995C21.1274 9.99995 22.7695 11.3461 23.1435 13.2158L23.4472 14.7353C23.4824 14.9114 23.4999 15.0909 23.4999 15.2705C23.4998 16.7779 22.2778 17.9998 20.7704 18H14.2294C14.0217 17.9999 13.9988 17.7134 14.1767 17.6064C14.9693 17.1296 15.4999 16.2631 15.4999 15.2705C15.4999 15.0909 15.4824 14.9114 15.4472 14.7353L15.1435 13.2158C14.9342 12.1695 14.4999 11.5 13.4999 10.5C12.9395 9.93946 14.9395 9.99995 15.7792 9.99995H19.2206Z" fill={ICON_FILL} />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width={18} height={21} viewBox="0 0 18 21" fill="none">
      <rect width={18} height={20.25} rx={2} fill={ICON_FILL} />
      <line x1={4.5} y1={6.5} x2={13.5} y2={6.5} stroke="#EAEAEA" strokeLinecap="round" />
      <line x1={4.5} y1={9.5} x2={13.5} y2={9.5} stroke="#EAEAEA" strokeLinecap="round" />
      <line x1={4.5} y1={12.5} x2={13.5} y2={12.5} stroke="#EAEAEA" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width={21} height={22} viewBox="0 0 21 22" fill="none">
      <path d="M17.3399 5C18.7838 5 19.9543 3.88071 19.9543 2.5C19.9543 1.11929 18.7838 0 17.3399 0C15.896 0 14.7255 1.11929 14.7255 2.5C14.7255 3.88071 15.896 5 17.3399 5Z" fill={ICON_FILL} />
      <path d="M7.92784 2.9377L5.80531 4.20625C5.43165 4.42957 5.31381 4.79894 5.31381 5.19575C5.31381 5.98119 6.21728 6.46003 6.9138 6.04375L8.88874 4.86341C9.25517 4.64441 9.72473 4.66348 10.0704 4.91141L11.5883 6L7.71129 9.70739C7.50765 9.90213 7.32117 10.1126 7.15377 10.3367L5.25749 12.8754C4.98231 13.2438 4.48264 13.3894 4.03935 13.2305L1.35052 12.2663C0.915617 12.1103 0.425683 12.2614 0.16804 12.631C-0.157506 13.098 0.0058042 13.7314 0.52103 14.0001L3.10634 15.3486C4.39637 16.0215 6.00197 15.7479 6.96962 14.6904L8.97392 12.5L10.8564 15.0201C11.3067 15.623 11.3716 16.4144 11.0251 17.077L9.20776 20.5528C8.8601 21.2177 9.36571 22 10.1431 22C10.6353 22 11.109 21.9167 11.3544 21.4472L13.4158 17.5049C13.9046 16.5701 13.8494 15.4595 13.2701 14.5732L11.5883 12L14.7255 9L16.1605 9.91482C17.4514 10.7378 18.8803 10.6756 20.2849 10.2279C20.7713 10.0729 21 9.64467 21 9.18046C21 8.56252 20.4198 8.09248 19.7823 8.19407C19.0605 8.30911 18.0156 8.69488 17.4813 8.01366C15.7352 5.78731 13.6743 4.21933 11.1141 2.85922C10.1162 2.32907 8.8959 2.35913 7.92784 2.9377Z" fill={ICON_FILL} />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <path d="M10.32 0.630601C10.7036 0.274907 11.2964 0.274907 11.68 0.630601L14.02 2.80069C14.1954 2.96334 14.4233 3.05774 14.6623 3.06675L17.8515 3.18691C18.3742 3.2066 18.7934 3.62582 18.8131 4.14855L18.9333 7.33767C18.9423 7.57671 19.0367 7.80461 19.1993 7.98L21.3694 10.32C21.7251 10.7036 21.7251 11.2964 21.3694 11.68L19.1993 14.02C19.0367 14.1954 18.9423 14.4233 18.9333 14.6623L18.8131 17.8515C18.7934 18.3742 18.3742 18.7934 17.8515 18.8131L14.6623 18.9333C14.4233 18.9423 14.1954 19.0367 14.02 19.1993L11.68 21.3694C11.2964 21.7251 10.7036 21.7251 10.32 21.3694L7.98 19.1993C7.80461 19.0367 7.57671 18.9423 7.33767 18.9333L4.14855 18.8131C3.62582 18.7934 3.2066 18.3742 3.18691 17.8515L3.06675 14.6623C3.05774 14.4233 2.96334 14.1954 2.80069 14.02L0.630601 11.68C0.274906 11.2964 0.274907 10.7036 0.630601 10.32L2.80069 7.98C2.96334 7.80461 3.05774 7.57671 3.06675 7.33767L3.18691 4.14855C3.2066 3.62582 3.62582 3.2066 4.14855 3.18691L7.33767 3.06675C7.57671 3.05774 7.80461 2.96334 7.98 2.80069L10.32 0.630601Z" fill={ICON_FILL} />
      <circle cx={11} cy={11} r={4} fill="#EAEAEA" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <rect x={3} y={5} width={16} height={14} rx={2} stroke={ICON_FILL} strokeWidth={1.6} />
      <path d="M3 9h16M7 3v4M15 3v4" stroke={ICON_FILL} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function SeoulMiniIcon({ className }: { className?: string }) {
  // Reuses the SAME 25-district vector data the main map uses, rendered as a
  // single silhouette (no strokes, single fill). This keeps the disc icon
  // visually consistent with SeoulRegionMap above.
  return (
    <svg
      width={50}
      height={43}
      viewBox={`0 0 ${SEOUL_VIEWBOX.width} ${SEOUL_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      fill={SEOUL_FILL}
      className={className}
      aria-hidden
    >
      {SEOUL_DISTRICTS.map((d) => (
        <path key={d.id} d={d.d} />
      ))}
    </svg>
  );
}
