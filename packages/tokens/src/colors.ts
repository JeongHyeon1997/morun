/**
 * MO:RUN 디자인 토큰 - 컬러
 * 피그마 캡쳐본 기반 초안. 정확한 값은 피그마에서 확인 후 업데이트 필요.
 */
export const colors = {
  // Brand
  primary: '#1E2338',
  primaryPressed: '#14182A',

  // Surface
  background: '#FFFFFF',
  surface: '#FAFAFA',
  surfaceAlt: '#F5F5F5',

  // Text
  textPrimary: '#111111',
  textSecondary: '#555555',
  textMuted: '#999999',
  textDisabled: '#C4C4C4',
  textOnPrimary: '#FFFFFF',

  // Border / divider
  border: '#E5E5E5',
  borderStrong: '#D4D4D4',
  divider: '#EEEEEE',

  // States
  danger: '#E53935',
  success: '#2E7D32',
  warning: '#F57C00',
  info: '#1976D2',

  // Input
  inputUnderline: '#E0E0E0',
  inputUnderlineFocus: '#1E2338',
  inputPlaceholder: '#B0B0B0',
} as const;

export type ColorToken = keyof typeof colors;
