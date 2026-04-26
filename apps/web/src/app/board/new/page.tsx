import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { LandingFrame } from '@/components/templates';

export default function BoardNewPage() {
  return (
    <LandingFrame>
      <div className="flex flex-1 flex-col">
        <AppHeader title="글 작성" backHref="/board" />
        <div className="flex flex-1 items-center justify-center px-6 py-10 text-center">
          <p className="text-sm text-text-muted">글 작성 폼은 곧 제공됩니다.</p>
        </div>
        <div className="mt-auto">
          <NotchedTabBar />
        </div>
      </div>
    </LandingFrame>
  );
}
