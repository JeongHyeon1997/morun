import {
  AppHeader,
  NotchedTabBar,
  ProfileHeader,
  ProfilePhotoGrid,
  type ProfileHeaderData,
  type ProfilePhoto,
} from '@/components/organisms';
import { IconRunner } from '@/components/atoms';
import { LandingFrame, ScrollableScreen } from '@/components/templates';

interface ProfileByUsernameProps {
  params: Promise<{ username: string }>;
}

const PHOTOS: readonly ProfilePhoto[] = [
  { id: 'p1' },
  { id: 'p2' },
  { id: 'p3' },
  { id: 'p4' },
  { id: 'p5' },
];

export default async function ProfileByUsername({ params }: ProfileByUsernameProps) {
  const { username } = await params;

  // Backend isn't wired yet — same mock body, different name from the URL.
  const profile: ProfileHeaderData = {
    username,
    bio: '소개란?',
    tags: ['여성', '20', '러닝', '관심사1', '관심사2'],
  };

  return (
    <LandingFrame>
      <ScrollableScreen
        header={
          <AppHeader
            title={username}
            backHref="/crew"
            titleIcon={<IconRunner size={20} color="#3C3C3C" />}
          />
        }
        footer={<NotchedTabBar />}
      >
        <ProfileHeader profile={profile} />
        <ProfilePhotoGrid photos={PHOTOS} />
      </ScrollableScreen>
    </LandingFrame>
  );
}
