import { AppHeader, NotchedTabBar } from '@/components/organisms';
import { LandingFrame } from '@/components/templates';

const BULLETS = [
  '누적 거리, 점령 기록, 크루 활동 내역이 모두 삭제되며 복구할 수 없어요.',
  '소속 크루의 누적 점수에서 본인 기여분이 차감돼요.',
  '운영 정책에 따라 30일간 동일 이메일로 재가입이 제한될 수 있어요.',
  '크루장이라면 탈퇴 전 크루장 위임이 필요해요.',
];

export default function WithdrawPage() {
  return (
    <LandingFrame>
      <div className="flex min-h-screen flex-col">
        <AppHeader title="탈퇴하기" backHref="/settings" />

        <div className="flex-1 px-5 py-6">
          <h2 className="text-xl font-extrabold leading-tight text-text-primary">
            정말 탈퇴하시겠어요?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            탈퇴 시 아래 항목이 즉시 적용돼요. 신중히 결정해주세요.
          </p>

          <ul className="mt-6 space-y-3">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-sm leading-relaxed text-text-secondary"
              >
                <span aria-hidden className="select-none text-text-muted">
                  •
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <WithdrawActions />
        </div>

        <NotchedTabBar />
      </div>
    </LandingFrame>
  );
}

function WithdrawActions() {
  return (
    <div className="mt-10 flex flex-col gap-3">
      {/* TODO(api): wire to DELETE /me when account API is ready */}
      <button
        type="button"
        className="rounded-lg bg-[#D26A6A] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        탈퇴하기
      </button>
      <a
        href="/settings"
        className="rounded-lg border border-border py-3 text-center text-sm font-medium text-text-secondary"
      >
        취소
      </a>
    </div>
  );
}
