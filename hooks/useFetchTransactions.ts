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
  const { isLoading, error, data } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const transactions = data ? data.map((item: any) => Transaction.fromJson(item)) : [];

  return { transactions, isLoading, error };
};

export default useFetchTransactions;
