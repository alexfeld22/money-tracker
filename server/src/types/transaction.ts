import { CURRENCIES } from "../consts";

export interface ITransaction   {
    id: string,
    categoryId: string,
    currencyCode: CURRENCIES,
    payee: string,
    comment: string,
    userId: string,
    amount: number,
    walletId: string,
    date: string, // stringified date
    // paymentDistributionCurrent?: PaymentDistribution[]
    // paymentDistributionDesired?: PaymentDistribution[]
  }