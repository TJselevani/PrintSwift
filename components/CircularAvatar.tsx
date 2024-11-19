import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed for the default icon

const CircularAvatar = ({ source, size = 100, initials }) => {
  const renderContent = () => {
    // Check if source is a valid URI
    if (source! && typeof source === 'object' && source.uri) {
      return (
        <Image
          source={source}
          style={[styles.avatar, { width: size, height: size }]}
        />
      );
    }

    // Check if initials are provided
    if (initials) {
      const formattedInitials = initials.substring(0, 2).toUpperCase();
      return (
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>{formattedInitials}</Text>
        </View>
      );
    }

    // Default avatar icon
    return <MaterialIcons name="person" size={size / 2} color="#888" />;
  };

  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff', // Optional border color
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 50,
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  initialsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CircularAvatar;
