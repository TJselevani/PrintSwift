import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from './MyThemeProvider'; // Use your theme provider

interface SafeAreaWithStatusBarProps {
  children: React.ReactNode;
}

const SafeAreaWithStatusBar: React.FC<SafeAreaWithStatusBarProps> = ({
  children,
}) => {
  const { theme } = useTheme(); // Get current theme from context

  const backgroundColorClass =
    theme === 'dark' ? 'bg-darkBackground' : 'bg-lightBackground';
  const statusBarStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView className={`flex-1 p-4 ${backgroundColorClass}`}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={theme === 'dark' ? '#121212' : '#ffffff'} // Example dark/light background colors
      />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWithStatusBar;
