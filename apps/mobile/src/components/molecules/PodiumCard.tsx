import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@morun/tokens';
import { RankBadge } from '../atoms';

const FRAME_COLOR: Record<1 | 2 | 3, string> = {
  1: '#7C5CFF', // 1위: 보라
  2: '#3F8F6E', // 2위: 청록 그린
  3: '#9F6A2E', // 3위: 브론즈
};

const HEIGHT: Record<1 | 2 | 3, number> = {
  1: 196,
  2: 168,
  3: 168,
};

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  crewName: string;
  crewColor?: string;
}

export function PodiumCard({ rank, crewName, crewColor }: PodiumCardProps) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.badgeOffset, { zIndex: 2 }]}>
        <RankBadge rank={rank} size={36} />
      </View>
      <View
        style={[
          styles.card,
          {
            height: HEIGHT[rank],
            borderColor: FRAME_COLOR[rank],
          },
        ]}
      >
        {/* TODO(image): replace with crew cover photo */}
        <View style={[styles.cover, crewColor ? { backgroundColor: crewColor + '22' } : null]} />
        <View style={styles.nameStrip}>
          <Text numberOfLines={1} style={styles.name}>
            {crewName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    width: 104,
  },
  badgeOffset: {
    marginBottom: -18,
  },
  card: {
    width: '100%',
    borderRadius: radius.md,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  cover: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
  },
  nameStrip: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
