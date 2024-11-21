import React from 'react';
import { Text, type TextProps } from 'react-native';
import { useTheme } from './MyThemeProvider'; // Import your ThemeProvider hook

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  lightColor,
  darkColor,
  type = 'default',
  className = '',
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme(); // Get the current theme

  // Determine the dynamic text color class
  const textColorClass =
    theme === 'dark' ? 'text-white' : 'color-black';

  // Map types to Tailwind class names
  const typeClass = (() => {
    switch (type) {
      case 'default':
        return 'text-base leading-6'; // fontSize: 16, lineHeight: 24
      case 'defaultSemiBold':
        return 'text-base leading-6 font-semibold'; // fontSize: 16, lineHeight: 24, fontWeight: 600
      case 'title':
        return 'text-3xl font-pextrabold leading-8'; // fontSize: 32, lineHeight: 32, fontFamily: 'Poppins-ExtraBold'
      case 'subtitle':
        return 'text-lg font-bold'; // fontSize: 20, fontWeight: 'bold'
      case 'link':
        return 'text-base leading-7 text-primary'; // fontSize: 16, color: '#0a7ea4'
      default:
        return '';
    }
  })();

  return (
    <Text className={`${textColorClass} ${typeClass} ${className}`} {...rest} />
  );
}
