import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getSupplierByCompanyAPI,
  createSupplierAPI,
  updateSupplierByIdAPI,
} from '../../services/supplier'

const initialState = {
  suppliers: [],
  supplierLoading: false,
  httpStatus: null,
  supplierStatus: null,
  message: null,
  supplierFlag: false,
}

export const getSupplierByCompany = createAsyncThunk(
  'get/supplier',
  async (idCompany) => {
    const data = await getSupplierByCompanyAPI(idCompany)
    return data
  }
)

export const createSupplier = createAsyncThunk(
  'post/createSupplierAPI',
  async (body) => {
    const data = await createSupplierAPI(body)
    return data
  }
)

export const updateSupplierById = createAsyncThunk(
  'put/updateCustomerById',
  async ({ body, _id }) => {
    const data = await updateSupplierByIdAPI(body, _id)
    return data
  }
)

export const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    clearState: (state) => {
      state.httpStatus = null
      state.message = null
      state.supplierFlag = false
      state.supplierStatus = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupplierByCompany.pending, (state) => {
        state.supplierLoading = true
      })
      .addCase(getSupplierByCompany.fulfilled, (state, action) => {
        state.supplierLoading = false
        state.suppliers = action.payload.content
        state.httpStatus = action.payload.status
      })
      .addCase(createSupplier.pending, (state) => {
        state.supplierLoading = true
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.supplierLoading = false
        if (
          action.payload.httpStatus === 201 &&
          action.payload.status === 'success'
        ) {
          state.httpStatus = action.payload.httpStatus
          state.supplierStatus = action.payload.status
          state.message = action.payload.message
          state.suppliers.push(action.payload.content)
          state.supplierFlag = true
        }
      })
      .addCase(updateSupplierById.pending, (state, action) => {
        state.supplierLoading = true
      })
      .addCase(updateSupplierById.fulfilled, (state, action) => {
        state.supplierLoading = false
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === 'success'
        ) {
          const index = state.suppliers.findIndex(
            (item) => item._id === action.payload.updated._id
          )
          if (index !== -1) {
            state.httpStatus = action.payload.httpStatus
            state.supplierStatus = action.payload.status
            state.message = action.payload.message
            state.suppliers[index] = action.payload.updated
            state.supplierFlag = true
          }
        }
      })
  },
})

export const { clearState } = supplierSlice.actions
export const selectSupplierState = (state) => state.suppliers
export default supplierSlice.reducer
