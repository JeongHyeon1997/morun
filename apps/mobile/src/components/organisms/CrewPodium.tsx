import { StyleSheet, View } from 'react-native';
import { spacing } from '@morun/tokens';
import { PodiumCard } from '../molecules';

export interface PodiumCrew {
  id: string;
  name: string;
  color: string;
}

interface CrewPodiumProps {
  /** [first, second, third] in finishing order. */
  top3: readonly [PodiumCrew, PodiumCrew, PodiumCrew];
}

export function CrewPodium({ top3 }: CrewPodiumProps) {
  const [first, second, third] = top3;
  return (
    <View style={styles.row}>
      <PodiumCard rank={2} crewName={second.name} />
      <PodiumCard rank={1} crewName={first.name} />
      <PodiumCard rank={3} crewName={third.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6],
    paddingBottom: spacing[4],
  },
});
