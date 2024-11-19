import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingWidgetProps {
  size?: 'small' | 'large';
  color?: string;
  style?: object;
}

const LoadingWidget: React.FC<LoadingWidgetProps> = ({
  size = 'large',
  color = '#0000ff',
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingWidget;
