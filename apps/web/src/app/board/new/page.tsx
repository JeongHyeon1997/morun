import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

export default function BoardNewPage() {
  return (
    <LandingFrame>
      <ScrollableScreen
        header={<AppHeader title="글 작성" backHref="/board" />}
        footer={<NotchedTabBar />}
      >
        <div className="flex h-full items-center justify-center px-6 py-10 text-center">
          <p className="text-sm text-text-muted">글 작성 폼은 곧 제공됩니다.</p>
        </div>
      </ScrollableScreen>
    </LandingFrame>
  );
}
