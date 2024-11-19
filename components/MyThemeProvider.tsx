import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  theme: ColorSchemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const MyThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() || 'light'
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme as ColorSchemeName);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadTheme();

    const systemThemeListener = Appearance.addChangeListener(
      ({ colorScheme }) => {
        if (!AsyncStorage.getItem('theme')) {
          setTheme(colorScheme || 'light');
        }
      }
    );

    return () => {
      systemThemeListener.remove();
    };
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a MyThemeProvider');
  }
  return context;
};
