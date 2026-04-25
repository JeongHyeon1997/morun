import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '@morun/tokens';
import { SEOUL_DISTRICTS, SEOUL_VIEWBOX, type SeoulDistrictId } from '@morun/shared';

interface SeoulRegionMapProps {
  /** Map of districtId → fill color. Missing entries get the default fill. */
  fills?: Partial<Record<SeoulDistrictId, string>>;
  selectedId?: SeoulDistrictId;
  onSelect?: (id: SeoulDistrictId) => void;
  defaultFill?: string;
  height?: number;
}

export function SeoulRegionMap({
  fills,
  selectedId,
  onSelect,
  defaultFill = colors.surfaceAlt,
  height = 260,
}: SeoulRegionMapProps) {
  const paths = useMemo(
    () =>
      SEOUL_DISTRICTS.map((d) => ({
        ...d,
        fill: fills?.[d.id] ?? defaultFill,
        active: selectedId === d.id,
      })),
    [fills, selectedId, defaultFill],
  );

  return (
    <View style={[styles.wrap, { height }]} collapsable={false}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SEOUL_VIEWBOX.width} ${SEOUL_VIEWBOX.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <G>
          {paths.map((p) => (
            <Path
              key={p.id}
              d={p.d}
              fill={p.fill}
              stroke={p.active ? colors.primary : colors.background}
              strokeWidth={p.active ? 6 : 2}
              onPress={onSelect ? () => onSelect(p.id) : undefined}
            />
          ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: colors.background,
  },
});
