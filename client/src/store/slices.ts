import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TransactionsGrouped, TransactionsSummaryPerPeriod, TransactionsSummaryPerPeriodByCategory } from '../types/transaction-type'

interface TransactionsState {
  data: TransactionsGrouped []
  summaryPerPeriod: TransactionsSummaryPerPeriod
  summaryPerPeriodbyCategory: TransactionsSummaryPerPeriodByCategory
  isDark: boolean
}

const initialState: TransactionsState = {
  data: [],
  summaryPerPeriod: {
    userId: '',
    periodTitle: '',
    incomes: [],
    outcomes: [],
    labels: []
  },
  summaryPerPeriodbyCategory: {
    userId: '',
    periodTitle: '',
    incomes: [],
    outcomes: [],
  },
  isDark: false
}

export const transactionsSlice = createSlice({
  name: 'transaction',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTransactionsData: (state: TransactionsState, action: PayloadAction<TransactionsGrouped[]>) => {
        state.data = action.payload;
    },
    setTransactionsSummaryPerPeriod: (state: TransactionsState, action: PayloadAction<TransactionsSummaryPerPeriod>) => {
      state.summaryPerPeriod = action.payload;
    },
    setTransactionsPerPeriodByCategory: (state: TransactionsState, action: PayloadAction<TransactionsSummaryPerPeriodByCategory>) => {
      state.summaryPerPeriodbyCategory = action.payload;
    },
    setTheme: (state: TransactionsState) => { 
        state.isDark = !state.isDark;
    }
  },
})

export const { setTransactionsData, setTransactionsSummaryPerPeriod, setTransactionsPerPeriodByCategory, setTheme } = transactionsSlice.actions

export default transactionsSlice.reducer