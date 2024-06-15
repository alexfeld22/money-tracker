import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TransactionsPerPeriod, TransactionsSummaryPerPeriod } from '../types/transaction-type'

interface TransactionsState {
  data: TransactionsPerPeriod []
  summaryPerPeriod: TransactionsSummaryPerPeriod
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
  isDark: false
}

export const transactionsSlice = createSlice({
  name: 'transaction',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTransactionsData: (state: TransactionsState, action: PayloadAction<TransactionsPerPeriod[]>) => {
        state.data = action.payload;
    },
    setTransactionsSummaryPerPeriod: (state: TransactionsState, action: PayloadAction<TransactionsSummaryPerPeriod>) => {
      state.summaryPerPeriod = action.payload;
  },
    setTheme: (state: TransactionsState) => { 
        state.isDark = !state.isDark;
    }
  },
})

export const { setTransactionsData, setTransactionsSummaryPerPeriod, setTheme } = transactionsSlice.actions

export default transactionsSlice.reducer