import Link from 'next/link';
import { AppHeader } from '@/components/organisms';
import {
  CommentItem,
  PostActionsRow,
  type CommentData,
} from '@/components/molecules';
import { IconDots, IconPeople, IconPlaceholder, IconRunner } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

interface BoardDetailPageProps {
  params: Promise<{ id: string }>;
}

const CAPTION =
  '한강에서 러닝 뛰고 모런 작성 완! 오운완~~ :) 한강에서 러닝 뛰고 모런 작성 완! 오운완~~ :) 한강에서 러닝 뛰고 모런 작성 완! 오운완~~ :)';

const COMMENTS: readonly CommentData[] = [
  {
    id: 'c1',
    authorName: 'kyuria_0123',
    body: '러닝크루 모집합니다 :) DM주세요',
    age: '3시간',
  },
  {
    id: 'c2',
    authorName: 'kyuria_0123',
    body: '러닝크루 모집합니다 :) DM주세요',
    age: '3시간',
  },
];

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  await params;

  return (
    <LandingFrame>
      <ScrollableScreen
        header={
          <AppHeader
            title="게시판"
            backHref="/board"
            titleIcon={<IconPeople size={18} color="#3C3C3C" />}
          />
        }
        footer={
          <div className="border-t border-divider bg-white px-4 py-2">
            <form
              role="search"
              className="flex h-10 items-center gap-2 rounded-full bg-surface-alt px-4"
            >
              <input
                type="text"
                placeholder="댓글 달기"
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button type="submit" className="text-sm font-semibold text-brand">
                게시
              </button>
            </form>
          </div>
        }
      >
        <article className="flex flex-col">
          <header className="flex items-center justify-between px-5 py-2.5">
            <Link
              href={{ pathname: '/profile/kyuria_0123' }}
              className="flex items-center gap-2"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt">
                <IconRunner size={22} color="#B3B3B3" />
              </span>
              <span className="text-sm font-semibold text-text-primary hover:underline">
                kyuria_0123
              </span>
            </Link>
            <button type="button" aria-label="더보기">
              <IconDots size={20} color="#3C3C3C" />
            </button>
          </header>

          <div className="flex aspect-square w-full items-center justify-center bg-surface-alt">
            <IconPlaceholder size={64} variant="square" tone="muted" label="📷" />
          </div>

          <div className="px-5 pt-3">
            <PostActionsRow
              likeCount="4.5만"
              commentCount={230}
              shareCount="3,123"
              date="8월 31일"
            />
          </div>

          <div className="flex items-center gap-1.5 px-5 pt-2 text-sm text-text-secondary">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-surface-alt">
              <IconRunner size={11} color="#B3B3B3" />
            </span>
            <span>
              <Link
                href={{ pathname: '/profile/kyuria_0123' }}
                className="font-semibold text-text-primary hover:underline"
              >
                kyuria_0123
              </Link>
              님 외 여러 명이 좋아합니다.
            </span>
          </div>

          <p className="break-keep px-5 pt-2 text-sm leading-relaxed text-text-primary">
            {CAPTION}
          </p>

          <div className="mt-3 h-[10px] w-full bg-surface-alt" />

          <ul className="px-5 py-2">
            {COMMENTS.map((c) => (
              <CommentItem key={c.id} comment={c} />
            ))}
          </ul>
        </article>
      </ScrollableScreen>
    </LandingFrame>
  );
}
