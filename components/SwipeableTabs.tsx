import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SwipeableTabsProps {
  children: React.ReactNode[];
}

const SwipeableTabs: React.FC<SwipeableTabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useSharedValue(0);

  // Define the pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX; // Update translation based on gesture
    })
    .onEnd((event) => {
      const newIndex =
        event.translationX < -50
          ? activeIndex + 1
          : event.translationX > 50
            ? activeIndex - 1
            : activeIndex;

      // Ensure newIndex is within bounds
      if (newIndex >= 0 && newIndex < children.length) {
        setActiveIndex(newIndex); // Update state outside of worklet
      }

      translateX.value = withSpring(0); // Reset position with spring animation
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -activeIndex * width }],
    width: `${children.length * 100}%`, // Set total width based on number of children
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.tabContainer, animatedStyle]}>
          {children.map((child, index) => (
            <View key={index} style={styles.tabContent}>
              {child}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
      <View style={styles.tabIndicator}>
        {children.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveIndex(index)}
            style={[
              styles.indicatorDot,
              activeIndex === index ? styles.activeDot : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Tab ${index + 1}`}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ensure a visible background
  },
  tabContainer: {
    flexDirection: 'row',
    // Width will be set dynamically in animatedStyle
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width, // Ensure each tab takes full screen width
    backgroundColor: '#f0f0f0', // Background color for each tab
  },
  tabIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF9C01',
  },
});

export default SwipeableTabs;
