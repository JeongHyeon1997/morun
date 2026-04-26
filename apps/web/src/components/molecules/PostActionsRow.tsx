import {
  IconBookmark,
  IconChat,
  IconHeart,
  IconShare,
} from '../atoms';

interface PostActionsRowProps {
  likeCount: string | number;
  commentCount: string | number;
  shareCount: string | number;
  date: string;
}

export function PostActionsRow({
  likeCount,
  commentCount,
  shareCount,
  date,
}: PostActionsRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-text-muted">
      <Action icon={<IconHeart size={20} color="#3C3C3C" />}>{likeCount}</Action>
      <Action icon={<IconChat size={20} color="#3C3C3C" />}>{commentCount}</Action>
      <Action icon={<IconShare size={20} color="#3C3C3C" />}>{shareCount}</Action>
      <span className="text-xs">{date}</span>
      <button type="button" aria-label="저장" className="ml-auto">
        <IconBookmark size={20} color="#3C3C3C" />
      </button>
    </div>
  );
}

function Action({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="inline-flex items-center gap-1.5">
      {icon}
      <span className="tabular-nums text-text-primary">{children}</span>
    </button>
  );
}
