import { useState, useRef, RefObject } from 'react';
import { colors } from '@/constants/global';
import { SPEECH_PRESETS } from '@/constants/presets';
import * as Haptics from 'expo-haptics';

type UseTimerOptions = {
  speakerName: string;
  selectedPresetId: string;
  startPulseAnim: () => void;
};

type UseTimerReturn = {
  elapsedTime: number;
  running: boolean;
  hasStartedRef: RefObject<boolean>;

  progressValue: number;
  maxProgressValue: number;
  currentProgressColor: string;

  greenSignal: number;
  setGreenSignal: (value: number) => void;

  yellowSignal: number;
  setYellowSignal: (value: number) => void;

  redSignal: number;
  setRedSignal: (value: number) => void;

  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  logSpeaker: () => void;

  setPreset: (green: number, yellow: number, red: number) => void;
};

export default function useTimer({
  speakerName,
  selectedPresetId,
  startPulseAnim,
}: UseTimerOptions): UseTimerReturn {
  const [greenSignal, setGreenSignal] = useState(5000);
  const [yellowSignal, setYellowSignal] = useState(8000);
  const [redSignal, setRedSignal] = useState(10000);
  const gracePeriodMs = 30 * 1000; // 30s grace period

  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const hasStartedRef = useRef(false);

  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);

  // Time signals
  const redSignalReachedRef = useRef(false);
  const yellowSignalReachedRef = useRef(false);
  const greenSignalReachedRef = useRef(false);

  // Progress ring variables
  const [progressValue, setProgressValue] = useState(0);
  const [maxProgressValue, setMaxProgressValue] = useState(0);
  const [currentProgressColor, setCurrentProgressColor] = useState(
    colors.primary
  );

  // Exposed setters
  const setPreset = (green: number, yellow: number, red: number) => {
    setGreenSignal(green);
    setYellowSignal(yellow);
    setRedSignal(red);
    setMaxProgressValue(red);
  };

  const startTimer = () => {
    console.log(
      `Green Signal: ${greenSignal}\nYellow Signal: ${yellowSignal}\nRed Signal: ${redSignal}`
    );
    console.log(`maxProgress: ${maxProgressValue}`);
    hasStartedRef.current = true;
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      const currentMs = Date.now() - startTimeRef.current;

      setElapsedTime(currentMs);
      setProgressValue(currentMs);

      // This if statement will run only once. This avoids unnecessary calls to the 'onMaxTime' function.
      // The same if statement is also ran in the 'resumeTimer' function.
      if (currentMs >= redSignal && !redSignalReachedRef.current) {
        onRedSignal();
      } else if (currentMs >= yellowSignal && !yellowSignalReachedRef.current) {
        onYellowSignal();
      } else if (currentMs >= greenSignal && !greenSignalReachedRef.current) {
        onGreenSignal();
      }
    }, 100);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    // Resets the main timer variables
    clearInterval(intervalRef.current);
    setRunning(false);
    setElapsedTime(0);
    greenSignalReachedRef.current = false;
    yellowSignalReachedRef.current = false;
    redSignalReachedRef.current = false;
    hasStartedRef.current = false;

    // Resets the progress ring's variables
    setProgressValue(0);
    setMaxProgressValue(redSignal);
    setCurrentProgressColor(colors.primary);
  };

  const logSpeaker = () => {
    console.log(
      `Logging Speaker: ${speakerName} with a speech time of: ${Math.floor(
        elapsedTime / 1000 / 60
      )
        .toString()
        .padStart(
          2,
          '0'
        )}:${(Math.floor(elapsedTime / 1000) % 60).toString().padStart(2, '0')}`
    );
    resetTimer();
  };

  const onGreenSignal = () => {
    greenSignalReachedRef.current = true;
    startPulseAnim();

    setCurrentProgressColor(colors.green);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const onYellowSignal = () => {
    yellowSignalReachedRef.current = true;
    startPulseAnim();

    setCurrentProgressColor(colors.yellow);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const onRedSignal = () => {
    redSignalReachedRef.current = true;
    startPulseAnim();

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setCurrentProgressColor(colors.red); // Simply indicates that the grace period has started.

    // Searches the presets so that we can check if the speech preset is allowed a grace period later.
    const preset = SPEECH_PRESETS.find((p) => p.id === selectedPresetId);

    // If the speech allows a grace period, we clear the interval so we can start a new one for the grace period.
    // We also set the 'progressValue' to 0 to stop the progress ring from "rubber banding" from it's previous value to the new one.
    // We set the 'maxValue' variable to 30 * 1000 (30s) so that the progress ring maps correctly to the grace period.
    if (preset && preset.hasGracePeriod) {
      clearInterval(intervalRef.current);
      setProgressValue(0);

      setMaxProgressValue(gracePeriodMs);

      intervalRef.current = setInterval(() => {
        const currentMs = Date.now() - startTimeRef.current;

        setElapsedTime(currentMs);
        setProgressValue(currentMs - redSignal);
      }, 100);
    }
  };

  return {
    elapsedTime,
    running,
    hasStartedRef,

    progressValue,
    maxProgressValue,
    currentProgressColor,

    greenSignal,
    setGreenSignal(value) {
      setGreenSignal(value);
    },

    yellowSignal,
    setYellowSignal(value) {
      setYellowSignal(value);
    },

    redSignal,
    setRedSignal(value) {
      setRedSignal(value);
    },

    startTimer,
    pauseTimer,
    resetTimer,
    logSpeaker,

    setPreset,
  };
}
