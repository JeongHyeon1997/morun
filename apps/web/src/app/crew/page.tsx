import { AppHeader, NotchedTabBar } from '@/components/organisms';
import {
  CreateCrewFab,
  CrewListItem,
  SearchBar,
  type CrewListItemData,
} from '@/components/molecules';
import { IconHamburger, IconPeople } from '@/components/atoms';
import { LandingFrame } from '@/components/templates';

const CREWS: readonly CrewListItemData[] = [
  {
    id: 'eunpyeong-running',
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '모두의 러닝 크루는 일주일에 1번씩 모여 자유롭게 운동하는 모임이에요 :)',
    region: '은평구',
    memberCount: 200,
  },
  {
    id: 'eunpyeong-running-2',
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '소개',
    region: '은평구',
    memberCount: 200,
  },
  {
    id: 'eunpyeong-running-3',
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '소개',
    region: '은평구',
    memberCount: 200,
  },
  {
    id: 'eunpyeong-running-4',
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '소개',
    region: '은평구',
    memberCount: 200,
  },
  {
    id: 'eunpyeong-running-5',
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '소개',
    region: '은평구',
    memberCount: 200,
  },
];

export default function CrewListPage() {
  return (
    <LandingFrame>
      <div className="flex flex-1 flex-col">
        <AppHeader
          title="크루"
          titleIcon={<IconPeople size={18} color="#3C3C3C" />}
          rightAction={
            <button type="button" aria-label="메뉴">
              <IconHamburger size={20} />
            </button>
          }
        />

        <div className="px-5 pb-3 pt-4">
          <SearchBar placeholder="크루 또는 지역명을 입력해주세요" />
        </div>

        <ul className="px-1">
          {CREWS.map((crew) => (
            <CrewListItem key={crew.id} crew={crew} />
          ))}
        </ul>

        <div className="relative mt-auto">
          <div className="pointer-events-none absolute -top-20 right-4 z-10">
            <div className="pointer-events-auto">
              <CreateCrewFab />
            </div>
          </div>
          <NotchedTabBar />
        </div>
      </div>
    </LandingFrame>
  );
}
