import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from './MyThemeProvider';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { theme } = useTheme();

  const backgroundColor = theme === 'dark' ? darkColor! : lightColor!;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
