import { StyleSheet, View, type ViewStyle } from 'react-native';

interface CrewDotProps {
  color: string;
  size?: number;
  style?: ViewStyle;
}

export function CrewDot({ color, size = 10, style }: CrewDotProps) {
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    flexShrink: 0,
  },
});
