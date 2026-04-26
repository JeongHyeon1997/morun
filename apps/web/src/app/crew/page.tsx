'use client';

import { useEffect, useState } from 'react';
import {
  AppHeader,
  CrewActionPanel,
  CrewDetailHero,
  CrewMemberList,
  NotchedTabBar,
} from '@/components/organisms';
import {
  CreateCrewFab,
  CrewListItem,
  NoticeRow,
  SearchBar,
  type CrewListItemData,
  type CrewMember,
} from '@/components/molecules';
import { IconHamburger, IconPeople, Pill } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';
import { useCrewStore } from '@/lib/crew/store';

const CREWS: readonly CrewListItemData[] = [
  {
    id: 'eunpyeong-running',
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '모두의 러닝 크루는 일주일에 1번씩 모여 자유롭게 운동하는 모임이에요 :)',
    region: '은평구',
    memberCount: 200,
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `eunpyeong-running-${i + 2}`,
    title: '🔥모두의 러닝 크루🔥(회원모집)',
    description: '소개',
    region: '은평구',
    memberCount: 200,
  })),
];

const NOTICES = [
  '📌 [필독] 첫 모임 참여 전 꼭 확인해주세요!',
  '📣 모임 진행 방식 & 참여 매너 가이드',
  '📅 일정 변경 시 공지 방식 안내',
] as const;

const MEMBERS: readonly CrewMember[] = [
  { id: 'm1', name: '박규리', message: '환영합니다~ :)', distanceKm: 1569.4, leader: true },
  { id: 'm2', name: '박규리', message: '환영합니다~ :)', distanceKm: 1569.4, starred: true },
  { id: 'm3', name: '박규리', message: '환영합니다~ :)', distanceKm: 1569.4, starred: true },
  { id: 'm4', name: '박규리', message: '안녕하세요', distanceKm: 1569.4, rank: 1 },
  { id: 'm5', name: '박규리', message: '러닝에 진심 ㅎ', distanceKm: 1569.4, rank: 2 },
  { id: 'm6', name: '박규리', message: '...', distanceKm: 1569.4, rank: 3 },
  { id: 'm7', name: '박규리', message: '...', distanceKm: 1569.4 },
  { id: 'm8', name: '박규리', message: '...', distanceKm: 1569.4 },
  { id: 'm9', name: '박규리', message: '...', distanceKm: 1569.4 },
  { id: 'm10', name: '박규리', message: '...', distanceKm: 1569.4 },
];

export default function CrewListPage() {
  const [hydrated, setHydrated] = useState(false);
  const joinedCrewId = useCrewStore((s) => s.joinedCrewId);
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Show non-member list during SSR + first paint, then swap on hydrate.
  const isJoined = hydrated && joinedCrewId !== null;

  return (
    <LandingFrame>{isJoined ? <JoinedHome /> : <NonMemberList />}</LandingFrame>
  );
}

function NonMemberList() {
  return (
    <ScrollableScreen
      header={
        <AppHeader
          title="크루"
          titleIcon={<IconPeople size={18} color="#3C3C3C" />}
          rightAction={
            <button type="button" aria-label="메뉴">
              <IconHamburger size={20} />
            </button>
          }
        />
      }
      footer={
        <div className="relative">
          <div className="pointer-events-none absolute -top-20 right-4 z-10">
            <div className="pointer-events-auto">
              <CreateCrewFab />
            </div>
          </div>
          <NotchedTabBar />
        </div>
      }
    >
      <div className="px-5 pb-3 pt-4">
        <SearchBar placeholder="크루 또는 지역명을 입력해주세요" />
      </div>
      <ul className="px-1">
        {CREWS.map((crew) => (
          <CrewListItem key={crew.id} crew={crew} />
        ))}
      </ul>
    </ScrollableScreen>
  );
}

function JoinedHome() {
  const leaveCrew = useCrewStore((s) => s.leaveCrew);
  return (
    <ScrollableScreen
      header={
        <AppHeader
          title="크루"
          titleIcon={<IconPeople size={18} color="#3C3C3C" />}
          rightAction={
            <button type="button" aria-label="메뉴">
              <IconHamburger size={20} />
            </button>
          }
        />
      }
      footer={<NotchedTabBar />}
    >
      <CrewDetailHero shortName="은평러닝" tagline={'은평구 모두의\n러닝 초보 모임'} />

      <div className="px-5 pt-4">
        <Pill tone="muted">은평구 ㆍ 크루 200명</Pill>
        <h2 className="mt-2 text-lg font-extrabold text-text-primary">
          🔥은평러닝🔥(회원모집)
        </h2>
      </div>

      <div className="mt-4 h-[10px] w-full bg-surface-alt" />

      <ul className="px-5 py-3">
        {NOTICES.map((title) => (
          <NoticeRow key={title} title={title} />
        ))}
      </ul>

      <div className="mt-2 h-[10px] w-full bg-surface-alt" />

      <div className="relative px-1 py-3">
        <CrewMemberList members={MEMBERS} />
        <div className="pointer-events-none absolute right-4 top-3">
          <div className="pointer-events-auto">
            <CrewActionPanel />
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 pt-2 text-right">
        <button
          type="button"
          onClick={leaveCrew}
          className="text-xs text-text-muted underline"
        >
          임시 탈퇴 (테스트용)
        </button>
      </div>
    </ScrollableScreen>
  );
}
