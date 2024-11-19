import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BouncingCirclesLoader: React.FC = () => {
  const circle1X = useSharedValue(0);
  const circle2X = useSharedValue(0);

  // Animation logic for the circles
  useEffect(() => {
    circle1X.value = withRepeat(
      withSequence(
        withTiming(-50, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      false
    );

    circle2X.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      false
    );
  }, [circle1X, circle2X]);

  // Animated styles for the circles
  const circle1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: circle1X.value }],
  }));

  const circle2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: circle2X.value }],
  }));

  return (
    <View style={styles.container}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        {/* Rectangular block */}
        <Rect x="10" y="20" width="20" height="60" fill="#4A4A4A" />

        {/* First bouncing circle */}
        <Animated.View style={[styles.circle, circle1Style]}>
          <Circle cx="70" cy="30" r="10" fill="#4A4A4A" />
        </Animated.View>

        {/* Second bouncing circle */}
        <Animated.View style={[styles.circle, circle2Style]}>
          <Circle cx="70" cy="70" r="10" fill="#4A4A4A" />
        </Animated.View>
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
  },
  circle: {
    position: 'absolute',
  },
});

export default BouncingCirclesLoader;
