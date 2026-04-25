import { CategoryNav, SiteFooter, SiteHeader, TopUtilityBar } from '../organisms';

export function HomeTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <TopUtilityBar />
      <SiteHeader />
      <CategoryNav />
      <main className="mx-auto max-w-[1200px] px-4 py-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
