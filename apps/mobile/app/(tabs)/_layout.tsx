import { Tabs } from 'expo-router';
import { colors } from '@morun/tokens';
import { IconPlaceholder } from '@/components/atoms';

// TODO(icons): swap each tabBarIcon's IconPlaceholder for the actual asset.
function tabIcon(label: string) {
  return ({ focused }: { focused: boolean }) => (
    <IconPlaceholder
      size={26}
      variant="circle"
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
      <Tabs.Screen name="main" options={{ title: '홈', tabBarIcon: tabIcon('홈') }} />
      <Tabs.Screen name="board" options={{ title: '게시판', tabBarIcon: tabIcon('글') }} />
      <Tabs.Screen name="crew" options={{ title: '크루', tabBarIcon: tabIcon('크루') }} />
      <Tabs.Screen name="profile" options={{ title: '내정보', tabBarIcon: tabIcon('나') }} />
    </Tabs>
  );
}
