import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getExpensesByCompanyAPI } from '../../services/expensesCategory'

const initialState = {
  expensesCategories: [],
  expensesCategoriesLoading: false,
  expensesCategoriesMessage: null,
  expensesCategoriesHttpStatus: null,
  expensesCategoriesStatus: null,
  expensesCategoriesFlag: false,
}

export const getExpensesCategoriesByCompany = createAsyncThunk(
  'get/getExpensesCategoriesByComapny',
  async (companyId) => {
    const data = await getExpensesByCompanyAPI(companyId)
    return data
  }
)

export const expensesCategorySlice = createSlice({
  name: 'expensesCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpensesCategoriesByCompany.pending, (state) => {
        state.expensesCategoriesLoading = true
      })
      .addCase(getExpensesCategoriesByCompany.fulfilled, (state, action) => {
        state.expensesCategoriesLoading = false
        state.expensesCategoriesStatus = action.payload.status
        state.expensesCategoriesHttpStatus = action.payload.httpStatus
        state.expensesCategories = action.payload.content
      })
  },
})

export const selectExpensesCategory = (state) => state.expensesCategory
export default expensesCategorySlice.reducer
