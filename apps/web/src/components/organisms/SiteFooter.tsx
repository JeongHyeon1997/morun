const COLUMNS = [
  {
    title: '서비스',
    links: ['크루 찾기', '대회 일정', '러닝 코스', '굿즈샵'],
  },
  {
    title: '커뮤니티',
    links: ['게시판', '러닝 일지', '러닝 메이트'],
  },
  {
    title: '회사',
    links: ['MO:RUN 소개', '채용', '제휴 문의'],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-divider bg-surface">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 md:grid-cols-[2fr_3fr]">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-brand">
            MO<span>:</span>RUN
          </p>
          <p className="mt-3 text-sm text-text-muted">
            서울에서 함께 뛰는 사람들을 위한 러닝 커뮤니티 플랫폼.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-sm">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-bold text-text-primary">{col.title}</p>
              <ul className="mt-3 space-y-2 text-text-secondary">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-text-primary">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-divider">
        <p className="mx-auto max-w-[1200px] px-4 py-4 text-xs text-text-muted">
          © {new Date().getFullYear()} MO:RUN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
