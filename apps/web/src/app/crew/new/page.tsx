'use client';

import { useRouter } from 'next/navigation';
import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';
import { useCrewStore } from '@/lib/crew/store';

const MOCK_CREW_ID = 'eunpyeong-running';

export default function CrewNewPage() {
  const router = useRouter();
  const joinCrew = useCrewStore((s) => s.joinCrew);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinCrew(MOCK_CREW_ID);
    router.push('/crew');
  };

  return (
    <LandingFrame>
      <ScrollableScreen
        header={<AppHeader title="크루 생성" backHref="/crew" />}
        footer={<NotchedTabBar />}
      >
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col items-center justify-center gap-6 px-6 py-10 text-center"
        >
          <div>
            <p className="text-sm text-text-secondary">
              실제 크루 생성 폼은 곧 제공됩니다.
            </p>
            <p className="mt-1 text-xs text-text-muted">
              지금은 버튼을 누르면 임시 크루에 가입된 상태로 들어갑니다.
            </p>
          </div>
          <Button type="submit" size="pill" variant="primary" fullWidth={false}>
            크루 만들기
          </Button>
        </form>
      </ScrollableScreen>
    </LandingFrame>
  );
}
