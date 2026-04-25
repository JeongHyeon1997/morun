import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@morun/tokens';
import { Chip } from '../atoms';

interface CrewCardProps {
  name: string;
  region: string;
  members: number;
  pace: string;
  onPress?: () => void;
}

export function CrewCard({ name, region, members, pace, onPress }: CrewCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cover} />
      <View style={styles.body}>
        <View style={styles.tags}>
          <Chip label={region} />
          <Chip label={pace} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.meta}>멤버 {members.toLocaleString()}명</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cover: {
    height: 110,
    backgroundColor: colors.surfaceAlt,
  },
  body: {
    padding: spacing[3],
    gap: spacing[2],
  },
  tags: { flexDirection: 'row', gap: spacing[1], flexWrap: 'wrap' },
  name: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, letterSpacing: -0.2 },
  meta: { fontSize: 12, color: colors.textMuted },
});
