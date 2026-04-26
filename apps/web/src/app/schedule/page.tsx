import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { IconCalendar } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

export default function SchedulePage() {
  return (
    <LandingFrame>
      <ScrollableScreen
        header={
          <AppHeader
            title="일정"
            backHref="/"
            titleIcon={<IconCalendar size={18} color="#3C3C3C" />}
          />
        }
        footer={<NotchedTabBar />}
      >
        <div className="flex h-full items-center justify-center px-6 py-10 text-center">
          <p className="text-sm text-text-muted">크루 일정 화면은 곧 제공됩니다.</p>
        </div>
      </ScrollableScreen>
    </LandingFrame>
  );
}
