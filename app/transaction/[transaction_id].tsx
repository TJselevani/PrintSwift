// app/transaction/[transaction_id].tsx
import React from 'react';
import { View, Text, Button, Alert, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import ThermalPrinter from 'react-native-thermal-printer';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons';

const queryClient = new QueryClient();

export default function App2() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionDetailsScreen />
    </QueryClientProvider>
  )
}

const TransactionDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { transaction_id } = useLocalSearchParams();
  const { transactions, isLoading, error } = useFetchTransactions();

  // Fetch the transaction details from the data source
  const transaction = transactions.find(
    (item: any) => item.transaction_id === transaction_id
  );

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-primary p-4">
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center mt-6 mb-10">
          <Text></Text>
          <Text className="text-3xl text-white font-pextrabold">Transaction Details</Text>
          <Text></Text>
        </View>
      
      <View className='flex-1 justify-center items-center'>
        <Text className="text-center mt-10 text-lg text-gray-500 font-pregular">Transaction not found</Text>
      </View>
      </SafeAreaView>
    );
  }

  const printReceipt = async () => {
    try {
      const receiptContent = `
        Receipt
        -------------------------------
        Transaction ID: ${transaction.transaction_id}
        Date: ${transaction.created_at}
        Account ID: ${transaction.account_id}
        Amount: $${transaction.amount}
        -------------------------------
        Thank you for your business!
      `;

      // Uncomment to print if Bluetooth printer setup is ready.
      // await ThermalPrinter.printBluetooth('printer_mac_address', receiptContent);
      // await ThermalPrinter.printBluetooth('printer_mac_address', receiptContent); // Second copy

      Alert.alert('Print completed!', 'Two copies of the receipt have been printed.');
    } catch (error) {
      console.error(error);
      Alert.alert('Print Error', 'Failed to print receipt.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary p-6 items-center">
      <StatusBar barStyle="light-content" />
      
      <View className="flex-row justify-between items-center mt-6 mb-10">
        <Text></Text>
        <Text className="text-3xl text-white font-pextrabold">Transaction Details</Text>
      </View>
      
      <View className="w-full max-w-md bg-white mt-6 p-6">
        <Text className="text-center text-lg font-robotoMedium mb-2">Receipt</Text>
        <Text className="text-center text-gray-800 font-robotoLight">-------------------------------</Text>
        
        <Text className="font-robotoRegular text-center my-2">Transaction ID:</Text>
        <Text className="font-robotoRegular text-center text-lg">{transaction.transaction_id}</Text>
        
        <Text className="font-robotoRegular text-center my-2">Date:</Text>
        <Text className="font-robotoRegular text-center text-lg">{transaction.created_at}</Text>
        
        <Text className="font-robotoRegular text-center my-2">Account ID:</Text>
        <Text className="font-robotoRegular text-center text-lg">{transaction.account_id}</Text>
        
        <Text className="font-robotoRegular text-center my-2">Amount:</Text>
        <Text className="font-robotoRegular text-center text-lg">$ {transaction.amount}</Text>
        
        <Text className="text-center text-gray-800 font-robotoLight mt-2">-------------------------------</Text>
        <Text className="text-center text-gray-600 font-robotoItalic mt-2">Thank you for your business!</Text>
      </View>

      <View className="flex-1 items-center justify-center mt-8">
        <TouchableOpacity onPress={printReceipt}>
          <Ionicons name="print-outline" size={28} color="white" />
        </TouchableOpacity>
        <View>
          <Text></Text>
        </View>
        
        <Text className="text-center text-white font-robotoItalic ">Print Receipt!</Text>
        
      </View>

      <View className="mt-8">
        <Button title="Back" color="#FF9C01" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
};
