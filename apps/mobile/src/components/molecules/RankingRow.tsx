import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@morun/tokens';
import { CrewDot, RankBadge } from '../atoms';

interface RankingRowProps {
  rank: number;
  name: string;
  color: string;
  distanceKm: number;
  score: number;
}

export function RankingRow({ rank, name, color, distanceKm, score }: RankingRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.badgeCol}>
        <RankBadge rank={rank} size={22} />
      </View>
      <CrewDot color={color} size={10} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.distance}>{distanceKm.toLocaleString(undefined, { minimumFractionDigits: 1 })}km</Text>
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
  badgeCol: {
    width: 28,
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
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
