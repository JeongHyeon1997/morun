import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { MenuRow } from '@/components/molecules';
import { LandingFrame } from '@/components/templates';

export default function SettingsPage() {
  return (
    <LandingFrame>
      <div className="flex min-h-screen flex-col">
        <AppHeader title="설정" backHref="/" />

        <div className="flex-1">
          <SectionTitle>정보</SectionTitle>
          <MenuRow label="공지사항" href="/docs" />
          <MenuRow label="이용약관" href="/docs" />
          <MenuRow label="개인정보 처리방침" href="/docs" />

          <SectionTitle>계정</SectionTitle>
          <MenuRow label="로그아웃" href="/" />
          <MenuRow label="탈퇴하기" href="/settings/withdraw" destructive />

          <SectionTitle>앱 정보</SectionTitle>
          <MenuRow
            label="버전"
            trailing={<span className="text-sm text-text-muted">0.1.0</span>}
          />
        </div>

        <NotchedTabBar />
      </div>
    </LandingFrame>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-5 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-text-muted">
      {children}
    </p>
  );
}
