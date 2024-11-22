import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from './MyThemeProvider';
import { ThemedText } from './ThemedText';

interface AppBarProps {
  title: string;
  rowItems?: React.ReactNode;
  showIcon?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({
  title,
  rowItems,
  showIcon = false,
}) => {
  const { theme, toggleTheme } = useTheme(); // Access the current theme and toggle function

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24,
      }}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        accessible
        accessibilityLabel="Toggle theme"
      >
        {showIcon && (
          <Ionicons
            name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={28}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        )}
      </TouchableOpacity>
      <ThemedText
        className="font-pextrabold"
        type="title"
        style={{
          fontSize: 24,
          color: theme === 'dark' ? 'white' : 'black',
          fontWeight: 'bold',
        }}
      >
        {title}
      </ThemedText>
      <View style={{ flexDirection: 'row' }}>{rowItems}</View>
    </View>
  );
};

export default AppBar;
