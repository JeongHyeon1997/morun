import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@morun/tokens';
import { IconPlaceholder } from '../atoms';

interface HomeHeaderProps {
  region: string;
  onRegionPress?: () => void;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
}

export function HomeHeader({
  region,
  onRegionPress,
  onSearchPress,
  onNotificationsPress,
}: HomeHeaderProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.region} onPress={onRegionPress} hitSlop={8}>
        <Text style={styles.regionLabel}>{region}</Text>
        <Text style={styles.regionChevron}>▾</Text>
      </Pressable>
      <View style={styles.actions}>
        {/* TODO(icons): replace with provided search icon */}
        <Pressable hitSlop={8} onPress={onSearchPress}>
          <IconPlaceholder size={28} label="검색" tone="muted" />
        </Pressable>
        {/* TODO(icons): replace with provided bell icon */}
        <Pressable hitSlop={8} onPress={onNotificationsPress}>
          <IconPlaceholder size={28} label="알림" tone="muted" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    backgroundColor: colors.background,
  },
  region: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  regionLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  regionChevron: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
});
