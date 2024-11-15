import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StatusBar, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThermalPrinter from 'react-native-thermal-printer'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { PrinterDevice } from '../constants/types'; 
import { Link } from 'expo-router';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { useTheme } from '@/components/MyThemeProvider';
import { darkTheme, lightTheme } from '@/constants/themes';

const PrinterSettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  
  const [printers, setPrinters] = useState<PrinterDevice[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>(null);

  // Fetch Bluetooth devices
  useEffect(() => {
    const fetchPrinters = async () => {
      console.log("Checking if ThermalPrinter is available:", ThermalPrinter);
      // Check if ThermalPrinter is available
      if (ThermalPrinter) {  
        try {
          const deviceList = await ThermalPrinter.getBluetoothDeviceList();
          setPrinters(deviceList);
        } catch (error) {
          console.error("Error fetching printers:", error);
          Alert.alert("Error", "Failed to fetch Bluetooth devices.");
        }
      } else {
        console.error("ThermalPrinter is not initialized");
        Alert.alert("Error", "ThermalPrinter module is not available.");
      }
    };

    BluetoothStateManager.getState().then((state) => {
      if (state !== 'PoweredOn') {
        Alert.alert('Bluetooth is not enabled', 'Please enable Bluetooth to continue.');
      } else {
        fetchPrinters();
      }
    });

  }, []);
  

  // Connect to a specific printer
  const connectToPrinter = async (macAddress: string) => {
    try {
      // await ThermalPrinter.connectPrinter(macAddress);
      setSelectedPrinter(macAddress);
      Alert.alert("Connected", `Connected to printer at ${macAddress}`);
    } catch (error) {
      console.error("Connection error:", error);
      Alert.alert("Connection Error", "Failed to connect to printer.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary p-4">
      {/* <Text className="text-4xl font-bold text-center mb-4 color-gray-200">Available Printers</Text> */}
      <View style={[{ backgroundColor: currentTheme.backgroundColor }]}>
        <Text style={{ color: currentTheme.textColor }}>Hello, {theme} mode!</Text>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>

      <StatusBar barStyle="light-content" />
      <View className="flex-row justify-between items-center mt-6 mb-10">
        <Text></Text>
        <Text className="text-3xl color-white font-pextrabold">Available Printers</Text>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Ionicons name="receipt-outline" size={28} color="white" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* <View>
        <Ionicons name="card-outline" size={28} color="white" />
        <Ionicons name="cash-outline" size={28} color="white" />
        <Ionicons name="receipt-outline" size={28} color="white" />
        <Ionicons name="wallet-outline" size={28} color="white" />
        <Ionicons name="swap-horizontal-outline" size={28} color="white" />
      </View> */}
      
      <FlatList
        data={printers}
        keyExtractor={(item) => item.macAddress}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-lg border border-gray-200"
            onPress={() => connectToPrinter(item.macAddress)}
          >
            <View>
              <Text className="text-lg font-semibold">{item.deviceName || "Unknown Device"}</Text>
              <Text className="text-gray-500">{item.macAddress}</Text>
            </View>
            {selectedPrinter === item.macAddress && (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-center text-gray-500 mt-6">No printers found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PrinterSettingsScreen;
