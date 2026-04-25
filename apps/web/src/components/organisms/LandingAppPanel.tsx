import { IconPlaceholder } from '../atoms';

export function LandingAppPanel() {
  return (
    <aside className="flex w-[180px] flex-col items-center gap-4 rounded-2xl border border-border bg-white p-5 text-center shadow-sm">
      <p className="text-sm font-bold text-text-primary">앱에서 바로 확인</p>
      {/* TODO(icons): replace placeholder with real QR code image */}
      <div className="flex h-[140px] w-[140px] items-center justify-center rounded-lg border border-divider bg-surface-alt">
        <IconPlaceholder size={64} variant="square" tone="muted" label="QR" />
      </div>
      <p className="text-xs text-text-muted">QR 코드를 스캔해서 모바일 앱을 받아보세요.</p>
      <div className="flex flex-col gap-2 self-stretch">
        {/* TODO(icons): replace with App Store / Google Play badges */}
        <div className="flex h-10 items-center justify-center rounded-md border border-border text-xs font-semibold text-text-secondary">
          App Store
        </div>
        <div className="flex h-10 items-center justify-center rounded-md border border-border text-xs font-semibold text-text-secondary">
          Google Play
        </div>
      </div>
    </aside>
  );
}
