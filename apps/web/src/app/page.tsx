import { SEOUL_DISTRICTS, type SeoulDistrictId } from '@morun/shared';
import { HEAT_LEGEND, heatColor } from '@/lib/heatScale';
import { type CrewSummary, HeatLegend, SectionHeader } from '@/components/molecules';
import {
  CrewHighlights,
  HeroBanner,
  QuickCategoryGrid,
  RegionRanking,
  SeoulRegionMap,
  type RegionStat,
} from '@/components/organisms';
import { HomeTemplate } from '@/components/templates';

const COUNTS: Partial<Record<SeoulDistrictId, number>> = {
  'Gangnam-gu': 38,
  'Seocho-gu': 27,
  'Songpa-gu': 24,
  'Mapo-gu': 22,
  'Yongsan-gu': 18,
  'Seongdong-gu': 16,
  'Gwangjin-gu': 14,
  'Yeongdeungpo-gu': 13,
  'Gwanak-gu': 12,
  'Dongjak-gu': 11,
  'Eunpyeong-gu': 9,
  'Seodaemun-gu': 9,
  'Jongno-gu': 8,
  'Jung-gu': 7,
  'Seongbuk-gu': 7,
  'Nowon-gu': 6,
  'Gangdong-gu': 6,
  'Gangseo-gu': 6,
  'Yangcheon-gu': 5,
  'Guro-gu': 4,
  'Geumcheon-gu': 3,
  'Dongdaemun-gu': 3,
  'Jungnang-gu': 2,
  'Gangbuk-gu': 1,
  'Dobong-gu': 1,
};

const DELTA: Partial<Record<SeoulDistrictId, number>> = {
  'Gangnam-gu': 4,
  'Seocho-gu': 2,
  'Songpa-gu': -1,
  'Mapo-gu': 3,
  'Yongsan-gu': 1,
};

const CREWS: readonly CrewSummary[] = [
  { id: '1', name: '한강 새벽 러닝클럽', region: '용산구', members: 1240, pace: '5:30/km' },
  { id: '2', name: '서울숲 위크데이런', region: '성동구', members: 870, pace: '6:00/km' },
  { id: '3', name: '강남 페이스메이커', region: '강남구', members: 2310, pace: '4:45/km' },
  { id: '4', name: '잠실 우리동네런', region: '송파구', members: 540, pace: '6:30/km' },
  { id: '5', name: '망원 노을 러너스', region: '마포구', members: 690, pace: '5:50/km' },
  { id: '6', name: '여의도 점심런', region: '영등포구', members: 412, pace: '5:45/km' },
  { id: '7', name: '관악산 트레일클럽', region: '관악구', members: 318, pace: '7:00/km' },
  { id: '8', name: '서울숲 야간런', region: '성동구', members: 503, pace: '5:55/km' },
];

export default function HomePage() {
  const fills: Record<string, string> = {};
  const stats: RegionStat[] = SEOUL_DISTRICTS.map((d) => {
    const count = COUNTS[d.id] ?? 0;
    fills[d.id] = heatColor(count);
    return { id: d.id, label: d.label, count, delta: DELTA[d.id] };
  });

  return (
    <HomeTemplate>
      <div className="space-y-12">
        <HeroBanner />

        <section>
          <QuickCategoryGrid />
        </section>

        <section>
          <SectionHeader
            title="지역별 러닝 활동"
            caption="이번 주 활동 중인 크루 수"
            actionLabel="전체보기"
          />
          <div className="grid gap-6 rounded-2xl border border-border bg-white p-6 md:grid-cols-[1.1fr_1fr]">
            <div>
              <SeoulRegionMap fills={fills} />
              <div className="mt-4">
                <HeatLegend steps={HEAT_LEGEND} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold text-text-primary">활동 많은 동네 TOP 8</p>
              <RegionRanking stats={stats} />
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            title="이번 주 추천 크루"
            caption="가까운 동네에서 인기 있는 모임"
            actionLabel="더보기"
          />
          <CrewHighlights crews={CREWS} />
        </section>
      </div>
    </HomeTemplate>
  );
}
