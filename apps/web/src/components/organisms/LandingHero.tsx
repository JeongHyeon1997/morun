import { SearchBar } from '../molecules';

const TAGS = ['#한강런', '#트레일', '#5K', '#10K', '#하프', '#풀코스'] as const;

export function LandingHero() {
  return (
    <section className="flex flex-col gap-8">
      <div className="text-2xl font-extrabold tracking-tight text-brand">
        MO<span>:</span>RUN
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
          서울 러닝 크루 1위 커뮤니티
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-text-primary md:text-5xl">
          <span className="block">
            우리 동네{' '}
            <span className="rounded-md bg-brand px-2 text-white">25개구</span>
          </span>
          <span className="mt-3 block md:mt-4">땅따먹기 시작!</span>
        </h1>
        <p className="mt-4 max-w-md break-keep text-sm leading-relaxed text-text-secondary">
          크루끼리 거리를 모아 서울 자치구를 점령하세요.
          <br />
          매주 새 챔피언이 정해집니다.
        </p>
      </div>
      <div className="max-w-md">
        <SearchBar placeholder="크루명 / 자치구를 검색해보세요" />
      </div>
      <ul className="flex max-w-md flex-wrap gap-2">
        {TAGS.map((t) => (
          <li
            key={t}
            className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-text-secondary"
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
