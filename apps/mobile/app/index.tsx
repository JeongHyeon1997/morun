import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@morun/tokens';

export default function Splash() {
  useEffect(() => {
    const t = setTimeout(() => router.replace('/(tabs)/seoul'), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        MO<Text style={styles.logoColon}>:</Text>RUN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -1,
  },
  logoColon: {
    color: colors.primary,
  },
});
