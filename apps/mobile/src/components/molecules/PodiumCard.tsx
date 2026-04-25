import { StyleSheet, Text, View } from 'react-native';
import { CrownBadge } from '../atoms';

const FRAME: Record<1 | 2 | 3, string> = {
  1: '#5C77BF', // dark blue (1위)
  2: '#52A186', // teal (2위)
  3: '#9079C4', // purple (3위)
};

const HEIGHT: Record<1 | 2 | 3, number> = {
  1: 156,
  2: 132,
  3: 132,
};

const WIDTH: Record<1 | 2 | 3, number> = {
  1: 112,
  2: 100,
  3: 100,
};

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  crewName: string;
}

export function PodiumCard({ rank, crewName }: PodiumCardProps) {
  const frame = FRAME[rank];
  return (
    <View style={[styles.wrap, { width: WIDTH[rank] }]}>
      <View style={styles.crownAnchor}>
        <CrownBadge rank={rank} size={rank === 1 ? 40 : 34} />
      </View>
      <View
        style={[
          styles.card,
          {
            height: HEIGHT[rank],
            borderColor: frame,
          },
        ]}
      >
        {/* TODO(image): replace with crew cover photo */}
        <View style={styles.photo} />
        <View style={[styles.nameStrip, { backgroundColor: frame }]}>
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
  },
  crownAnchor: {
    zIndex: 2,
    marginBottom: -18, // pull the card up so the crown sits half above the card
  },
  card: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  photo: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  nameStrip: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
