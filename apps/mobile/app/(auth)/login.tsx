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
import { colors } from '@morun/tokens';

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top bar */}
        <View style={styles.topbar}>
          <Pressable onPress={() => router.back()} hitSlop={16} style={styles.back}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <Text style={styles.topTitle}>로그인</Text>
          <View style={styles.back} />
        </View>

        <View style={styles.body}>
          <Text style={styles.welcome}>
            <Text style={{ fontWeight: '800' }}>MO:RUN</Text>에 오신걸{'\n'}환영합니다 :D
          </Text>

          <View style={styles.inputs}>
            <View style={styles.inputWrap}>
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="닉네임 입력"
                placeholderTextColor={colors.inputPlaceholder}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호 입력"
                placeholderTextColor={colors.inputPlaceholder}
                secureTextEntry={!showPw}
                style={styles.input}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={12}>
                <Text style={styles.eye}>{showPw ? '🙈' : '👁'}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.links}>
            <Text style={styles.link}>아이디 찾기</Text>
            <Text style={styles.linkDivider}>|</Text>
            <Text style={styles.link}>비밀번호 찾기</Text>
            <Text style={styles.linkDivider}>|</Text>
            <Pressable onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.link}>회원가입</Text>
            </Pressable>
          </View>

          <View style={{ flex: 1 }} />

          <Text style={styles.policy}>개인정보처리방침</Text>
        </View>

        <Pressable style={styles.cta} onPress={() => router.replace('/(tabs)/main')}>
          <Text style={styles.ctaText}>로그인하기</Text>
        </Pressable>
      </KeyboardAvoidingView>
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
  back: { width: 32, alignItems: 'flex-start' },
  backArrow: { fontSize: 24, color: colors.textPrimary },
  topTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  body: { flex: 1, paddingHorizontal: 24 },
  welcome: {
    marginTop: 48,
    fontSize: 22,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
  },
  inputs: { marginTop: 80, gap: 32 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.inputUnderline,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 8,
  },
  eye: { fontSize: 18, color: colors.textMuted, paddingHorizontal: 4 },
  links: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  link: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  linkDivider: { color: colors.border },
  policy: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.textSecondary,
    paddingBottom: 8,
  },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    alignItems: 'center',
  },
  ctaText: {
    color: colors.textOnPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
});
