import { Tabs } from 'expo-router';
import { colors } from '@morun/tokens';
import { IconPlaceholder } from '@/components/atoms';

// TODO(icons): swap each placeholder for the real asset (including 서울).
function placeholderIcon(label: string, big = false) {
  return ({ focused }: { focused: boolean }) => (
    <IconPlaceholder
      size={big ? 30 : 24}
      variant={big ? 'circle' : 'square'}
      tone={focused ? 'primary' : 'muted'}
      label={label}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.divider },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="crew" options={{ title: '크루', tabBarIcon: placeholderIcon('크루') }} />
      <Tabs.Screen name="board" options={{ title: '게시판', tabBarIcon: placeholderIcon('글') }} />
      <Tabs.Screen name="seoul" options={{ title: '서울', tabBarIcon: placeholderIcon('서울', true) }} />
      <Tabs.Screen name="profile" options={{ title: '내정보', tabBarIcon: placeholderIcon('나') }} />
      <Tabs.Screen name="settings" options={{ title: '설정', tabBarIcon: placeholderIcon('설정') }} />
    </Tabs>
  );
}
