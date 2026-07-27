import { colors } from '@/constants/global';
import {
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
import { PRESET_DROPDOWN_DATA, SPEECH_PRESETS } from '@/constants/presets';
import { Dropdown } from 'react-native-element-dropdown';
import { fontFamily } from '@/dimensions/fontFamily';
import useTimer from '@/hooks/useTimer';
import { useKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';

export default function TimerScreen() {
  // Keeps phone awake
  useKeepAwake();

  // Timer setup variables
  const [selectedPresetId, setSelectedPresetId] = useState('icebreaker');
  const [speakerName, setSpeakerName] = useState('');
  const nameEntered = !speakerName.trim();

  // Timer
  const {
    elapsedTime,
    running,
    hasStartedRef,
    progressValue,
    maxProgressValue,
    currentProgressColor,
    startTimer,
    pauseTimer,
    resetTimer,
    logSpeaker,
    setPreset,
  } = useTimer({ speakerName, selectedPresetId });

  const onPresetChange = (item: { label: string; value: string }) => {
    setSelectedPresetId(item.value);

    const preset = SPEECH_PRESETS.find((p) => p.id === item.value);

    if (preset) {
      setPreset(preset.greenMs, preset.yellowMs, preset.redMs);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentArea}>
        <ProgressRing
          currentValue={progressValue}
          maxValue={maxProgressValue}
          currentColor={currentProgressColor}
          elapsedTime={elapsedTime}
        />

        {hasStartedRef.current ? (
          <TimerControls
            running={running}
            onStart={startTimer}
            onResume={startTimer}
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
                onChange={onPresetChange}
                style={styles.textInput}
                containerStyle={styles.listContainer}
                itemTextStyle={styles.listItemStyle}
                selectedTextStyle={styles.listItemStyle}
                activeColor='#4d4d4d'
              />
              <TouchableOpacity
                style={[
                  styles.startBtn,
                  nameEntered && { backgroundColor: '#999894' },
                ]}
                onPress={() => startTimer()}
                disabled={nameEntered}
              >
                <Text
                  style={[
                    styles.startBtnText,
                    nameEntered && { color: '#2e2e2e' },
                  ]}
                >
                  Start
                </Text>
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
    paddingTop: 32,
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
    marginTop: 20,
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
