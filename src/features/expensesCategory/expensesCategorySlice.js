import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getExpensesByCompanyAPI,
  createExpensesCategoryAPI,
} from '../../services/expensesCategory'

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

export const createExpensesCategory = createAsyncThunk(
  'post/createEspecie',
  async (body) => {
    const data = await createExpensesCategoryAPI(body)
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
      .addCase(createExpensesCategory.pending, (state) => {
        state.expensesCategoriesLoading = true
      })
      .addCase(createExpensesCategory.fulfilled, (state, action) => {
        state.expensesCategoriesLoading = false
        if (action.payload.httpStatus === 201) {
          state.expensesCategories.push(action.payload.category)
          state.expensesCategoriesHttpStatus = action.payload.httpStatus
          state.expensesCategoriesMessage = action.payload.message
          state.expensesCategoriesFlag = true
        }
      })
  },
})

export const selectExpensesCategory = (state) => state.expensesCategory
export default expensesCategorySlice.reducer
