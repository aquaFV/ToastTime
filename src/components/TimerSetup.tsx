import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/constants/global';
import { useState } from 'react';
import { fontFamily } from '@/dimensions/fontFamily';
import { Dropdown } from 'react-native-element-dropdown';
import { PRESET_DROPDOWN_DATA, SPEECH_PRESETS } from '@/constants/presets';
import { SpeechPreset } from '@/types/presets';

type TimerSetupProps = {
  speakerName: string;
  setSpeakerName: () => void;

  setGreenSignal: (value: number) => void;
  setYellowSignal: (value: number) => void;
  setRedSignal: (value: number) => void;

  onStart: () => void;
};

export function TimerSetup({
  speakerName,
  setSpeakerName,
  setGreenSignal,
  setYellowSignal,
  setRedSignal,
  onStart,
}: TimerSetupProps) {
  const [selectedPresetId, setSelectedPresetId] = useState('icebreaker');

  const handlePresetChange = (item: { label: string; value: string }) => {
    setSelectedPresetId(item.value);

    const preset = SPEECH_PRESETS.find((p) => p.id === item.value);

    if (preset) {
      setGreenSignal(preset.greenMs);
      setYellowSignal(preset.yellowMs);
      setRedSignal(preset.redMs);
    }
  };

  return (
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
      <TouchableOpacity style={styles.startBtn} onPress={() => onStart}>
        <Text style={styles.startBtnText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
