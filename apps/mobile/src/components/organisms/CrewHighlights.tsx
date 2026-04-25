import { ScrollView, StyleSheet } from 'react-native';
import { spacing } from '@morun/tokens';
import { CrewCard } from '../molecules';

export interface CrewSummary {
  id: string;
  name: string;
  region: string;
  members: number;
  pace: string;
}

interface CrewHighlightsProps {
  crews: readonly CrewSummary[];
  onCrewPress?: (id: string) => void;
}

export function CrewHighlights({ crews, onCrewPress }: CrewHighlightsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {crews.map((c) => (
        <CrewCard
          key={c.id}
          name={c.name}
          region={c.region}
          members={c.members}
          pace={c.pace}
          onPress={onCrewPress ? () => onCrewPress(c.id) : undefined}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing[5],
    gap: spacing[3],
  },
});
