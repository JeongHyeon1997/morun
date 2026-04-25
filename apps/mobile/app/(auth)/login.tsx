import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@morun/tokens';
import { useAuthStore } from '@/lib/auth/store';

export default function Login() {
  const setSession = useAuthStore((s) => s.setSession);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    nickname.trim().length >= 2 && password.length >= 1 && !submitting;

  const onSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    // TODO(auth): replace with real /auth/login call (axios + signInSchema).
    // For now, populate the auth store with the entered identity so the rest
    // of the app can consume session state during UI development.
    const trimmed = nickname.trim();
    setSession(
      {
        id: `local-${trimmed}`,
        nickname: trimmed,
        email: `${trimmed}@morun.local`,
        name: trimmed,
        avatarUrl: null,
      },
      'dev-token',
    );
    router.replace('/(tabs)/seoul');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topbar}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={16}
            style={styles.iconSlot}
            accessibilityRole="button"
            accessibilityLabel="뒤로 가기"
          >
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>로그인</Text>
          <View style={styles.iconSlot} />
        </View>

        <View style={styles.body}>
          <Text style={styles.welcome}>
            <Text style={styles.welcomeStrong}>MO:RUN</Text>
            <Text>{'에 오신걸\n환영합니다 '}</Text>
            <Text style={styles.welcomeStrong}>:D</Text>
          </Text>

          <View style={styles.inputs}>
            <View style={styles.inputRow}>
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="닉네임 입력"
                placeholderTextColor={colors.inputPlaceholder}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호 입력"
                placeholderTextColor={colors.inputPlaceholder}
                secureTextEntry={!showPw}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
              />
              <Pressable
                onPress={() => setShowPw((v) => !v)}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
                style={styles.eyeBtn}
              >
                <Text style={styles.eye}>{showPw ? '🙈' : '👁'}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.links}>
            <Pressable hitSlop={8}>
              <Text style={styles.link}>아이디 찾기</Text>
            </Pressable>
            <View style={styles.linkDivider} />
            <Pressable hitSlop={8}>
              <Text style={styles.link}>비밀번호 찾기</Text>
            </Pressable>
            <View style={styles.linkDivider} />
            <Pressable hitSlop={8} onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.link}>회원가입</Text>
            </Pressable>
          </View>

          <View style={styles.spacer} />

          <Pressable hitSlop={8} style={styles.policyBtn}>
            <Text style={styles.policy}>개인정보처리방침</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={onSubmit}
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.cta,
            pressed && styles.ctaPressed,
            !canSubmit && styles.ctaDisabled,
          ]}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSubmit }}
        >
          <Text style={styles.ctaText}>로그인하기</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  fill: { flex: 1 },

  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    height: 56,
  },
  iconSlot: { width: 24, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 28, lineHeight: 28, color: colors.ink },
  topTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.ink,
    letterSpacing: -0.4,
  },

  body: { flex: 1, paddingHorizontal: spacing[7] },

  welcome: {
    marginTop: spacing[10],
    fontSize: 24,
    fontWeight: '400',
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.48,
  },
  welcomeStrong: { fontWeight: '600', color: colors.tabBarDark },

  inputs: { marginTop: spacing[10], gap: spacing[5] },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.tabBarDark,
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.36,
    paddingVertical: 0,
  },
  eyeBtn: { paddingHorizontal: spacing[1] },
  eye: { fontSize: 16 },

  links: {
    marginTop: spacing[6],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
  link: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.ink,
    letterSpacing: -0.28,
  },
  linkDivider: {
    width: 1,
    height: 10,
    backgroundColor: colors.inputPlaceholder,
  },

  spacer: { flex: 1 },

  policyBtn: { alignSelf: 'center', paddingVertical: spacing[2] },
  policy: { fontSize: 12, color: colors.ink },

  cta: {
    backgroundColor: colors.tabBarDark,
    height: 81,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: { opacity: 0.85 },
  ctaDisabled: { opacity: 0.6 },
  ctaText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.36,
  },
});
