import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@morun/tokens';
import { RankingRow } from '../molecules';

export interface RankedCrew {
  id: string;
  name: string;
  color: string;
  distanceKm: number;
  score: number;
}

interface CrewRankingProps {
  crews: readonly RankedCrew[];
}

export function CrewRanking({ crews }: CrewRankingProps) {
  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        <Text style={styles.headerLeft}>크루명</Text>
        <Text style={styles.headerDistance}>거리</Text>
        <Text style={styles.headerScore}>점수</Text>
      </View>
      {crews.map((c, i) => (
        <RankingRow
          key={c.id}
          rank={i + 1}
          name={c.name}
          color={c.color}
          distanceKm={c.distanceKm}
          score={c.score}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: spacing[5],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerLeft: {
    flex: 1,
    paddingLeft: 28 + spacing[2] + 10 + spacing[2], // align with the name column below (badge + dot widths)
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  headerDistance: {
    width: 84,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  headerScore: {
    width: 36,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
