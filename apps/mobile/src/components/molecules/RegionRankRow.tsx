import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@morun/tokens';

interface RegionRankRowProps {
  rank: number;
  label: string;
  count: number;
  delta?: number;
  swatch: string;
  selected?: boolean;
  onPress?: () => void;
}

export function RegionRankRow({
  rank,
  label,
  count,
  delta,
  swatch,
  selected,
  onPress,
}: RegionRankRowProps) {
  return (
    <Pressable onPress={onPress} style={[styles.row, selected && styles.rowSelected]}>
      <Text style={styles.rank}>{rank}</Text>
      <View style={[styles.swatch, { backgroundColor: swatch }]} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.count}>{count.toLocaleString()}</Text>
      {typeof delta === 'number' && delta !== 0 ? (
        <Text style={[styles.delta, delta > 0 ? styles.deltaUp : styles.deltaDown]}>
          {delta > 0 ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`}
        </Text>
      ) : (
        <Text style={[styles.delta, styles.deltaFlat]}>—</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
    gap: spacing[3],
  },
  rowSelected: {
    backgroundColor: colors.surfaceAlt,
  },
  rank: {
    width: 22,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  delta: {
    width: 56,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
  },
  deltaUp: { color: colors.danger },
  deltaDown: { color: colors.info },
  deltaFlat: { color: colors.textMuted },
});
