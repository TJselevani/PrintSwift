import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from './MyThemeProvider'; // Use your theme provider
import { lightTheme, darkTheme } from '@/constants/themes';

interface SafeAreaWithStatusBarProps {
  children: React.ReactNode;
}

const SafeAreaWithStatusBar: React.FC<SafeAreaWithStatusBarProps> = ({ children }) => {
  const { theme } = useTheme(); // Get current theme from context

  return (
    <SafeAreaView className={`flex-1, p-4 ${theme === 'dark' ? 'bg-dark-primary' : 'bg-light-primary'}`}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWithStatusBar;
