import { CURRENCIES } from "../consts";

export interface ITransaction   {
    transactionId: string,
    categoryId: string,
    currencyCode: CURRENCIES,
    payee: string,
    comment: string,
    userId: string,
    amount: number,
    walletId: string,
    date: Date, // stringified date
    day: string, 
    type: string
    // paymentDistributionCurrent?: PaymentDistribution[]
    // paymentDistributionDesired?: PaymentDistribution[]
  }

  export interface ITransactionGroup {
    groupBy: string,
    amountTotal: number,
    transactions: ITransaction[]
  }