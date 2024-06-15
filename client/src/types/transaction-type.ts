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

export type TransactionsPerPeriod = {
  period: string;
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

type TotalByPeriod = {
  month: string,
  totalAmount: number
}