import { LandingAppPanel, LandingHero } from '../organisms';

export const APP_COLUMN_WIDTH = 428;

interface LandingFrameProps {
  children: React.ReactNode;
}

export function LandingFrame({ children }: LandingFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FA] via-white to-[#FBE9F1]">
      <div className="mx-auto flex w-full max-w-[1280px] gap-10 px-6 py-10 lg:py-16">
        <div className="hidden flex-1 lg:flex lg:flex-col lg:justify-center">
          <LandingHero />
        </div>

        <main
          className="mx-auto w-full overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_20px_60px_-20px_rgba(30,35,56,0.25)]"
          style={{ maxWidth: APP_COLUMN_WIDTH }}
        >
          {children}
        </main>

        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <LandingAppPanel />
        </div>
      </div>
    </div>
  );
}
