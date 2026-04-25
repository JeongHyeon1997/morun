import Svg, { Path } from 'react-native-svg';
import { SEOUL_DISTRICTS, SEOUL_VIEWBOX } from '@morun/shared';

interface SeoulShapeProps {
  size?: number;
  color?: string;
}

/**
 * Compact Seoul silhouette — used for the center bottom-tab icon.
 * Renders all 25 자치구 paths in the same fill so they read as one shape.
 */
export function SeoulShape({ size = 28, color = '#1E2338' }: SeoulShapeProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${SEOUL_VIEWBOX.width} ${SEOUL_VIEWBOX.height}`}
    >
      {SEOUL_DISTRICTS.map((d) => (
        <Path key={d.id} d={d.d} fill={color} stroke={color} strokeWidth={2} />
      ))}
    </Svg>
  );
}
