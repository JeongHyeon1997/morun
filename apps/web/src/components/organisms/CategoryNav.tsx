const CATEGORIES = [
  { key: 'home', label: '홈', active: true },
  { key: 'crews', label: '크루' },
  { key: 'races', label: '대회' },
  { key: 'courses', label: '코스' },
  { key: 'board', label: '게시판' },
  { key: 'goods', label: '굿즈' },
] as const;

export function CategoryNav() {
  return (
    <nav className="border-b border-divider bg-white">
      <ul className="mx-auto flex max-w-[1200px] items-stretch gap-2 overflow-x-auto px-4">
        {CATEGORIES.map((c) => {
          const active = 'active' in c && c.active;
          return (
            <li key={c.key} className="shrink-0">
              <a
                href="#"
                className={`relative flex h-12 items-center px-4 text-sm font-semibold transition-colors ${
                  active ? 'text-brand' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {c.label}
                {active ? (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-brand" />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
