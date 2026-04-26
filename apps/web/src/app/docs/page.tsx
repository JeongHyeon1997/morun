import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

const SECTIONS = [
  {
    title: '공지사항',
    body: '서비스 점검 일정, 신규 기능 안내, 이벤트 소식이 이곳에 표시됩니다. 현재 첫 시즌 베타 운영 중이라 별도의 공지가 없어요.',
  },
  {
    title: '이용약관',
    body: 'MO:RUN 이용약관은 정식 출시 시점에 게시될 예정입니다. 베타 기간 동안 수집되는 데이터는 서비스 품질 개선 목적 외에 사용되지 않아요.',
  },
  {
    title: '개인정보 처리방침',
    body: '개인정보 수집 항목과 이용 목적, 보관 기간, 제3자 제공 여부를 정식 처리방침에서 안내드릴게요. 작성이 완료되는 대로 이 자리에 게시됩니다.',
  },
];

export default function DocsPage() {
  return (
    <LandingFrame>
      <ScrollableScreen
        header={<AppHeader title="문서" backHref="/settings" />}
        footer={<NotchedTabBar />}
      >
        <div className="px-5 py-6">
          {SECTIONS.map((s) => (
            <section key={s.title} className="border-b border-divider py-5 last:border-b-0">
              <h2 className="text-base font-bold text-text-primary">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </ScrollableScreen>
    </LandingFrame>
  );
}
