import { colors } from '@/constants/global';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from './WheelPicker';
import { RefObject } from 'react';

type SignalWheelsProps = {
  setGreenSignal: (value: number) => void;
  setYellowSignal: (value: number) => void;
  setRedSignal: (value: number) => void;
};

export function SignalWheels({
  setGreenSignal,
  setYellowSignal,
  setRedSignal,
}: SignalWheelsProps) {
  return (
    <View style={styles.container}>
      {/* GREEN SIGNAL WHEEL */}
      <WheelPicker setSignalTime={setGreenSignal} color={colors.green} />
      <View style={styles.dividerLine} />

      {/* YELLOW SIGNAL WHEEL */}
      <WheelPicker setSignalTime={setYellowSignal} color={colors.yellow} />
      <View style={styles.dividerLine} />

      {/* RED SIGNAL WHEEL */}
      <WheelPicker setSignalTime={setRedSignal} color={colors.red} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 10,
  },
  dividerLine: {
    backgroundColor: colors.background,
    width: '100%',
    height: 4,
  },
});
