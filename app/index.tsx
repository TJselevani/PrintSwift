import React, { useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import Transaction from '@/constants/Transaction.model';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { formatDateTime, formatTime, timeAgo } from '@/constants/time';
import LoadingWidget from '@/components/Loader';
import styled from 'nativewind';


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionsListScreen />
    </QueryClientProvider>
  )
}

const TransactionsListScreen: React.FC = () => {
  const { transactions, isLoading, error } = useFetchTransactions();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Link href={`/transaction/${item.transaction_id}`} asChild>
      <TouchableOpacity className="w-full">
        <View className="bg-gray px-4 py-6 pb-8 rounded-lg shadow-lg mb-4 border w-full">
          <Text className="text-lg color-white font-pextrabold">{formatDateTime(item.created_at)}</Text>
          <Text className="text-lg color-white  font-pbold">{formatTime(item.created_at)}</Text>
          <Text className="text-lg color-white  font-pblack">{timeAgo(item.created_at)}</Text>
          <Text className="text-gray-700 font-pmedium">Amount: ${item.amount}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-primary p-4">
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center mt-6 mb-10">
          <Text></Text>
          <Text className="text-3xl color-white font-pextrabold">Transactions</Text>
          <Text></Text>
        </View>
  
  
      <LoadingWidget />
        
      </SafeAreaView>
    );
  }

  if (error) {

    return (
      <SafeAreaView className="flex-1 bg-primary p-4">
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center mt-6 mb-10">
          <Text></Text>
          <Text className="text-3xl color-white font-pextrabold">Transactions</Text>
          <Text></Text>
        </View>
      
      <View className='flex-1 justify-center items-center'>
        <Text className='color-red-600'>Error: {error.message}</Text>
      </View>
      </SafeAreaView>
    );

  }
 

  return (
    <SafeAreaView className="flex-1 bg-primary p-4">
      <StatusBar barStyle="light-content" />
      <View className="flex-row justify-between items-center mt-6 mb-10">
        <Text></Text>
        <Text className="text-3xl color-white font-pextrabold">Transactions</Text>
        <Link href="/printer" asChild>
          <TouchableOpacity>
            <Ionicons name="print-outline" size={28} color="white" />
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={paginatedTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.transaction_id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View className="flex-row justify-between mt-6 mb-4">
        <Button
          color="#FF9C01"
          title="Previous"
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Text className="text-lg font-semibold color-white">Page {currentPage}</Text>
        <Button
          color="#FF9C01"
          title="Next"
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * pageSize >= transactions.length}
        />
      </View>
    </SafeAreaView>
  );
};

// export default TransactionsListScreen;
