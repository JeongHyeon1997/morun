import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PALETTE: Record<1 | 2 | 3, { fill: string; stroke: string }> = {
  1: { fill: '#F4B939', stroke: '#D49417' },
  2: { fill: '#B6BCC4', stroke: '#8C949C' },
  3: { fill: '#C98456', stroke: '#9E6238' },
};

// Crown peaks (3) + circular medallion as one continuous outline.
// viewBox: 36 wide, 40 tall. Circle base sits at y=8, radius 14, center (18, 22).
const CROWN_PATH =
  'M 4 8 L 8 0 L 12 6 L 18 0 L 24 6 L 28 0 L 32 8 A 14 14 0 1 1 4 8 Z';

interface CrownBadgeProps {
  rank: 1 | 2 | 3;
  size?: number;
}

export function CrownBadge({ rank, size = 36 }: CrownBadgeProps) {
  const palette = PALETTE[rank];
  // Aspect ratio of the path is 36:40
  const w = size;
  const h = (size * 40) / 36;
  // Number sits in the center of the circle portion (centered at y=22 in a 40-tall canvas).
  const numTop = h * (22 / 40) - h * 0.16;

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 36 40">
        <Path
          d={CROWN_PATH}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </Svg>
      <View style={[styles.numWrap, { top: numTop, height: h * 0.32, width: w }]}>
        <Text style={[styles.num, { fontSize: size * 0.36 }]}>{rank}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
