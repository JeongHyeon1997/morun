import {
  CrewPodium,
  CrewRanking,
  NotchedTabBar,
  SeoulRegionMap,
  TerritoryHeader,
  type PodiumCrew,
  type RankedCrew,
} from '@/components/organisms';
import { SectionHeader } from '@/components/molecules';
import { LandingFrame } from '@/components/templates';

const CREWS: readonly RankedCrew[] = [
  { id: '1', name: '달리는거 좋아하냐고~', color: '#709BDA', distanceKm: 1569.4, score: 6 },
  { id: '2', name: '33그이상', color: '#8EB58F', distanceKm: 1114.7, score: 5 },
  { id: '3', name: '태어난김에 서울일주', color: '#B791D9', distanceKm: 1369.5, score: 4 },
  { id: '4', name: '다 뛰면 삼겹살', color: '#D26A6A', distanceKm: 1269.5, score: 3 },
  { id: '5', name: '5위', color: '#A8DEFF', distanceKm: 1169.5, score: 2 },
];

export default function HomePage() {
  const top3 = CREWS.slice(0, 3) as unknown as readonly [PodiumCrew, PodiumCrew, PodiumCrew];

  return (
    <LandingFrame>
      <div className="flex flex-1 flex-col">
        <TerritoryHeader region="서울" caption="25개구" />

        <div className="px-5">
          <SeoulRegionMap />
        </div>

        <CrewPodium top3={top3} />

        <div className="mt-2 mb-2 flex justify-center">
          <SectionHeader title="랭킹" />
        </div>
        <CrewRanking crews={CREWS} />

        <div className="mt-auto">
          <NotchedTabBar />
        </div>
      </div>
    </LandingFrame>
  );
}
