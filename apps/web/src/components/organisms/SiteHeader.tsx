import Link from 'next/link';
import { IconPlaceholder } from '../atoms';
import { SearchBar } from '../molecules';

const UTILITY = [
  { key: 'alert', label: '알림', caption: '알림' },
  { key: 'fav', label: '찜', caption: '찜' },
  { key: 'me', label: '나', caption: '마이' },
] as const;

export function SiteHeader() {
  return (
    <div className="border-b border-divider bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center gap-8 px-4 py-5">
        <Link href="/" className="shrink-0 text-3xl font-extrabold tracking-tight text-brand">
          MO<span className="text-brand">:</span>RUN
        </Link>
        <div className="flex-1">
          <SearchBar />
        </div>
        <ul className="flex shrink-0 items-center gap-5">
          {UTILITY.map((u) => (
            <li key={u.key}>
              <a
                href="#"
                className="flex flex-col items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary"
              >
                {/* TODO(icons): replace with provided utility icon */}
                <IconPlaceholder size={28} variant="circle" tone="muted" label={u.label} />
                {u.caption}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
