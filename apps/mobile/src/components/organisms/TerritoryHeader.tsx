import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@morun/tokens';

interface TerritoryHeaderProps {
  region: string;
  caption: string;
}

export function TerritoryHeader({ region, caption }: TerritoryHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.region}>{region}</Text>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing[2],
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
  },
  region: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  caption: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
