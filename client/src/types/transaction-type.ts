import { CURRENCIES } from "../consts";

export interface TransactionType {
  transactionId: string;
  categoryId: string;
  currencyCode: CURRENCIES;
  payee: string;
  comment: string;
  userId: string;
  amount: number;
  walletId: string;
  date: string; // stringified date
  day: string;
  // paymentDistributionCurrent?: PaymentDistribution[]
  // paymentDistributionDesired?: PaymentDistribution[]
}

export type TransactionsDataType = {
  period: string;
  amountTotal: number;
  transactions: TransactionType[];
};

export type Info = {
  count: number;
  pages?: number;
  next?: string;
  prev?: null;
};
