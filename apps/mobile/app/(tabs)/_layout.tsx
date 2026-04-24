import { Tabs } from 'expo-router';
import { colors } from '@morun/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen name="main" options={{ title: '홈' }} />
      <Tabs.Screen name="board" options={{ title: '게시판' }} />
      <Tabs.Screen name="crew" options={{ title: '크루' }} />
      <Tabs.Screen name="profile" options={{ title: '내정보' }} />
    </Tabs>
  );
}
