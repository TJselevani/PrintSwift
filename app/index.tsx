import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import { formatDateTime, formatTime, timeAgo } from '@/constants/time';
import LoadingWidget from '@/components/Loader';
import SafeAreaWithStatusBar from '@/components/SafeAreaView';
import AppBar from '@/components/AppBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Transaction from '@/constants/Transaction.model';
import { useTheme } from '@/components/MyThemeProvider';
import { darkTheme, lightTheme } from '@/constants/themes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionsListScreen />
    </QueryClientProvider>
  );
}

const TransactionsListScreen: React.FC = () => {
  const { transactions, isLoading, error } = useFetchTransactions();
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Link href={`/transaction/${item.transaction_id}`} asChild>
      <TouchableOpacity accessible accessibilityLabel={`Transaction from ${timeAgo(item.created_at)} amounting to $${item.amount}`}>
        <View className="bg-gray px-4 py-6 pb-8 rounded-lg shadow-lg mb-4 border w-full">
          <Text className="text-lg color-white font-pextrabold">{formatDateTime(item.created_at)}</Text>
          <Text className="text-lg color-white font-pbold">{formatTime(item.created_at)}</Text>
          <Text className="text-lg color-white font-pblack">{timeAgo(item.created_at)}</Text>
          <Text className="text-gray-700 font-pmedium">Amount: ${item.amount}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (isLoading) {
    return (
      <SafeAreaWithStatusBar >
        <AppBar title="Transactions" />
        <LoadingWidget />
      </SafeAreaWithStatusBar>
    );
  }

  if (error) {
    return (
      <SafeAreaWithStatusBar >
        <AppBar title="Transactions" />
        <View className="flex-1 justify-center items-center">
          <Text className="color-red-600">Error: {error.message}</Text>
        </View>
      </SafeAreaWithStatusBar>
    );
  }

  return (
    <SafeAreaWithStatusBar >
      <AppBar
        title="Transactions"
        rowItems={
          <Link href="/printer" asChild>
            <TouchableOpacity accessible accessibilityLabel="Go to printer settings">
              <Ionicons name="print-outline" size={28} color={theme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
          </Link>
        }
      />
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.transaction_id}
        onEndReached={() => {}}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#FF9C01" /> : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaWithStatusBar>
  );
};
