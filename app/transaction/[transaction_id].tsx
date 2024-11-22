// app/transaction/[transaction_id].tsx
import React from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ThermalPrinter from 'react-native-thermal-printer';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaWithStatusBar from '@/components/SafeAreaView';
import { useTheme } from '@/components/MyThemeProvider';
import Receipt from './receipt';
import AccordionComponent from '@/components/AccordionComponent';

const queryClient = new QueryClient();

export default function App2() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionDetailsScreen />
    </QueryClientProvider>
  );
}

const TransactionDetailsScreen: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { transaction_id } = useLocalSearchParams();
  const { transactions, isLoading, error, refetch } = useFetchTransactions();

  // Fetch the transaction details from the data source
  const transaction = transactions.find(
    (item: any) => item.transaction_id === transaction_id
  );

  // Function to handle refresh
  const handleRefresh = () => {
    refetch(); // Trigger a refetch of transactions
  };

  if (isLoading) {
    return (
      <SafeAreaWithStatusBar>
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaWithStatusBar>
    );
  }

  if (error) {
    return (
      <SafeAreaWithStatusBar>
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-red-500">
            Error Loading transaction
          </Text>
          <Button title="Retry" onPress={handleRefresh} color="#FF9C01" />
        </View>
      </SafeAreaWithStatusBar>
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

      Alert.alert(
        'Print completed!',
        'Two copies of the receipt have been printed.'
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Print Error', 'Failed to print receipt.');
    }
  };

  return (
    <SafeAreaWithStatusBar>
      {/* Receipt Tab */}
      <AccordionComponent title={'Receipt'}>
        <Receipt transaction={transaction} />
      </AccordionComponent>

      {/* Transaction Details Tab */}
      <View
        className={`w-full max-w-md ${theme === 'dark' ? 'bg-custom' : 'bg-custom'} mt-6 p-6`}
      >
        <Text className={`text-center text-lg font-robotoMedium mb-2`}>
          Transaction Details
        </Text>
        {/* Display other transaction details here */}
        {/* Example detail display */}
        <Text>Transaction ID: {transaction.transaction_id}</Text>
        <Text>Date: {transaction.created_at}</Text>
        <Text>Account ID: {transaction.account_id}</Text>
        <Text>Amount: ${transaction.amount}</Text>
      </View>

      {/* Print Button */}
      <View className="flex-1 items-center justify-center mt-8">
        <TouchableOpacity onPress={printReceipt}>
          <Ionicons name="print-outline" size={28} color="white" />
        </TouchableOpacity>
        <View>
          <Text></Text>
        </View>
        <Text className="text-center text-white font-robotoItalic ">
          Print Receipt!
        </Text>
      </View>

      {/* Back Button */}
      <View className="mt-8">
        <Button title="Back" color="#FF9C01" onPress={() => router.back()} />
      </View>
    </SafeAreaWithStatusBar>
  );
};
