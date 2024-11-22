// AccordionComponent.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTheme } from './MyThemeProvider';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const AccordionComponent = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { theme } = useTheme();

  const containerColor =
    theme === 'dark'
      ? 'bg-containerDarkBackground'
      : 'bg-containerLightBackground';

  const iconColor = theme === 'dark' ? '#fafafa' : '#161622';

  return (
    <ThemedView style={styles.container} className={`${containerColor}`}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          {title}
        </ThemedText>
        <Icon
          name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          color={iconColor}
          size={24}
        />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <ThemedView style={styles.body} className={`${containerColor}`}>
          {children}
        </ThemedView>
      </Collapsible>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 0,
    // backgroundColor: '#f7f7f7',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    padding: 15,
    // backgroundColor: '#fff',
  },
});

export default AccordionComponent;
