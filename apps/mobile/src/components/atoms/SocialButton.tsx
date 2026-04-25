import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Note: brand marks here are simplified silhouettes for prototype/UI purposes.
// Replace with each provider's official asset before shipping public OAuth.

export type SocialProvider = 'google' | 'apple' | 'kakao' | 'naver';

const META: Record<
  SocialProvider,
  { bg: string; label: string; bordered?: boolean }
> = {
  google: { bg: '#FFFFFF', label: 'Google로 계속하기', bordered: true },
  apple: { bg: '#000000', label: 'Apple로 계속하기' },
  kakao: { bg: '#FEE500', label: '카카오로 계속하기' },
  naver: { bg: '#03C75A', label: '네이버로 계속하기' },
};

interface Props {
  provider: SocialProvider;
  onPress?: () => void;
  disabled?: boolean;
}

export function SocialButton({ provider, onPress, disabled }: Props) {
  const { bg, label, bordered } = META[provider];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg },
        bordered && styles.bordered,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View pointerEvents="none">
        <SocialMark provider={provider} />
      </View>
    </Pressable>
  );
}

function SocialMark({ provider }: { provider: SocialProvider }) {
  switch (provider) {
    case 'google':
      return (
        <Svg width={24} height={24} viewBox="0 0 48 48">
          <Path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <Path
            fill="#FF3D00"
            d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <Path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <Path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </Svg>
      );
    case 'apple':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            fill="#FFFFFF"
            d="M17.564 18.18c-.5.745-1.014 1.484-1.834 1.5-.81.012-1.07-.498-1.99-.498-.92 0-1.21.483-1.97.51-.78.024-1.38-.81-1.88-1.55-1.03-1.51-1.81-4.27-.76-6.13.52-.93 1.45-1.51 2.46-1.52.78-.01 1.51.55 1.99.55.48 0 1.37-.68 2.31-.58.39.02 1.49.16 2.2 1.21-.06.04-1.31.78-1.29 2.32.02 1.84 1.6 2.45 1.62 2.46-.01.04-.25.88-.83 1.73zM13 4.7c.45-.55 1.21-.97 1.84-.99.08.74-.21 1.49-.65 2.04-.43.55-1.13.97-1.83.92-.09-.74.27-1.5.64-1.97z"
          />
        </Svg>
      );
    case 'kakao':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            fill="#191919"
            d="M12 3C6.48 3 2 6.61 2 11.06c0 2.79 1.85 5.24 4.6 6.62-.18.7-.65 2.55-.74 2.95-.11.5.18.49.39.36.16-.11 2.51-1.71 3.52-2.4.7.1 1.43.16 2.23.16 5.52 0 10-3.61 10-8.06S17.52 3 12 3z"
          />
        </Svg>
      );
    case 'naver':
      return (
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Path
            fill="#FFFFFF"
            d="M14.85 12.43L9.32 4H4.7v16h4.45V11.57L14.68 20h4.62V4h-4.45v8.43z"
          />
        </Svg>
      );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordered: { borderWidth: 1, borderColor: '#E5E5E5' },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
});
