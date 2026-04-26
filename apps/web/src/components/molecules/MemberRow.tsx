import Link from 'next/link';
import { MedalImage } from '../atoms';

export interface CrewMember {
  id: string;
  name: string;
  message?: string;
  distanceKm: number;
  rank?: 1 | 2 | 3;
  starred?: boolean;
  leader?: boolean;
  avatarUrl?: string | null;
}

interface MemberRowProps {
  member: CrewMember;
}

export function MemberRow({ member }: MemberRowProps) {
  return (
    <li className="flex items-center gap-3 py-2">
      <div className="relative h-10 w-10 shrink-0">
        <span className="block h-full w-full rounded-full bg-surface-alt">
          {member.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.avatarUrl}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          ) : null}
        </span>
        {member.rank ? (
          <span className="absolute -bottom-1 -left-1">
            <MedalImage rank={member.rank} size={20} />
          </span>
        ) : member.starred ? (
          <span className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px]">
            ⭐
          </span>
        ) : member.leader ? (
          <span className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px]">
            👑
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 items-baseline gap-2">
        <Link
          href={{ pathname: `/profile/${member.name}` }}
          className="text-sm font-medium text-text-primary hover:underline"
        >
          {member.name}
        </Link>
        {member.message ? (
          <span className="truncate text-sm text-text-secondary">{member.message}</span>
        ) : null}
      </div>

      <span className="shrink-0 text-sm font-semibold tabular-nums text-text-primary">
        {member.distanceKm.toLocaleString(undefined, { minimumFractionDigits: 1 })}km
      </span>
    </li>
  );
}
