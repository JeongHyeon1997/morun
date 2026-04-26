import Link from 'next/link';
import {
  IconBookmark,
  IconChat,
  IconHeart,
  IconRunner,
  IconShare,
} from '../atoms';

export interface PostListItemData {
  id: string;
  authorName: string;
  authorAvatarUrl?: string | null;
  category?: string;
  title: string;
  excerpt: string;
  thumbnailUrl?: string | null;
  likeCount: string | number;
  commentCount: string | number;
  shareCount: string | number;
  date: string;
}

interface PostListItemProps {
  post: PostListItemData;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <li className="border-b border-divider last:border-b-0">
      <Link
        href={{ pathname: `/board/${post.id}` }}
        className="block px-5 py-3"
      >
        <div className="flex items-center gap-2">
          <Avatar url={post.authorAvatarUrl} size={36} />
          <span className="text-sm font-semibold text-text-primary">
            {post.authorName}
          </span>
        </div>

        <div className="mt-2 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {post.category ? (
              <span className="mr-1 text-sm font-bold text-brand">
                [{post.category}]
              </span>
            ) : null}
            <span className="break-keep text-sm font-bold text-text-primary">
              {post.title}
            </span>
            <p className="mt-1 line-clamp-2 break-keep text-xs text-text-secondary">
              {post.excerpt}
            </p>
          </div>
          {post.thumbnailUrl !== undefined ? (
            <div className="h-[100px] w-[85px] shrink-0 overflow-hidden rounded-md bg-surface-alt">
              {post.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
          <Counter icon={<IconHeart size={16} color="#8E8E8E" />}>
            {post.likeCount}
          </Counter>
          <Counter icon={<IconChat size={16} color="#8E8E8E" />}>
            {post.commentCount}
          </Counter>
          <Counter icon={<IconShare size={16} color="#8E8E8E" />}>
            {post.shareCount}
          </Counter>
          <span className="ml-auto">{post.date}</span>
          <IconBookmark size={16} color="#8E8E8E" />
        </div>
      </Link>
    </li>
  );
}

function Avatar({ url, size }: { url?: string | null; size: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-alt"
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-full w-full object-cover" />
      ) : (
        <IconRunner size={Math.round(size * 0.6)} color="#B3B3B3" />
      )}
    </span>
  );
}

function Counter({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      {icon}
      <span className="tabular-nums">{children}</span>
    </span>
  );
}
