import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@morun/tokens';
import type { SeoulDistrictId } from '@morun/shared';
import { RegionRankRow } from '../molecules';
import { heatColor } from '../../lib/heatScale';

export interface RegionStat {
  id: SeoulDistrictId;
  label: string;
  count: number;
  delta?: number;
}

interface RegionRankingProps {
  stats: readonly RegionStat[];
  selectedId?: SeoulDistrictId;
  onSelect?: (id: SeoulDistrictId) => void;
  limit?: number;
}

export function RegionRanking({ stats, selectedId, onSelect, limit = 5 }: RegionRankingProps) {
  const top = [...stats].sort((a, b) => b.count - a.count).slice(0, limit);

  return (
    <View style={styles.box}>
      {top.map((s, i) => (
        <RegionRankRow
          key={s.id}
          rank={i + 1}
          label={s.label}
          count={s.count}
          delta={s.delta}
          swatch={heatColor(s.count)}
          selected={selectedId === s.id}
          onPress={onSelect ? () => onSelect(s.id) : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: spacing[5],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingVertical: spacing[2],
  },
});
