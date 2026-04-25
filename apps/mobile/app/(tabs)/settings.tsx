import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@morun/tokens';
import { useAuthStore } from '@/lib/auth/store';

export default function Settings() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearSession = useAuthStore((s) => s.clearSession);

  const handleLogout = () => {
    clearSession();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>설정</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {isAuthenticated && user && (
          <>
            <SectionTitle>프로필</SectionTitle>
            <Row
              label={user.nickname}
              trailing={<Text style={styles.trailingMuted}>{user.email}</Text>}
            />
          </>
        )}

        <SectionTitle>정보</SectionTitle>
        <Row label="공지사항" />
        <Row label="이용약관" />
        <Row label="개인정보 처리방침" />

        <SectionTitle>계정</SectionTitle>
        {isAuthenticated ? (
          <>
            <Row label="로그아웃" onPress={handleLogout} />
            <Row label="탈퇴하기" destructive />
          </>
        ) : (
          <Row label="로그인" onPress={() => router.push('/(auth)/login')} />
        )}

        <SectionTitle>앱 정보</SectionTitle>
        <Row
          label="버전"
          trailing={<Text style={styles.trailingMuted}>0.1.0</Text>}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

interface RowProps {
  label: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
  destructive?: boolean;
}

function Row({ label, onPress, trailing, destructive }: RowProps) {
  const content = (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, destructive && styles.rowLabelDestructive]}>
        {label}
      </Text>
      {trailing}
    </View>
  );
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.borderSoft }}
        style={({ pressed }) => (pressed ? styles.rowPressed : null)}
      >
        {content}
      </Pressable>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  scroll: { paddingBottom: spacing[10] },

  sectionTitle: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6],
    paddingBottom: spacing[2],
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowPressed: { backgroundColor: colors.surfaceAlt },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  rowLabelDestructive: { color: '#D26A6A' },

  trailingMuted: { fontSize: 13, color: colors.textMuted },
});
