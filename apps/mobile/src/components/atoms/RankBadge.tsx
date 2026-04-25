import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@morun/tokens';

const MEDAL_COLORS: Record<1 | 2 | 3, { bg: string; ring: string }> = {
  1: { bg: '#F4B739', ring: '#E0A018' }, // gold
  2: { bg: '#B6BCC4', ring: '#9099A2' }, // silver
  3: { bg: '#C98456', ring: '#A86A3D' }, // bronze
};

interface RankBadgeProps {
  rank: number;
  size?: number;
}

export function RankBadge({ rank, size = 28 }: RankBadgeProps) {
  const isMedal = rank >= 1 && rank <= 3;
  if (isMedal) {
    const palette = MEDAL_COLORS[rank as 1 | 2 | 3];
    return (
      <View
        style={[
          styles.medal,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: palette.bg,
            borderColor: palette.ring,
          },
        ]}
      >
        <Text style={[styles.medalText, { fontSize: size * 0.5 }]}>{rank}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.plain, { width: size, height: size }]}>
      <Text style={styles.plainText}>{rank}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  medal: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  medalText: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  plain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plainText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});
