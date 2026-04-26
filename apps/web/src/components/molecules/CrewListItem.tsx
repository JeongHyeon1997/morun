import Link from 'next/link';
import { IconPeople, IconPlaceholder, Pill } from '../atoms';

export interface CrewListItemData {
  id: string;
  title: string;
  description: string;
  region: string;
  memberCount: number;
  thumbnailUrl?: string | null;
}

interface CrewListItemProps {
  crew: CrewListItemData;
}

export function CrewListItem({ crew }: CrewListItemProps) {
  return (
    <li className="border-b border-divider last:border-b-0">
      <Link
        href={{ pathname: `/crew/${crew.id}` }}
        className="flex items-start gap-3 px-4 py-3"
      >
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-surface-alt">
          {crew.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={crew.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <IconPlaceholder size={32} variant="square" tone="muted" label="🏃" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-danger">{crew.title}</p>
          <p className="mt-0.5 line-clamp-2 break-keep text-[12px] leading-snug text-text-secondary">
            {crew.description}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Pill tone="muted">{crew.region}</Pill>
            <Pill tone="muted">
              <IconPeople size={10} color="#8E8E8E" className="mr-1" />
              {crew.memberCount}명
            </Pill>
          </div>
        </div>
      </Link>
    </li>
  );
}
