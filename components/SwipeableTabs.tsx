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
      if (event.translationX < -50 && activeIndex < children.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (event.translationX > 50 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
      translateX.value = withSpring(0); // Reset position with spring animation
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -activeIndex * width }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.tabContainer, animatedStyle]}>
          {children.map((child, index) => (
            <View key={index} style={[styles.tabContent, { width }]}>
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
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
