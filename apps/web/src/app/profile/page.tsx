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
      <ScrollableScreen
        header={
          <AppHeader
            title="내정보"
            backHref="/"
            titleIcon={<IconRunner size={20} color="#3C3C3C" />}
          />
        }
        footer={<NotchedTabBar />}
      >
        <ProfileHeader profile={PROFILE} />
        <ProfilePhotoGrid photos={PHOTOS} />
      </ScrollableScreen>
    </LandingFrame>
  );
}
