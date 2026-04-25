const LINKS = ['고객센터', '공지사항', '자주 묻는 질문'] as const;

export function TopUtilityBar() {
  return (
    <div className="border-b border-divider bg-surface">
      <div className="mx-auto flex h-8 max-w-[1200px] items-center justify-end gap-4 px-4 text-xs text-text-muted">
        {LINKS.map((l) => (
          <a key={l} href="#" className="hover:text-text-secondary">
            {l}
          </a>
        ))}
        <span className="h-3 w-px bg-divider" aria-hidden />
        <a href="#" className="hover:text-text-secondary">
          로그인
        </a>
        <a href="#" className="hover:text-text-secondary">
          회원가입
        </a>
      </div>
    </div>
  );
}
