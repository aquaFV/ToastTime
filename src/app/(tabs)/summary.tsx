import { colors } from '@/constants/global';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TimerScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentArea}>
        <Text>This is a summary</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 128,
    gap: 32,
    backgroundColor: colors.background,
  },
});
