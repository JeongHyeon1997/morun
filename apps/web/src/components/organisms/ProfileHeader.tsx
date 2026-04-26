import { IconRunner, Pill } from '../atoms';

export interface ProfileHeaderData {
  username: string;
  bio?: string;
  tags: readonly string[];
  avatarUrl?: string | null;
}

interface ProfileHeaderProps {
  profile: ProfileHeaderData;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-4 px-5 pb-4 pt-6">
      <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full bg-surface-alt">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <IconRunner size={56} color="#B3B3B3" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-1">
        <h2 className="truncate text-xl font-bold text-text-primary">
          {profile.username}
        </h2>
        <p className="text-xs text-text-secondary">{profile.bio ?? '소개란?'}</p>
        {profile.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {profile.tags.map((tag) => (
              <Pill key={tag} tone="muted" size="md">
                {tag}
              </Pill>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
