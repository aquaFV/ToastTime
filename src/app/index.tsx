import { colors, globalStyles } from '@/constants/global';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProgressRing } from '@/components/ProgressRing';
import { TimerControls } from '@/components/TimerControls';
import { useState, useRef } from 'react';

export default function TimerScreen() {
  const [greenCardMs, setGreenCardMs] = useState(240000);
  const [yellowCardMs, setYellowCardMs] = useState(300000);
  const [redCardMs, setRedCardMs] = useState(360000);

  const totalTime = greenCardMs + yellowCardMs + redCardMs;

  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);

  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const startTimer = () => {
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setGreenCardMs(240000);
    setYellowCardMs(300000);
    setRedCardMs(360000);
    setElapsedTime(0);
  };

  const logSpeaker = () => {
    console.log('Logging speaker...');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
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
