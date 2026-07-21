import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '@/constants/global';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

type TimerControlsProps = {
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLog: () => void;
};

export function TimerControls({
  running,
  onStart,
  onPause,
  onReset,
  onLog,
}: TimerControlsProps) {
  return (
    <View style={styles.container}>
      {!running ? (
        <>
          <TouchableOpacity onPress={() => onReset}>
            <Ionicons name='refresh' color={colors.primary} size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onStart}>
            <Ionicons name='play' color={colors.primary} size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onLog}>
            <Feather name='user-check' color={colors.primary} size={50} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => onPause}>
            <Ionicons name='pause' color={colors.primary} size={50} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
