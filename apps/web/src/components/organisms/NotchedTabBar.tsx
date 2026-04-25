import { IconPlaceholder } from '../atoms';

const BAR_HEIGHT = 64;
const NOTCH_RADIUS = 30;

interface TabEntry {
  key: string;
  label: string;
  icon: string;
  center?: boolean;
  active?: boolean;
}

const TABS: readonly TabEntry[] = [
  { key: 'crew', label: '크루', icon: '크루' },
  { key: 'board', label: '게시판', icon: '글' },
  { key: 'seoul', label: '서울', icon: '서울', center: true, active: true },
  { key: 'profile', label: '내정보', icon: '나' },
  { key: 'settings', label: '설정', icon: '설정' },
];

/**
 * Decorative-only bottom tab bar for the web mobile preview column.
 * Mirrors the mobile NotchedTabBar visually; no navigation behavior.
 */
export function NotchedTabBar({ width }: { width: number }) {
  const cx = width / 2;
  const path = [
    `M 0 0`,
    `L ${cx - NOTCH_RADIUS} 0`,
    `A ${NOTCH_RADIUS} ${NOTCH_RADIUS} 0 0 1 ${cx + NOTCH_RADIUS} 0`,
    `L ${width} 0`,
    `L ${width} ${BAR_HEIGHT}`,
    `L 0 ${BAR_HEIGHT}`,
    `Z`,
  ].join(' ');

  return (
    <div className="relative" style={{ height: BAR_HEIGHT }}>
      <svg
        width={width}
        height={BAR_HEIGHT}
        className="absolute inset-x-0 top-0"
        aria-hidden
      >
        <path d={path} fill="#FFFFFF" stroke="#EEEEEE" strokeWidth={1} />
      </svg>
      <div className="absolute inset-0 flex">
        {TABS.map((tab) => {
          const tone = tab.active ? 'primary' : 'muted';
          const color = tab.active ? '#1E2338' : '#999999';
          return (
            <div
              key={tab.key}
              className="flex flex-1 flex-col items-center justify-center gap-0.5"
              style={tab.center ? { transform: 'translateY(-6px)' } : undefined}
            >
              {/* TODO(icons): swap each placeholder for real assets */}
              <IconPlaceholder
                size={tab.center ? 32 : 24}
                variant={tab.center ? 'circle' : 'square'}
                tone={tone}
                label={tab.icon}
              />
              <span className="text-[11px] font-semibold" style={{ color }}>
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
