import Link from 'next/link';
import { Pill } from '../atoms';

interface NoticeRowProps {
  noticeId: string;
  title: string;
}

export function NoticeRow({ noticeId, title }: NoticeRowProps) {
  return (
    <li>
      <Link
        href={{ pathname: `/notice/${noticeId}` }}
        className="flex items-center gap-2 py-1"
      >
        <Pill tone="muted">공지</Pill>
        <span className="truncate text-sm text-text-secondary">{title}</span>
      </Link>
    </li>
  );
}
