import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

export default function CrewNewPage() {
  return (
    <LandingFrame>
      <ScrollableScreen
        header={<AppHeader title="크루 생성" backHref="/crew" />}
        footer={<NotchedTabBar />}
      >
        <div className="flex h-full items-center justify-center px-6 py-10 text-center">
          <p className="text-sm text-text-muted">크루 생성 폼은 곧 제공됩니다.</p>
        </div>
      </ScrollableScreen>
    </LandingFrame>
  );
}
