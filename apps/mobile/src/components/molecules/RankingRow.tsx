import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { colors, spacing } from '@morun/tokens';
import { CrewDot } from '../atoms';

const RANK_IMAGE: Record<1 | 2 | 3, ImageSourcePropType> = {
  1: require('../../../../../packages/shared/src/assets/rank-1.png'),
  2: require('../../../../../packages/shared/src/assets/rank-2.png'),
  3: require('../../../../../packages/shared/src/assets/rank-3.png'),
};

interface RankingRowProps {
  rank: number;
  name: string;
  color: string;
  distanceKm: number;
  score: number;
}

export function RankingRow({ rank, name, color, distanceKm, score }: RankingRowProps) {
  const isMedal = rank >= 1 && rank <= 3;
  return (
    <View style={styles.row}>
      <View style={styles.rankCol}>
        {isMedal ? (
          <Image
            source={RANK_IMAGE[rank as 1 | 2 | 3]}
            style={styles.medal}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.rankText}>{rank}</Text>
        )}
      </View>
      <CrewDot color={color} size={10} />
      <Text style={[styles.name, { color }]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.distance}>
        {distanceKm.toLocaleString(undefined, { minimumFractionDigits: 1 })}km
      </Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[2],
  },
  rankCol: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  medal: {
    width: 22,
    height: 24,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  distance: {
    width: 84,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  score: {
    width: 36,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
});
