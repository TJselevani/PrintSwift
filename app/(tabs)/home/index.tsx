import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SafeAreaWithStatusBar from '@/components/SafeAreaView';
import AppBar from '@/components/AppBar';
import { useTheme } from '@/components/MyThemeProvider';
import MyAppLogo from '@/components/AppLogo';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure react-native-vector-icons is installed
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic'; // Import the Bluetooth library
import { ThemedText } from '@/components/ThemedText';
import Logger from '@/util/Logger';

const { height } = Dimensions.get('window');

const HomePage = () => {
  const { theme, toggleTheme } = useTheme(); // Assuming setTheme is available for changing themes
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedPrinter, setConnectedPrinter] = useState(null);
  const logger = Logger.getInstance();

  useEffect(() => {
    // Check the initial state of Bluetooth when the component mounts
    BluetoothStateManager.getState().then((state) => {
      setIsBluetoothEnabled(state === 'PoweredOn');
    });

    // Listen for changes in Bluetooth state
    const subscription = BluetoothStateManager.onStateChange((state) => {
      setIsBluetoothEnabled(state === 'PoweredOn');
    }, true);

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const toggleBluetooth = () => {
    if (isBluetoothEnabled) {
      // Disable Bluetooth
      BluetoothStateManager.disable().then(() => {
        console.log('Bluetooth Disabled');
        setIsBluetoothEnabled(false); // Update state
        setDevices([]); // Clear devices when Bluetooth is disabled
      });
    } else {
      // Enable Bluetooth
      BluetoothStateManager.enable().then(() => {
        console.log('Bluetooth Enabled');
        setIsBluetoothEnabled(true); // Update state
        scanForDevices(); // Start scanning for devices when enabled
      });
    }
  };

  const scanForDevices = async () => {
    try {
      const availableDevices = await BluetoothClassic.getBondedDevices(); // List available devices
      setDevices(availableDevices);
    } catch (error) {
      logger.error(`Error scanning for devices: ${error}`);
    }
  };

  const connectToPrinter = async (device: any) => {
    try {
      const connection = await BluetoothClassic.connectToDevice(device.id); // Connect to the selected printer
      console.log(`Connected to ${device.name}`);
      setConnectedPrinter(device.id); // Store connected printer ID
    } catch (error) {
      logger.error(`Error connecting to printer:', ${error}`);
    }
  };

  const refreshDevices = () => {
    if (isBluetoothEnabled) {
      scanForDevices(); // Call the scan function to refresh devices
    } else {
      logger.info('Bluetooth is disabled, cannot refresh device list.');
    }
  };

  const textColor = theme === 'dark' ? 'text-white' : 'color-black';
  const iconColor = theme === 'dark' ? 'white' : 'black';

  const containerColor =
    theme === 'dark'
      ? 'bg-containerDarkBackground'
      : 'bg-containerLightBackground';

  const innerContainerColor = theme === 'dark' ? '#201f2f' : '#fefefe';
  const matchColor = theme === 'light' ? '#201f2f' : '#fefefe';
  const backgroundColor =
    theme === 'dark' ? 'bg-darkBackground' : 'bg-lightBackground';

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;

  // Calculate size for squares (using a percentage of the screen width)
  const squareSize = screenWidth * 0.4; // 40% of the screen width

  return (
    <SafeAreaWithStatusBar>
      <AppBar title="PrintSwift" />
      <View className="flex-1 mt-4 ">
        {/* Logo View */}
        <View
          className={`rounded-3xl ${containerColor}`}
          style={[styles.logoContainer]}
        >
          <MyAppLogo />
        </View>

        {/* Container for the squares */}
        <View
          style={styles.container}
          className={`rounded-3xl ${containerColor}`}
        >
          {/* First Square with Switches */}
          <View
            className={`${backgroundColor}`}
            style={[styles.square, { width: squareSize, height: squareSize }]}
          >
            <View style={styles.switchContainer}>
              <Icon
                name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleTheme}
                value={theme === 'dark'}
              />
            </View>
            <View style={styles.switchContainer}>
              <Icon
                name="bluetooth-sharp"
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isBluetoothEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleBluetooth}
                value={isBluetoothEnabled}
              />
            </View>
          </View>

          {/* Second Square split into two rectangles */}
          <View
            className={`${containerColor}`}
            style={[
              styles.square,
              {
                width: squareSize,
                height: squareSize,
                justifyContent: 'space-between',
              },
            ]}
          >
            <View
              style={[
                styles.innerSquare,
                {
                  backgroundColor: isBluetoothEnabled
                    ? 'green'
                    : innerContainerColor,
                },
              ]}
            >
              <Text className={`${textColor}`} style={styles.squareText}>
                Bluetooth
              </Text>
            </View>
            <View
              className="flex-row justify-between content-between"
              style={[
                styles.innerSquare,
                {
                  backgroundColor: connectedPrinter
                    ? 'green'
                    : innerContainerColor,
                },
              ]}
            >
              <Icon name="print" size={30} color={iconColor} />
              <Text className={`${textColor}`} style={styles.squareText}>
                {' '}
                Printer
              </Text>
            </View>
          </View>

          <View>
            <View className="pt-4 pb-4 flex-row justify-between items-center">
              <ThemedText type="title" style={styles.squareText}>
                Available Bluetooth Devices
              </ThemedText>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <TouchableOpacity onPress={refreshDevices}>
                <Icon
                  name="refresh"
                  size={15}
                  color={theme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>

            {/* Combined Squares (3 and 4) */}
            <View style={{ flex: 1 }}>
              {/* This view takes up all remaining space */}
              {/* Combined Squares (3 and 4) */}
              <View
                className={`flex-1 ${containerColor}`}
                style={[styles.square]}
              >
                <FlatList
                  data={devices}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View className="flex-1 w-full items-start p-4">
                      <TouchableOpacity onPress={() => connectToPrinter(item)}>
                        <ThemedText
                          style={[styles.deviceList, { textAlign: 'left' }]}
                        >
                          {item.name}
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaWithStatusBar>
  );
};

// Styles for the squares and container
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center the squares
    marginTop: 20, // Add some space above the squares
  },
  square: {
    borderRadius: 20, // Rounded corners
    justifyContent: 'space-around', // Center text vertically
    alignItems: 'center', // Center text horizontally
    margin: 10, // Space between squares
    padding: 10,
  },
  innerSquare: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  squareText: {
    fontSize: 24, // Font size for numbers
    fontWeight: 'bold', // Bold text
  },
  deviceList: {
    fontSize: 16,
    marginVertical: 5,
  },
  logoContainer: {
    height: height * 0.3, // 40% of the screen height
    justifyContent: 'center', // Center logo vertically
    alignItems: 'center', // Center logo horizontally
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomContainer: {
    flex: 1, // Take up remaining space
    padding: 20, // Add padding as needed
    backgroundColor: '#e0e0e0', // Optional background color for visibility
  },
});

export default HomePage;
