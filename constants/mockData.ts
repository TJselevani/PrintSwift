 // mockData.ts

import Transaction from "./Transaction.model";

  
export const transactions: Transaction[] = Array.from({ length: 30 }, (_, i) => new Transaction(
  `txn-${i + 1}`,
  `acc-${i + 1}`,
  (i + 1) * 100,
  `2024-11-${(i % 30) + 1}`
));
  

export const TransactionAPI = "https://infra.devskills.app/api/transaction-management/transactions";