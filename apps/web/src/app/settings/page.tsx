'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { MenuRow } from '@/components/molecules';
import { LandingFrame } from '@/components/templates';
import { useAuthStore } from '@/lib/auth/store';

export default function SettingsPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  const showAuthenticated = hydrated && isAuthenticated && user;

  return (
    <LandingFrame>
      <div className="flex min-h-screen flex-col">
        <AppHeader title="설정" backHref="/" />

        <div className="flex-1">
          {showAuthenticated && (
            <>
              <SectionTitle>프로필</SectionTitle>
              <MenuRow
                label={user.nickname}
                trailing={
                  <span className="text-sm text-text-muted">{user.email}</span>
                }
              />
            </>
          )}

          <SectionTitle>정보</SectionTitle>
          <MenuRow label="공지사항" href="/docs" />
          <MenuRow label="이용약관" href="/docs" />
          <MenuRow label="개인정보 처리방침" href="/docs" />

          <SectionTitle>계정</SectionTitle>
          {showAuthenticated ? (
            <>
              <MenuRow label="로그아웃" onClick={handleLogout} />
              <MenuRow label="탈퇴하기" href="/settings/withdraw" destructive />
            </>
          ) : (
            <MenuRow label="로그인" href="/login" />
          )}

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
