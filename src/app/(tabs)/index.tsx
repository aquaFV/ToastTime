import { colors, globalStyles } from '@/constants/global';
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProgressRing } from '@/components/ProgressRing';
import { TimerControls } from '@/components/TimerControls';
import { useState, useRef } from 'react';
import { TimerSetup } from '@/components/TimerSetup';
import { SpeechPreset } from '@/types/presets';
import { PRESET_DROPDOWN_DATA, SPEECH_PRESETS } from '@/constants/presets';
import { Dropdown } from 'react-native-element-dropdown';
import { fontFamily } from '@/dimensions/fontFamily';

export default function TimerScreen() {
  const [speakerName, setSpeakerName] = useState('');

  const [greenSignalMs, setGreenSignalMs] = useState(5000);
  const [yellowSignalMs, setYellowSignalMs] = useState(8000);
  const [redSignalMs, setRedSignalMs] = useState(10000);

  const totalTime = redSignalMs;

  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const startTimer = () => {
    setHasStarted(true);
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
    setHasStarted(false);
    setElapsedTime(0);
  };

  const logSpeaker = () => {
    console.log(
      `Logging Speaker: ${speakerName} with a speech time of: ${Math.floor(elapsedTime / 1000 / 60)}:${Math.floor(elapsedTime / 1000) % 60}`
    );
    resetTimer();
  };

  const [selectedPresetId, setSelectedPresetId] = useState('icebreaker');

  const handlePresetChange = (item: { label: string; value: string }) => {
    setSelectedPresetId(item.value);

    const preset = SPEECH_PRESETS.find((p) => p.id === item.value);

    if (preset) {
      setGreenSignalMs(preset.greenMs);
      setYellowSignalMs(preset.yellowMs);
      setRedSignalMs(preset.redMs);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentArea}>
        <ProgressRing
          current_value={elapsedTime}
          max_value={totalTime}
          current_color={colors.primary}
        />
        {hasStarted ? (
          <TimerControls
            running={running}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onLog={logSpeaker}
          />
        ) : (
          <>
            <View style={styles.container}>
              <TextInput
                placeholder='Enter Name...'
                placeholderTextColor={colors.textLightSecondary}
                value={speakerName}
                onChangeText={setSpeakerName}
                style={styles.textInput}
              />

              <Dropdown
                data={PRESET_DROPDOWN_DATA}
                labelField='label'
                valueField='value'
                value={selectedPresetId}
                onChange={handlePresetChange}
                style={styles.textInput}
                containerStyle={styles.listContainer}
                itemTextStyle={styles.listItemStyle}
                selectedTextStyle={styles.listItemStyle}
                activeColor='#4d4d4d'
              />
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => startTimer()}
              >
                <Text style={styles.startBtnText}>Start</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  timeInputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 16,
  },
  startBtn: {
    backgroundColor: colors.primary,
    borderRadius: 7.5,
    width: 150,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    color: colors.textDark,
    fontFamily: fontFamily.bold,
    fontSize: 32,
  },
  textInput: {
    backgroundColor: colors.surfaceDark,
    color: colors.textLight,
    borderRadius: 7.5,
    width: 200,
    height: 48,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    paddingLeft: 10,
  },
  listContainer: {
    backgroundColor: colors.surfaceDark,
    color: colors.textLight,
    borderBottomRightRadius: 7.5,
    borderBottomLeftRadius: 7.5,
    fontFamily: fontFamily.regular,
    borderColor: colors.primary,
    borderTopWidth: 0,
  },
  listItemStyle: {
    fontFamily: fontFamily.regular,
    color: colors.textLight,
    fontSize: 16,
  },
});
