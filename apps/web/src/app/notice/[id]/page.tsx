import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { Pill } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

interface NoticeDetailPageProps {
  params: Promise<{ id: string }>;
}

const MOCK_NOTICES: Record<string, { title: string; body: string; date: string }> = {
  n1: {
    title: '📌 [필독] 첫 모임 참여 전 꼭 확인해주세요!',
    body: '안녕하세요, 운영진입니다.\n\n첫 모임 참여 전 아래 사항을 꼭 확인해주세요!\n- 모임 시작 10분 전 도착\n- 러닝화/운동복 착용\n- 비 오면 자동 취소\n\n질문 있으면 운영진 DM 주세요 :)',
    date: '8월 31일',
  },
  n2: {
    title: '📣 모임 진행 방식 & 참여 매너 가이드',
    body: '모임은 항상 가볍게, 즐겁게! 🙌\n\n매너 가이드:\n- 시간 약속 지키기\n- 무단 불참 금지\n- 서로 존중하기\n\n자세한 내용은 운영진 공지 채널에서 확인해주세요.',
    date: '8월 28일',
  },
  n3: {
    title: '📅 일정 변경 시 공지 방식 안내',
    body: '일정 변경은 모임 24시간 전까지 단톡방 + 게시판 동시 공지로 안내드립니다.\n\n날씨 등 불가피한 사유가 있을 땐 당일에도 공지될 수 있어요.',
    date: '8월 25일',
  },
};

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const notice = MOCK_NOTICES[id] ?? {
    title: '공지',
    body: '공지 내용을 불러올 수 없습니다.',
    date: '',
  };

  return (
    <LandingFrame>
      <ScrollableScreen
        header={<AppHeader title="공지" backHref="/crew" />}
        footer={<NotchedTabBar />}
      >
        <div className="px-5 py-6">
          <Pill tone="muted">공지</Pill>
          <h1 className="mt-3 break-keep text-lg font-extrabold leading-snug text-text-primary">
            {notice.title}
          </h1>
          {notice.date && (
            <p className="mt-1 text-xs text-text-muted">{notice.date}</p>
          )}
          <p className="mt-6 whitespace-pre-line break-keep text-sm leading-relaxed text-text-secondary">
            {notice.body}
          </p>
        </div>
      </ScrollableScreen>
    </LandingFrame>
  );
}
