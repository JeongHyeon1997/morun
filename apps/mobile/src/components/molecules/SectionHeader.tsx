import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@morun/tokens';

interface SectionHeaderProps {
  title: string;
  caption?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function SectionHeader({ title, caption, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable hitSlop={8} onPress={onActionPress}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing[5],
    marginBottom: spacing[3],
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, letterSpacing: -0.3 },
  caption: { marginTop: 4, fontSize: 13, color: colors.textMuted },
  action: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
});
