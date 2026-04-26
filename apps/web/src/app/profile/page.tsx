import {
  AppHeader,
  NotchedTabBar,
  ProfileHeader,
  ProfilePhotoGrid,
  type ProfileHeaderData,
  type ProfilePhoto,
} from '@/components/organisms';
import { IconRunner } from '@/components/atoms';
import { LandingFrame } from '@/components/templates';

const PROFILE: ProfileHeaderData = {
  username: 'kyuria_0123',
  bio: '소개란?',
  tags: ['여성', '20', '러닝', '관심사1', '관심사2'],
};

const PHOTOS: readonly ProfilePhoto[] = [
  { id: 'p1' },
  { id: 'p2' },
  { id: 'p3' },
  { id: 'p4' },
  { id: 'p5' },
];

export default function ProfilePage() {
  return (
    <LandingFrame>
      <div className="flex flex-1 flex-col">
        <AppHeader
          title="내정보"
          backHref="/"
          titleIcon={<IconRunner size={20} color="#3C3C3C" />}
        />

        <ProfileHeader profile={PROFILE} />

        <ProfilePhotoGrid photos={PHOTOS} />

        <div className="mt-auto">
          <NotchedTabBar />
        </div>
      </div>
    </LandingFrame>
  );
}
