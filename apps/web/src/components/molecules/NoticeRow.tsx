import { Pill } from '../atoms';

interface NoticeRowProps {
  title: string;
}

export function NoticeRow({ title }: NoticeRowProps) {
  return (
    <li className="flex items-center gap-2 py-1">
      <Pill tone="muted">공지</Pill>
      <span className="truncate text-sm text-text-secondary">{title}</span>
    </li>
  );
}
