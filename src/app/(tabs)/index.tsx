import { colors, globalStyles } from '@/constants/global';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
  Pressable,
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
import { SignalWheels } from '@/components/SignalWheelPickers';
import { custom_preset } from '@/types/presets';
import { Checkbox } from 'expo-checkbox';

export default function TimerScreen() {
  // Keeps phone awake
  // useKeepAwake();

  // Alert modal
  const [resetting, setResetting] = useState(false);

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
  const [c_hasGracePeriod, setC_HasGracePeriod] = useState(true);

  const initializeTimer = (item: { label: string; value: string }) => {
    setSelectedPresetId(item.value);

    const preset = SPEECH_PRESETS.find((p) => p.id === item.value);

    if (preset && preset.id !== 'custom_time') {
      console.log(
        `Not custom.\nGreen: ${preset.greenMs}\nYellow: ${preset.yellowMs}\nRed: ${preset.redMs}`
      );
      setPreset(preset.greenMs, preset.yellowMs, preset.redMs);
    }
  };

  const onCustomTimerOK = () => {
    setIsCustomTime(false);
    const customPreset = custom_preset({
      greenMs: greenSignal,
      yellowMs: yellowSignal,
      redMs: redSignal,
    });
    const now: Date = new Date();
    console.log(
      `Custom (${now.toLocaleTimeString()}).\nGreen: ${customPreset.greenMs}\nYellow: ${customPreset.yellowMs}\nRed: ${customPreset.redMs}`
    );

    setPreset(customPreset.greenMs, customPreset.yellowMs, customPreset.redMs);
  };

  // Timer
  const {
    elapsedTime,
    running,
    hasStartedRef,
    progressValue,
    maxProgressValue,
    currentProgressColor,
    greenSignal,
    setGreenSignal,
    yellowSignal,
    setYellowSignal,
    redSignal,
    setRedSignal,
    startTimer,
    pauseTimer,
    resetTimer,
    logSpeaker,
    setPreset,
  } = useTimer({
    speakerName,
    selectedPresetId,
    startPulseAnim,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentArea}>
        {/* Popup dialog warning the user when restarting the timer */}
        <Modal
          visible={resetting}
          transparent={true}
          animationType='slide'
          onRequestClose={() => setResetting(false)}
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
                    setResetting(false);
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
                  onPress={() => setResetting(false)}
                >
                  <Text style={globalStyles.alertPopupBtnText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Popup dialog for setting custom signal times */}
        <Modal
          visible={isCustomTime}
          transparent={true}
          animationType='slide'
          onRequestClose={() => setIsCustomTime(false)}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={styles.customTimeModal}>
              <SignalWheels
                setGreenSignal={setGreenSignal}
                setYellowSignal={setYellowSignal}
                setRedSignal={setRedSignal}
              />
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}
                onPress={() => setC_HasGracePeriod(!c_hasGracePeriod)}
              >
                <Checkbox
                  style={{ marginRight: 10 }}
                  value={c_hasGracePeriod}
                  onValueChange={setC_HasGracePeriod}
                  color={c_hasGracePeriod ? 'red' : 'blue'}
                />
                <Text style={styles.customTimeText}>Has grace period</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => onCustomTimerOK()}
              >
                <Text style={styles.startBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
            onReset={setResetting}
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
                onChange={(item) => initializeTimer(item)}
                style={styles.textInput}
                containerStyle={styles.listContainer}
                itemTextStyle={styles.listItemStyle}
                selectedTextStyle={styles.listItemStyle}
                activeColor='#4d4d4d'
              />
              {selectedPresetId === 'custom_time' && (
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => setIsCustomTime(true)}
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
    justifyContent: 'flex-start',
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
  customTimeModal: {
    width: '85%',
    height: '85%',
    backgroundColor: colors.background,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  customTimeText: {
    fontSize: 24,
    fontFamily: fontFamily.regular,
    color: colors.textLight,
    includeFontPadding: false,
  },
  checkbox: {
    borderRadius: 5,
    borderColor: colors.primary,
  },
});
