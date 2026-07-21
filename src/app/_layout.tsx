import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { fontFamily } from '../../dimensions/fontFamily';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [fontFamily.black]: require('@/assets/fonts/Montserrat-Black.ttf'),
    [fontFamily.extraBold]: require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    [fontFamily.bold]: require('@/assets/fonts/Montserrat-Bold.ttf'),
    [fontFamily.semiBold]: require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    [fontFamily.medium]: require('@/assets/fonts/Montserrat-Medium.ttf'),
    [fontFamily.regular]: require('@/assets/fonts/Montserrat-Regular.ttf'),
    [fontFamily.light]: require('@/assets/fonts/Montserrat-Light.ttf'),
    [fontFamily.extraLight]: require('@/assets/fonts/Montserrat-ExtraLight.ttf'),
    [fontFamily.thin]: require('@/assets/fonts/Montserrat-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
}
