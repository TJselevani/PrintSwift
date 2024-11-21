import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// Create an animated version of the Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BouncingCirclesLoader: React.FC = () => {
  // Golden ratio
  const goldenRatio = 1.618;

  // Define sizes based on golden ratio
  const circleRadius = 12; // Base radius
  const rectangleWidth = circleRadius * goldenRatio; // Rectangle width according to golden ratio
  const rectangleHeight = circleRadius * 5; // Rectangle height

  const circle1Y = useSharedValue(30);
  const circle2Y = useSharedValue(70);

  // Animation logic for the circles
  useEffect(() => {
    const durationFactor = circleRadius / 10; // Adjust timing based on radius

    circle1Y.value = withRepeat(
      withSequence(
        withTiming(20, { duration: durationFactor * 500 }), // Move up
        withTiming(30, { duration: durationFactor * 500 }) // Move back down
      ),
      -1,
      false
    );

    circle2Y.value = withRepeat(
      withSequence(
        withTiming(80, { duration: durationFactor * 500 }), // Move up
        withTiming(70, { duration: durationFactor * 500 }) // Move back down
      ),
      -1,
      false
    );
  }, [circle1Y, circle2Y]);

  // Animated props for the circles
  const animatedCircle1Props = useAnimatedProps(() => ({
    cy: circle1Y.value,
  }));

  const animatedCircle2Props = useAnimatedProps(() => ({
    cy: circle2Y.value,
  }));

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

        {/* First bouncing circle */}
        <AnimatedCircle
          cx="50"
          animatedProps={animatedCircle1Props}
          r={circleRadius}
          fill="#245501"
        />

        {/* Second bouncing circle */}
        <AnimatedCircle
          cx="50"
          animatedProps={animatedCircle2Props}
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

export default BouncingCirclesLoader;
