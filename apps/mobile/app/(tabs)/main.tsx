import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@morun/tokens';
import {
  SEOUL_DISTRICTS,
  type SeoulDistrictId,
} from '@morun/shared';
import {
  CrewHighlights,
  HomeHeader,
  RegionRanking,
  SeoulRegionMap,
  type CrewSummary,
  type RegionStat,
} from '@/components/organisms';
import { HeatLegend, SectionHeader } from '@/components/molecules';
import { HEAT_LEGEND, heatColor } from '@/lib/heatScale';

// Mock activity counts per district. Replace with API data later.
const MOCK_COUNTS: Partial<Record<SeoulDistrictId, number>> = {
  'Gangnam-gu': 38,
  'Seocho-gu': 27,
  'Songpa-gu': 24,
  'Mapo-gu': 22,
  'Yongsan-gu': 18,
  'Seongdong-gu': 16,
  'Gwangjin-gu': 14,
  'Yeongdeungpo-gu': 13,
  'Gwanak-gu': 12,
  'Dongjak-gu': 11,
  'Eunpyeong-gu': 9,
  'Seodaemun-gu': 9,
  'Jongno-gu': 8,
  'Jung-gu': 7,
  'Seongbuk-gu': 7,
  'Nowon-gu': 6,
  'Gangdong-gu': 6,
  'Gangseo-gu': 6,
  'Yangcheon-gu': 5,
  'Guro-gu': 4,
  'Geumcheon-gu': 3,
  'Dongdaemun-gu': 3,
  'Jungnang-gu': 2,
  'Gangbuk-gu': 1,
  'Dobong-gu': 1,
};

const MOCK_DELTA: Partial<Record<SeoulDistrictId, number>> = {
  'Gangnam-gu': 4,
  'Seocho-gu': 2,
  'Songpa-gu': -1,
  'Mapo-gu': 3,
  'Yongsan-gu': 1,
};

const MOCK_CREWS: readonly CrewSummary[] = [
  { id: '1', name: '한강 새벽 러닝클럽', region: '용산구', members: 1240, pace: '5:30/km' },
  { id: '2', name: '서울숲 위크데이런', region: '성동구', members: 870, pace: '6:00/km' },
  { id: '3', name: '강남 페이스메이커', region: '강남구', members: 2310, pace: '4:45/km' },
  { id: '4', name: '잠실 우리동네런', region: '송파구', members: 540, pace: '6:30/km' },
  { id: '5', name: '망원 노을 러너스', region: '마포구', members: 690, pace: '5:50/km' },
];

export default function Main() {
  const [selected, setSelected] = useState<SeoulDistrictId | undefined>('Gangnam-gu');

  const fills = useMemo(() => {
    const out: Partial<Record<SeoulDistrictId, string>> = {};
    for (const d of SEOUL_DISTRICTS) {
      out[d.id] = heatColor(MOCK_COUNTS[d.id] ?? 0);
    }
    return out;
  }, []);

  const stats: readonly RegionStat[] = useMemo(
    () =>
      SEOUL_DISTRICTS.map((d) => ({
        id: d.id,
        label: d.label,
        count: MOCK_COUNTS[d.id] ?? 0,
        delta: MOCK_DELTA[d.id],
      })),
    [],
  );

  const selectedLabel =
    SEOUL_DISTRICTS.find((d) => d.id === selected)?.label ?? '서울 전체';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <HomeHeader region={selectedLabel} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader
          title="지역별 러닝 활동"
          caption="이번 주 활동 중인 크루 수"
          actionLabel="전체보기"
        />
        <SeoulRegionMap
          fills={fills}
          selectedId={selected}
          onSelect={(id) => setSelected(id)}
        />
        <View style={styles.legendRow}>
          <HeatLegend steps={HEAT_LEGEND} />
        </View>

        <View style={styles.gap} />

        <SectionHeader title="활동 많은 동네 TOP 5" actionLabel="더보기" />
        <RegionRanking stats={stats} selectedId={selected} onSelect={setSelected} />

        <View style={styles.gap} />

        <SectionHeader title={`${selectedLabel} 인기 크루`} actionLabel="더보기" />
        <CrewHighlights crews={MOCK_CREWS} />

        <View style={{ height: spacing[10] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing[6] },
  legendRow: {
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  gap: { height: spacing[6] },
});
