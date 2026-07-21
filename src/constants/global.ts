import { fontFamily } from '@/dimensions/fontFamily';
import { StatusBar, StyleSheet } from 'react-native';

export const colors = {
  background: '#1c1c1c',
  surfaceDark: '#242424',
  primary: '#ecebe4',

  textDark: '#2b2b2b',
  textLight: '#f5f5f5',
  textDarkSecondary: '#a4aca0',
  textLightSecondary: '#dedede',

  green: '#5eae45',
  yellow: '#eacc45',
  red: '#ca5050',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight,
  },
});
