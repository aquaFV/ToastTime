import { colors, globalStyles } from '@/constants/global';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProgressRing } from '@/components/ProgressRing';
import { TimerControls } from '@/components/TimerControls';
import { useState, useRef } from 'react';

export default function TimerScreen() {
  const [greenCardMs, setGreenCardMs] = useState(5000);
  const [yellowCardMs, setYellowCardMs] = useState(8000);
  const [redCardMs, setRedCardMs] = useState(10000);

  const totalTime = redCardMs;

  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);

  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const startTimer = () => {
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      const currentMs = Date.now() - startTimeRef.current;

      setElapsedTime(currentMs);
    }, 100);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setGreenCardMs(5 * 1000);
    setYellowCardMs(8 * 1000);
    setRedCardMs(10 * 1000);
    setElapsedTime(0);
  };

  const logSpeaker = () => {
    console.log('Logging speaker...');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentArea}>
        <ProgressRing
          current_value={elapsedTime}
          max_value={totalTime}
          current_color={colors.primary}
        />
        <TimerControls
          running={running}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onLog={logSpeaker}
        />
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
