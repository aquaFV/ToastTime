import { colors, globalStyles } from '@/constants/global';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
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

  // Alert modal
  const [alertDialog, setAlertDialog] = useState(false);

  // Pulse animation
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const startPulseAnim = () => {
    pulseAnim.setValue(0);

    const signalPulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(signalPulse, { iterations: 4 }).start();
  };

  // Timer setup variables
  const [selectedPresetId, setSelectedPresetId] = useState('icebreaker');
  const [speakerName, setSpeakerName] = useState('');
  const nameEntered = !speakerName.trim();
  const [isCustomTime, setIsCustomTime] = useState(false);

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
  } = useTimer({ speakerName, selectedPresetId, startPulseAnim });

  const onPresetChange = (item: { label: string; value: string }) => {
    setSelectedPresetId(item.value);

    const preset = SPEECH_PRESETS.find((p) => p.id === item.value);

    if (preset && preset.id === 'custom_time') {
      setIsCustomTime(true);
    } else if (preset) {
      setIsCustomTime(false);
      setPreset(preset.greenMs, preset.yellowMs, preset.redMs);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentArea}>
        <Modal
          visible={alertDialog}
          transparent={true}
          animationType='slide'
          onRequestClose={() => setAlertDialog(false)}
        >
          <View style={globalStyles.alertPopupContainer}>
            <View style={globalStyles.alertPopup}>
              <Text style={globalStyles.alertPopupTitle}>Reset Timer</Text>
              <Text style={globalStyles.alertPopupMsg}>
                Are you sure you want to reset the timer?
              </Text>
              <View style={globalStyles.alertPopupBtnContainer}>
                <TouchableOpacity
                  style={[
                    globalStyles.alertPopupBtn,
                    globalStyles.alertPopupBtnDistructive,
                  ]}
                  onPress={() => {
                    setAlertDialog(false);
                    resetTimer();
                  }}
                >
                  <Text
                    style={[
                      globalStyles.alertPopupBtnText,
                      { color: colors.red },
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    globalStyles.alertPopupBtn,
                    globalStyles.alertPopupBtnDefault,
                  ]}
                  onPress={() => setAlertDialog(false)}
                >
                  <Text style={globalStyles.alertPopupBtnText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* <ProgressRing
          currentValue={progressValue}
          maxValue={maxProgressValue}
          currentColor={currentProgressColor}
          elapsedTime={elapsedTime}
        /> */}

        {hasStartedRef.current ? (
          <TimerControls
            running={running}
            onStart={startTimer}
            onResume={startTimer}
            onPause={pauseTimer}
            onReset={setAlertDialog}
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
              {isCustomTime && (
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => console.log('Hey! Hi!')}
                >
                  <Text style={styles.startBtnText}>Enter</Text>
                </TouchableOpacity>
              )}
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

        <Animated.View
          pointerEvents='none'
          style={[
            globalStyles.pulseView,
            {
              backgroundColor: currentProgressColor,
              opacity: pulseAnim,
            },
          ]}
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
