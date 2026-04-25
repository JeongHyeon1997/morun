import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '@morun/tokens';

const BAR_HEIGHT = 64;
const NOTCH_RADIUS = 30;
// Visual offset: how far the center tab's icon area shifts up so it visually sits in the notch.
const CENTER_TAB_RAISE = 6;

function notchPath(width: number, height: number) {
  const cx = width / 2;
  return [
    `M 0 0`,
    `L ${cx - NOTCH_RADIUS} 0`,
    // Sweep flag 1 = clockwise in screen space (y-down) → curve dips DOWN into the bar.
    `A ${NOTCH_RADIUS} ${NOTCH_RADIUS} 0 0 1 ${cx + NOTCH_RADIUS} 0`,
    `L ${width} 0`,
    `L ${width} ${height}`,
    `L 0 ${height}`,
    `Z`,
  ].join(' ');
}

export function NotchedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const totalHeight = BAR_HEIGHT + insets.bottom;

  return (
    <View style={[styles.container, { height: totalHeight }]}>
      <Svg
        width={width}
        height={BAR_HEIGHT}
        style={styles.bgSvg}
        pointerEvents="none"
      >
        <Path
          d={notchPath(width, BAR_HEIGHT)}
          fill={colors.background}
          stroke={colors.divider}
          strokeWidth={1}
        />
      </Svg>

      <View style={[styles.tabsRow, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isCenter = index === Math.floor(state.routes.length / 2);

          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const tintColor = isFocused ? colors.primary : colors.textMuted;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              style={[
                styles.tabButton,
                isCenter ? { transform: [{ translateY: -CENTER_TAB_RAISE }] } : null,
              ]}
            >
              {options.tabBarIcon
                ? options.tabBarIcon({ focused: isFocused, color: tintColor, size: 24 })
                : null}
              <Text style={[styles.label, { color: tintColor }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  bgSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tabsRow: {
    flexDirection: 'row',
    height: BAR_HEIGHT,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
