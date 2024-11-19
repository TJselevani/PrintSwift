import React, { useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import Transaction from '@/constants/Transaction.model';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { formatDateTime, formatTime, timeAgo } from '@/constants/time';
import LoadingWidget from '@/components/Loader';
import SafeAreaWithStatusBar from '@/components/SafeAreaView';
import AppBar from '@/components/AppBar';
import { useTheme } from '@/components/MyThemeProvider';
import CircularAvatar from '@/components/CircularAvatar';
import BouncingCirclesLoader from '@/components/BouncingCirclesLoader';

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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const { theme } = useTheme();

  const containerStyle =
    theme === 'dark'
      ? 'bg-containerDarkBackground '
      : 'bg-containerLightBackground';

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Link href={`/transaction/${item.transaction_id}`} asChild>
      <TouchableOpacity className="w-full">
        <View
          className={`${containerStyle} px-1 py-1 mb-5 flex-row w-full rounded-2xl`}
        >
          {/* Circular Avatar */}
          <View className="justify-center p-3">
            <CircularAvatar size={50} source={undefined} initials={undefined} />
          </View>

          {/* Transaction preview */}
          <View className="flex-1 px-2 py-4 rounded-lg ">
            <Text className="text-sm text-white font-extrabold">
              {formatDateTime(item.created_at)}
            </Text>
            <Text className="text-lg text-white font-bold">
              {formatTime(item.created_at)}
            </Text>
            <Text className="text-lg text-white font-black">
              {timeAgo(item.created_at)}
            </Text>
          </View>

          {/* Amount */}
          <View className="w-1/6 justify-center">
            <Text className="text-green p-3 font-medium">${item.amount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (isLoading) {
    return (
      <SafeAreaWithStatusBar>
        <AppBar title="Transactions" />
        <BouncingCirclesLoader />
      </SafeAreaWithStatusBar>
    );
  }

  if (error) {
    return (
      <SafeAreaWithStatusBar>
        <AppBar title="Transactions" />
        <View className="flex-1 justify-center items-center">
          <Text className="color-red-600">Error: {error.message}</Text>
        </View>
      </SafeAreaWithStatusBar>
    );
  }

  return (
    <SafeAreaWithStatusBar>
      <AppBar
        title="Transactions"
        rowItems={
          <Link href="/printer" asChild>
            <TouchableOpacity
              accessible
              accessibilityLabel="Go to printer settings"
            >
              <Ionicons
                name="print-outline"
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </Link>
        }
      />

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
        <Text className="text-lg font-semibold color-white">
          Page {currentPage}
        </Text>
        <Button
          color="#FF9C01"
          title="Next"
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * pageSize >= transactions.length}
        />
      </View>
    </SafeAreaWithStatusBar>
  );
};

// export default TransactionsListScreen;
