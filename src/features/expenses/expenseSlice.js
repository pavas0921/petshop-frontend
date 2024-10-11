import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createExpenseAPI } from '../../services/expenses'

const initialState = {
  expenses: [],
  expensesLoading: false,
  expensesMessage: null,
  expensesHttpStatus: null,
  expensesStatus: null,
  expensesFlag: false,
}

export const createExpense = createAsyncThunk('createExpense', async (body) => {
  const data = await createExpenseAPI(body)
  return data
})

export const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.expensesLoading = true
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expensesLoading = false
        if (
          action.payload.httpStatus === 201 &&
          action.payload.status === 'success'
        ) {
          state.expenses.push(action.payload.expenses)
          state.expensesHttpStatus = action.payload.httpStatus
          state.expensesStatus = action.payload.status
          state.expensesMessage = action.payload.message
          state.expensesFlag = true
        }
      })
  },
})

export const selectExpenseState = (state) => state.expenses
export default ExpenseSlice.reducer
