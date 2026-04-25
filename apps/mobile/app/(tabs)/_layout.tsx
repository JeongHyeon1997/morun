import { Tabs } from 'expo-router';
import { colors } from '@morun/tokens';
import { IconPlaceholder, SeoulShape } from '@/components/atoms';

// TODO(icons): swap each placeholder for the real asset.
function placeholderIcon(label: string) {
  return ({ focused }: { focused: boolean }) => (
    <IconPlaceholder
      size={24}
      variant="square"
      tone={focused ? 'primary' : 'muted'}
      label={label}
    />
  );
}

function seoulIcon({ focused }: { focused: boolean }) {
  return <SeoulShape size={28} color={focused ? colors.primary : colors.textMuted} />;
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
      <Tabs.Screen name="seoul" options={{ title: '서울', tabBarIcon: seoulIcon }} />
      <Tabs.Screen name="profile" options={{ title: '내정보', tabBarIcon: placeholderIcon('나') }} />
      <Tabs.Screen name="settings" options={{ title: '설정', tabBarIcon: placeholderIcon('설정') }} />
    </Tabs>
  );
}
