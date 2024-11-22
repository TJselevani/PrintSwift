// app/transaction/Receipt.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface ReceiptProps {
  transaction: any; // Define a more specific type based on your transaction structure
}

const Receipt: React.FC<ReceiptProps> = ({ transaction }) => {
  return (
    <View className="w-full max-w-md bg-white mt-6 p-6">
      <Text className="text-center text-lg font-robotoMedium mb-2">
        Receipt
      </Text>
      <Text className="text-center text-gray-800 font-robotoLight">
        -------------------------------
      </Text>

      <Text className="font-robotoRegular text-center my-2">
        Transaction ID:
      </Text>
      <Text className="font-robotoRegular text-center text-lg">
        {transaction.transaction_id}
      </Text>

      <Text className="font-robotoRegular text-center my-2">Date:</Text>
      <Text className="font-robotoRegular text-center text-lg">
        {transaction.created_at}
      </Text>

      <Text className="font-robotoRegular text-center my-2">Account ID:</Text>
      <Text className="font-robotoRegular text-center text-lg">
        {transaction.account_id}
      </Text>

      <Text className="font-robotoRegular text-center my-2">Amount:</Text>
      <Text className="font-robotoRegular text-center text-lg">
        ${transaction.amount}
      </Text>

      <Text className="text-center text-gray-800 font-robotoLight mt-2">
        -------------------------------
      </Text>
      <Text className="text-center text-gray-600 font-robotoItalic mt-2">
        Thank you for your business!
      </Text>
    </View>
  );
};

export default Receipt;
