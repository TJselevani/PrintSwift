import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

const MyAppLogo: React.FC = () => {
  // Golden ratio
  const goldenRatio = 1.618;

  // Define sizes based on golden ratio
  const circleRadius = 12; // Base radius
  const rectangleWidth = circleRadius * goldenRatio; // Rectangle width according to golden ratio
  const rectangleHeight = circleRadius * 5; // Rectangle height

  return (
    <View style={styles.container}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        {/* Rectangular block */}
        <Rect
          x="10"
          y="20"
          width={rectangleWidth}
          height={rectangleHeight}
          fill="#245501"
        />

        {/* First static circle */}
        <Circle
          cx="50"
          cy="30" // Fixed position for the first circle
          r={circleRadius}
          fill="#245501"
        />

        {/* Second static circle */}
        <Circle
          cx="50"
          cy="70" // Fixed position for the second circle
          r={circleRadius}
          fill="#245501"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
});

export default MyAppLogo;
