import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createExpenseAPI,
  getExpensesByCompanyAPI,
} from '../../services/expenses'

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

export const getExpensesByCompany = createAsyncThunk(
  'get/getExpensesByCompany',
  async (idCompany) => {
    const data = await getExpensesByCompanyAPI(idCompany)
    return data
  }
)

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
          state.expenses.push(action.payload.content)
          state.expensesHttpStatus = action.payload.httpStatus
          state.expensesStatus = action.payload.status
          state.expensesMessage = action.payload.message
          state.expensesFlag = true
        }
      })
      .addCase(getExpensesByCompany.pending, (state) => {
        state.expensesLoading = true
      })
      .addCase(getExpensesByCompany.fulfilled, (state, action) => {
        state.expensesLoading = false
        state.expensesFlag = false
        if (action.payload.httpStatus === 204) {
          state.expenses = []
          state.expensesHttpStatus = action.payload.httpStatus
          state.expensesStatus = action.payload.status
        }
        if (action.payload.httpStatus === 200) {
          state.expenses = action.payload.content
          state.expensesHttpStatus = action.payload.httpStatus
          state.expensesStatus = action.payload.status
        }
      })
  },
})

export const selectExpenseState = (state) => state.expenses
export default ExpenseSlice.reducer
