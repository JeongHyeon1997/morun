import {
  AppHeader,
  CrewDetailHero,
  CrewMemberList,
} from '@/components/organisms';
import { NoticeRow } from '@/components/molecules';
import { Button, IconHamburger, IconPeople, Pill } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';
import type { CrewMember } from '@/components/molecules';

interface CrewDetailPageProps {
  params: Promise<{ id: string }>;
}

const NOTICES = [
  '📌 [필독] 첫 모임 참여 전 꼭 확인해주세요!',
  '📣 모임 진행 방식 & 참여 매너 가이드',
  '📅 일정 변경 시 공지 방식 안내',
] as const;

const CREW_INTRO = `🏃‍♀️ 주말 가볍게 뛰는 러닝 모임!
📍 고양 일산호수공원
⏰ 매주 토요일 아침 8시
✨ 초보자/가벼운 운동 원하는 분 환영해요!
함께 건강하게 하루 시작해요 🙌`;

const CREW_RULES = `📌 우리 모임은 편안하지만, 서로를 배려하는 분위기를 가장 중요하게 생각해요!
아래 규칙들은 모두가 즐겁고 안전하게 활동하기 위해 꼭 지켜주셨으면 합니다 😊

✅ 1. 시간 약속은 꼭 지켜요 ⏰
모임 특성상 일정이 밀리면 모두에게 영향이 있어요!
부득이하게 늦게 되면 미리 연락 부탁드려요.

✅ 2. 무단불참 ❌
당일 취소나 연락 없는 불참은 다른 참여자에게 피해가 생길 수 있어요.
무단불참이 2회 이상 반복될 경우 참여 제한될 수 있습니다.

✅ 3. 서로 존중하기 🙏
다양한 사람이 모이는 만큼
✨ 사생활 관련 과도한 질문
✨ 정치/종교/갈등 유발 주제
✨ 반말, 욕설
은 지양해요. 모두가 편하게 대화할 수 있도록 기본적인 예의를 지켜주세요!`;

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

export default async function CrewDetailPage({ params }: CrewDetailPageProps) {
  // params is awaited but currently unused — mock data is the same for every id.
  await params;

  return (
    <LandingFrame>
      <ScrollableScreen
        header={
          <AppHeader
            title="크루"
            backHref="/crew"
            titleIcon={<IconPeople size={18} color="#3C3C3C" />}
            rightAction={
              <button type="button" aria-label="메뉴">
                <IconHamburger size={20} />
              </button>
            }
          />
        }
        footer={
          <div className="border-t border-divider bg-white px-5 py-3">
            <Button size="pill" variant="primary">
              가입하기
            </Button>
          </div>
        }
      >
        <CrewDetailHero
          shortName="은평러닝"
          tagline={'은평구 모두의\n러닝 초보 모임'}
        />

        <div className="px-5 pt-4">
          <Pill tone="muted">은평구 ㆍ 크루 200명</Pill>
          <h2 className="mt-2 text-lg font-extrabold text-text-primary">
            🔥은평러닝🔥(회원모집)
          </h2>
        </div>

        <div className="px-5 pt-4">
          <p className="whitespace-pre-line break-keep text-sm leading-relaxed text-text-secondary">
            {CREW_INTRO}
          </p>
          <p className="mt-4 whitespace-pre-line break-keep text-sm leading-relaxed text-text-secondary">
            {CREW_RULES}
          </p>
        </div>

        <div className="mt-6 h-[10px] w-full bg-surface-alt" />

        <ul className="px-5 py-3">
          {NOTICES.map((title) => (
            <NoticeRow key={title} title={title} />
          ))}
        </ul>

        <div className="mt-2 h-[10px] w-full bg-surface-alt" />

        <div className="px-1 py-3">
          <CrewMemberList members={MEMBERS} />
        </div>
      </ScrollableScreen>
    </LandingFrame>
  );
}
