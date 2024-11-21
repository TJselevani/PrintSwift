import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import SafeAreaWithStatusBar from '@/components/SafeAreaView';
import AppBar from '@/components/AppBar';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/MyThemeProvider';
import MyAppLogo from '@/components/AppLogo';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaWithStatusBar>
      <AppBar title="PrintSwift" />

      <ParallaxScrollView
        headerImage={<MyAppLogo />}
        headerBackgroundColor={{
          dark: '#201f2f',
          light: '#fefefe',
        }}
      >
        <ThemedView lightColor='#fefefe' darkColor='#201f2f' >
          <ThemedText type='title'>Tjselevani</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </SafeAreaWithStatusBar>
  );
};

export default HomePage;
