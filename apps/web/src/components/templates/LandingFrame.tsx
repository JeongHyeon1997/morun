import { LandingAppPanel, LandingHero } from '../organisms';

export const APP_COLUMN_WIDTH = 428;

interface LandingFrameProps {
  children: React.ReactNode;
}

export function LandingFrame({ children }: LandingFrameProps) {
  return (
    <div className="h-dvh bg-gradient-to-br from-[#EEF1FA] via-white to-[#FBE9F1]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] gap-10 lg:px-10 xl:max-w-[1600px] xl:gap-16 xl:px-20 2xl:max-w-[1920px] 2xl:gap-24 2xl:px-32">
        <div className="hidden flex-1 lg:flex lg:flex-col lg:justify-center">
          <LandingHero />
        </div>

        <main
          className="mx-auto flex h-full w-full flex-col overflow-hidden bg-white"
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
