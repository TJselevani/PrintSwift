import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
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
  const { transactions, isLoading, error, refetch } = useFetchTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // State to manage visibility of navigation buttons
  const [showButtons, setShowButtons] = useState(false);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const { theme } = useTheme();

  const containerStyle =
    theme === 'dark'
      ? 'bg-containerDarkBackground'
      : 'bg-containerLightBackground';

  const textStyle = theme === 'dark' ? 'text-white' : 'color-black';

  const renderTransaction = ({ item }: { item: Transaction }) => (
    // Link href={`/transaction/${item.transaction_id}`} asChild>
    <>
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
            <Text className={`text-sm ${textStyle} font-extrabold`}>
              {formatDateTime(item.created_at)}
            </Text>
            <Text className={`text-lg ${textStyle} font font-bold`}>
              {formatTime(item.created_at)}
            </Text>
            <Text className={`text-lg ${textStyle} font font-black`}>
              {timeAgo(item.created_at)}
            </Text>
          </View>

          {/* Amount */}
          <View className="w-1/6 justify-center">
            <Text className="text-green p-3 font-medium">${item.amount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
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

      {/* FlatList with Refresh Control */}
      <FlatList
        data={paginatedTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.transaction_id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding for buttons
        refreshControl={
          // Adding pull-to-refresh functionality
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        onScroll={(event) => {
          // Check if scrolled to bottom
          const isAtBottom =
            event.nativeEvent.contentOffset.y +
              event.nativeEvent.layoutMeasurement.height >=
            event.nativeEvent.contentSize.height - 1;

          // Show or hide buttons based on scroll position
          setShowButtons(isAtBottom);
        }}
      />

      {/* Conditional Rendering of Navigation Buttons */}
      {showButtons && (
        <View style={styles.buttonContainer}>
          {/* Previous Button */}
          <TouchableOpacity
            style={styles.circularButton}
            onPress={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Ionicons name="remove" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Page Indicator */}
          <Text style={styles.pageIndicator}>Page {currentPage}</Text>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.circularButton}
            onPress={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * pageSize >= transactions.length}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaWithStatusBar>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pageIndicator: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#FFFFFF', // Adjust based on your theme
  },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it circular
    backgroundColor: '#FF9C01', // Button color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
