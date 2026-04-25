import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '@morun/tokens';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  textActive: { color: colors.textOnPrimary },
  textInactive: { color: colors.textSecondary },
});
