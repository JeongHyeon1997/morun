import {
  AppHeader,
  BoardFilters,
  NotchedTabBar,
  type BoardFilter,
} from '@/components/organisms';
import { PostListItem, type PostListItemData } from '@/components/molecules';
import { IconPeople, IconPlus } from '@/components/atoms';
import { LandingFrame } from '@/components/templates';
import Link from 'next/link';

const FILTERS: readonly BoardFilter[] = [
  { id: 'all', label: '전체' },
  { id: 'notice', label: '공지' },
  { id: 'cat', label: '카테' },
  { id: 'gori', label: '고리' },
  { id: 'set', label: '설정' },
];

const POSTS: readonly PostListItemData[] = Array.from({ length: 5 }, (_, i) => ({
  id: `post-${i + 1}`,
  authorName: 'kyuria_0123',
  category: '공지',
  title: '🔥10월 9일 한글날 정모 공지🔥',
  excerpt: '장소 : 마포 한강 근처 어딘가...',
  thumbnailUrl: null,
  likeCount: '4.5만',
  commentCount: 230,
  shareCount: '3,123',
  date: '8월 31일',
}));

export default function BoardPage() {
  return (
    <LandingFrame>
      <div className="flex flex-1 flex-col">
        <AppHeader
          title="게시판"
          backHref="/"
          titleIcon={<IconPeople size={18} color="#3C3C3C" />}
        />

        <BoardFilters filters={FILTERS} activeId="all" />

        <ul className="border-t border-divider">
          {POSTS.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </ul>

        <div className="relative mt-auto">
          <Link
            href="/board/new"
            aria-label="글 작성"
            className="absolute -top-16 right-4 z-10 flex h-12 items-center gap-1.5 rounded-full bg-tab-bar-dark pl-3 pr-4 text-white shadow-md"
          >
            <IconPlus size={16} color="#FEFEFE" />
            <span className="text-sm font-semibold">작성</span>
          </Link>
          <NotchedTabBar />
        </div>
      </div>
    </LandingFrame>
  );
}
