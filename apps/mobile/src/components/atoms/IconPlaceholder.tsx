import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, radius } from '@morun/tokens';

interface IconPlaceholderProps {
  label?: string;
  size?: number;
  variant?: 'square' | 'circle';
  tone?: 'neutral' | 'primary' | 'muted';
  style?: ViewStyle;
}

export function IconPlaceholder({
  label,
  size = 24,
  variant = 'square',
  tone = 'neutral',
  style,
}: IconPlaceholderProps) {
  const palette = TONES[tone];
  return (
    <View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderRadius: variant === 'circle' ? size / 2 : radius.sm,
          backgroundColor: palette.bg,
          borderColor: palette.border,
        },
        style,
      ]}
    >
      {label ? (
        <Text style={[styles.label, { color: palette.fg, fontSize: Math.max(8, size * 0.34) }]}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const TONES = {
  neutral: { bg: colors.surfaceAlt, border: colors.border, fg: colors.textSecondary },
  primary: { bg: colors.primary, border: colors.primary, fg: colors.textOnPrimary },
  muted: { bg: colors.surface, border: colors.divider, fg: colors.textMuted },
} as const;

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: {
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
