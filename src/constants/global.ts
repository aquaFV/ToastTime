import { fontFamily } from '@/dimensions/fontFamily';
import { StatusBar, StyleSheet } from 'react-native';

export const colors = {
  background: '#1c1c1c',
  surfaceDark: '#363636',
  primary: '#ecebe4',

  textDark: '#242424',
  textLight: '#f5f5f5',
  textDarkSecondary: '#a5aca0',
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
