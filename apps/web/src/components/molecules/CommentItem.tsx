import { IconHeart, IconRunner } from '../atoms';

export interface CommentData {
  id: string;
  authorName: string;
  authorAvatarUrl?: string | null;
  body: string;
  age: string;
}

interface CommentItemProps {
  comment: CommentData;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <li className="flex items-start gap-2 py-2">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-alt">
        {comment.authorAvatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={comment.authorAvatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <IconRunner size={18} color="#B3B3B3" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-text-primary">
            {comment.authorName}
          </span>
          <span className="text-[11px] text-text-muted">{comment.age}</span>
        </div>
        <p className="break-keep text-sm text-text-secondary">{comment.body}</p>
        <button type="button" className="mt-0.5 text-[11px] text-text-muted">
          댓글 달기
        </button>
      </div>

      <button type="button" aria-label="좋아요" className="pt-1">
        <IconHeart size={18} color="#8E8E8E" />
      </button>
    </li>
  );
}
