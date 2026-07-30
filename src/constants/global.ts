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
  alertPopupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  alertPopup: {
    width: 300,
    height: 300,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    borderRadius: 45,
    padding: 24,
  },
  alertPopupBtnContainer: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertPopupBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 7.5,
    width: 100,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertPopupBtnDistructive: {
    borderColor: colors.red,
  },
  alertPopupBtnDefault: {
    borderColor: '#58b1e1',
  },
  alertPopupBtnText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#58b1e1',
  },
  alertPopupTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    color: colors.textDark,
  },
  alertPopupMsg: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    color: colors.textDark,
  },
});
