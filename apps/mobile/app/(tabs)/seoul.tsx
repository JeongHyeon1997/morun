import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@morun/tokens';
import type { SeoulDistrictId } from '@morun/shared';
import {
  CrewPodium,
  CrewRanking,
  SeoulRegionMap,
  TerritoryHeader,
  type PodiumCrew,
  type RankedCrew,
} from '@/components/organisms';
import { SectionHeader } from '@/components/molecules';

// Mock data — replace with API. Crew owns districts → those districts paint with the crew color.
const CREWS: readonly (RankedCrew & { ownedDistricts?: readonly SeoulDistrictId[] })[] = [
  {
    id: '1',
    name: '달리는거 좋아하지요~',
    color: '#7C5CFF',
    distanceKm: 1569.4,
    score: 6,
    ownedDistricts: [],
  },
  { id: '2', name: '33.0이상', color: '#F08C3A', distanceKm: 1114.7, score: 5, ownedDistricts: [] },
  {
    id: '3',
    name: '테이너집에 서울일주',
    color: '#9B6BD8',
    distanceKm: 1369.5,
    score: 4,
    ownedDistricts: [],
  },
  { id: '4', name: '다 뒤면 삼겹살', color: '#E25E5E', distanceKm: 1269.5, score: 3 },
  { id: '5', name: '5위', color: '#7BC6E8', distanceKm: 1169.5, score: 2 },
];

export default function SeoulTerritory() {
  const top3: readonly [PodiumCrew, PodiumCrew, PodiumCrew] = [
    CREWS[0],
    CREWS[1],
    CREWS[2],
  ];

  const fills = useMemo(() => {
    const out: Partial<Record<SeoulDistrictId, string>> = {};
    for (const c of CREWS) {
      for (const id of c.ownedDistricts ?? []) {
        out[id] = c.color;
      }
    }
    return out;
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TerritoryHeader region="서울" caption="25개구" />
        <View style={styles.mapWrap}>
          <SeoulRegionMap fills={fills} height={320} />
        </View>

        <CrewPodium top3={top3} />

        <View style={styles.rankingHeader}>
          <SectionHeader title="랭킹" />
        </View>
        <CrewRanking crews={CREWS} />

        <View style={{ height: spacing[6] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing[10] },
  mapWrap: {
    paddingHorizontal: spacing[5],
  },
  rankingHeader: {
    alignItems: 'center',
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
});
