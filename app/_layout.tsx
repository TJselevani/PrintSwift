import React, { useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import '../global.css';
import { MyThemeProvider } from '@/components/MyThemeProvider';
import Logger from '@/util/Logger';
import { UserData } from '@/constants/types';
import { getUserData } from '@/util/Auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const logger = Logger.getInstance();

  const [fontsLoaded, error] = useFonts({
    //Poppins
    'Poppins-Black': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins/Poppins-Thin.ttf'),

    //Roboto
    'RobotoMono-BoldItalic': require('../assets/fonts/Roboto/RobotoMono-BoldItalic.ttf'),
    'RobotoMono-Bold': require('../assets/fonts/Roboto/RobotoMono-Bold.ttf'),
    'RobotoMono-ExtraLightItalic': require('../assets/fonts/Roboto/RobotoMono-ExtraLightItalic.ttf'),
    'RobotoMono-ExtraLight': require('../assets/fonts/Roboto/RobotoMono-ExtraLight.ttf'),
    'RobotoMono-Italic': require('../assets/fonts/Roboto/RobotoMono-Italic.ttf'),
    'RobotoMono-ItalicVariable': require('../assets/fonts/Roboto/RobotoMono-Italic-VariableFont_wght.ttf'),
    'RobotoMono-LightItalic': require('../assets/fonts/Roboto/RobotoMono-LightItalic.ttf'),
    'RobotoMono-Light': require('../assets/fonts/Roboto/RobotoMono-Light.ttf'),
    'RobotoMono-MediumItalic': require('../assets/fonts/Roboto/RobotoMono-MediumItalic.ttf'),
    'RobotoMono-Medium': require('../assets/fonts/Roboto/RobotoMono-Medium.ttf'),
    'RobotoMono-Regular': require('../assets/fonts/Roboto/RobotoMono-Regular.ttf'),
    'RobotoMono-SemiBoldItalic': require('../assets/fonts/Roboto/RobotoMono-SemiBoldItalic.ttf'),
    'RobotoMono-SemiBold': require('../assets/fonts/Roboto/RobotoMono-SemiBold.ttf'),
    'RobotoMono-ThinItalic': require('../assets/fonts/Roboto/RobotoMono-ThinItalic.ttf'),
    'RobotoMono-Thin': require('../assets/fonts/Roboto/RobotoMono-Thin.ttf'),
    'RobotoMono-Variable': require('../assets/fonts/Roboto/RobotoMono-VariableFont_wght.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const checkLoginStatus = async () => {
    const data = await getUserData();
    if (data && data.email) {
      setIsLoggedIn(true);
      setUserData(data);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    logger.info('App has started.');

    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <MyThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </MyThemeProvider>
  );
}
