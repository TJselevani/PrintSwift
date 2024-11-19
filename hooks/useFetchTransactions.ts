import { useQuery } from '@tanstack/react-query';
import Transaction from '@/constants/Transaction.model';
import { TransactionAPI } from '@/constants/mockData';

const fetchTransactions = async () => {
  const response = await fetch(TransactionAPI);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useFetchTransactions = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    // Add stale time to control refetching behavior (optional)
    staleTime: Infinity,
  });

  const transactions = data
    ? data.map((item: any) => Transaction.fromJson(item))
    : [];

  return { transactions, isLoading, error, refetch }; // Return refetch function
};

export default useFetchTransactions;
