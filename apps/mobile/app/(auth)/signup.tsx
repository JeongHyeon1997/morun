import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@morun/tokens';

/**
 * 회원가입 — 디자인 구현 placeholder.
 * 필드: 프로필 이미지, 닉네임, 비밀번호, 비밀번호 재입력, 이름, 이메일, 휴대폰 인증, 크루 찾기.
 */
export default function SignUp() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()} hitSlop={16}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>회원가입</Text>
        <View style={{ width: 32 }} />
      </View>
      <View style={styles.body}>
        <Text style={{ color: colors.textMuted }}>회원가입 화면 — 구현 예정</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 48,
  },
  backArrow: { fontSize: 24, color: colors.textPrimary, width: 32 },
  topTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  body: { flex: 1, padding: 24 },
});
