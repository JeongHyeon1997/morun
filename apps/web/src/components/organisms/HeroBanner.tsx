export function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-2xl bg-brand text-white">
      <div className="grid items-center gap-6 p-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Spring Season
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            우리 동네에서 함께 뛰어요
            <br />
            <span className="text-white/80">서울 25개 자치구 러닝 크루</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/80">
            지도를 눌러 동네별 크루와 정기 모임을 한눈에 확인해보세요.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-white/90"
            >
              크루 둘러보기
            </a>
            <a
              href="#"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              대회 일정 보기
            </a>
          </div>
        </div>
        <div className="relative hidden h-48 rounded-xl bg-white/10 md:block" aria-hidden>
          <div className="absolute inset-4 rounded-lg border border-dashed border-white/40" />
        </div>
      </div>
    </section>
  );
}
