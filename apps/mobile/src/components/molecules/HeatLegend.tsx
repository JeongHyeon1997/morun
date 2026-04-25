import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@morun/tokens';

interface HeatLegendProps {
  steps: readonly { color: string; label: string }[];
}

export function HeatLegend({ steps }: HeatLegendProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.caption}>활동량</Text>
      <View style={styles.steps}>
        {steps.map((s) => (
          <View key={s.label} style={styles.step}>
            <View style={[styles.swatch, { backgroundColor: s.color }]} />
            <Text style={styles.label}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[5],
  },
  caption: { fontSize: 12, color: colors.textMuted, marginRight: spacing[1] },
  steps: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], flexWrap: 'wrap' },
  step: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 10, height: 10, borderRadius: radius.sm },
  label: { fontSize: 11, color: colors.textSecondary, fontWeight: '600' },
});
