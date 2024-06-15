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

export type TransactionsGrouped = {
  groupBy: string;
  amountTotal: number;
  transactions: TransactionType[];
};

export type TransactionsSummaryPerPeriod = {
  userId: string,
  periodTitle: string,
  incomes: TotalByPeriod[],
  outcomes: TotalByPeriod[],
  labels: string[]
};

export type TransactionsSummaryPerPeriodByCategory = {
  userId: string,
  periodTitle: string,
  incomes: TransactionsGrouped[],
  outcomes: TransactionsGrouped[],
};

type TotalByPeriod = {
  month: string,
  totalAmount: number
}