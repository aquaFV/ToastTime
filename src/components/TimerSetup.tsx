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

type TimerSetupProps = {
  speakerName: string;
  setSpeakerName: () => void;

  greenTime: number;
  setGreenTime: () => void;

  yellowTime: number;
  setYellowTime: () => void;

  redTime: number;
  setRedTime: () => void;

  onStart: () => void;
};

export function TimerSetup({
  speakerName,
  setSpeakerName,
  greenTime,
  setGreenTime,
  yellowTime,
  setYellowTime,
  redTime,
  setRedTime,
  onStart,
}: TimerSetupProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter Name...'
        placeholderTextColor={colors.textLightSecondary}
        value={speakerName}
        onChangeText={setSpeakerName}
      />
      <TextInput placeholder="Uhh... Dropdown! DON'T TOUCH." />
      // End of session note: // Add the logic for showing the right stuff,
      check the image if you don't understand. // Good Luck.
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
  },
  textInput: {
    backgroundColor: colors.surfaceDark,
    color: colors.textLight,
    borderRadius: 12,
  },
  startBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  startBtnText: {
    color: colors.textDark,
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
});
