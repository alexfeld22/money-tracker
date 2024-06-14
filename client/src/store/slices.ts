import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TransactionsDataType } from '../types/transaction-type'

interface TransactionsState {
  data: TransactionsDataType []
  isDark: boolean
}

const initialState: TransactionsState = {
  data: [],
  isDark: false
}

export const transactionsSlice = createSlice({
  name: 'transaction',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTransactionsData: (state: TransactionsState, action: PayloadAction<TransactionsDataType[]>) => {
        state.data = action.payload;
    },
    setTheme: (state: TransactionsState) => { 
        state.isDark = !state.isDark;
    }

  },
})

export const { setTransactionsData, setTheme } = transactionsSlice.actions

export default transactionsSlice.reducer