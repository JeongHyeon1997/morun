import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUpSchema } from '@morun/shared';
import { colors, spacing } from '@morun/tokens';
import { useAuthStore } from '@/lib/auth/store';

type NicknameStatus = 'idle' | 'checking' | 'available';

export default function SignUp() {
  const setSession = useAuthStore((s) => s.setSession);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [nickStatus, setNickStatus] = useState<NicknameStatus>('idle');
  const [submitting, setSubmitting] = useState(false);

  const parsed = signUpSchema.safeParse({ nickname, email, password });
  const canSubmit = parsed.success && nickStatus === 'available' && !submitting;

  const onNicknameChange = (v: string) => {
    setNickname(v);
    if (nickStatus !== 'idle') setNickStatus('idle');
  };

  const handleNicknameCheck = async () => {
    if (nickname.trim().length < 2) return;
    setNickStatus('checking');
    // TODO(api): GET /users/nickname-available?nickname=...
    await new Promise((r) => setTimeout(r, 300));
    setNickStatus('available');
  };

  const onSubmit = () => {
    if (!canSubmit || !parsed.success) return;
    setSubmitting(true);
    // TODO(auth): replace with real /auth/signup call.
    setSession(
      {
        id: `local-${parsed.data.nickname}`,
        nickname: parsed.data.nickname,
        email: parsed.data.email,
        name: parsed.data.nickname,
        avatarUrl: null,
      },
      'dev-token',
    );
    router.replace('/(tabs)/seoul');
  };

  const checkLabel =
    nickStatus === 'available' ? '사용 가능' : '중복 확인하기';
  const checkActive = nickname.trim().length >= 2 && nickStatus !== 'checking';

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
          <Text style={styles.topTitle}>회원가입</Text>
          <View style={styles.iconSlot} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputs}>
            <View style={styles.row}>
              <View style={styles.inputRowFlex}>
                <TextInput
                  value={nickname}
                  onChangeText={onNicknameChange}
                  placeholder="닉네임 입력"
                  placeholderTextColor={colors.inputPlaceholder}
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
              <Pressable
                onPress={handleNicknameCheck}
                disabled={!checkActive}
                style={[
                  styles.checkBtn,
                  nickStatus === 'available'
                    ? styles.checkBtnActive
                    : styles.checkBtnIdle,
                  !checkActive && styles.checkBtnDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.checkBtnText,
                    nickStatus === 'available'
                      ? styles.checkBtnTextActive
                      : styles.checkBtnTextIdle,
                  ]}
                >
                  {checkLabel}
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="이메일 입력"
                placeholderTextColor={colors.inputPlaceholder}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호 (8자 이상)"
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
                style={styles.eyeBtn}
                accessibilityRole="button"
                accessibilityLabel={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
              >
                <Text style={styles.eye}>{showPw ? '🙈' : '👁'}</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.policy}>
            가입하면 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다
          </Text>
        </ScrollView>

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
          <Text style={styles.ctaText}>{submitting ? '가입 중…' : '가입하기'}</Text>
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

  scroll: {
    paddingHorizontal: spacing[7],
    paddingTop: spacing[10],
    paddingBottom: spacing[6],
    flexGrow: 1,
  },

  inputs: { gap: spacing[5] },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[3],
  },
  inputRowFlex: { flex: 1 },
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
    height: 60,
  },
  eyeBtn: { paddingHorizontal: spacing[1] },
  eye: { fontSize: 16 },

  checkBtn: {
    height: 50,
    paddingHorizontal: spacing[5],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBtnIdle: { backgroundColor: colors.tabBarDark },
  checkBtnActive: { backgroundColor: colors.success },
  checkBtnDisabled: { opacity: 0.5 },
  checkBtnText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.28,
  },
  checkBtnTextIdle: { color: colors.background },
  checkBtnTextActive: { color: colors.background },

  policy: {
    marginTop: spacing[6],
    textAlign: 'center',
    fontSize: 12,
    color: colors.inputPlaceholder,
    lineHeight: 18,
    paddingHorizontal: spacing[4],
  },

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
