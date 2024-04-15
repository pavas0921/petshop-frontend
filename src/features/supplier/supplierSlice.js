import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllSupplierAPI, createSupplierAPI } from '../../services/supplier'

const initialState = {
  suppliers: [],
  supplierLoading: false,
  httpStatus: null,
  status: null,
  message: null,
}

export const getAllSupplier = createAsyncThunk('get/supplier', async () => {
  const data = await getAllSupplierAPI()
  return data
})

export const createSupplier = createAsyncThunk(
  'post/createSupplierAPI',
  async (body) => {
    const data = await createSupplierAPI(body)
    return data
  }
)

export const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSupplier.pending, (state) => {
        state.supplierLoading = true
      })
      .addCase(getAllSupplier.fulfilled, (state, action) => {
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
          state.status = action.payload.status
          state.message = action.payload.message
          state.suppliers.push(action.payload.content)
        }
      })
  },
})

export const selectSupplierState = (state) => state.suppliers
export default supplierSlice.reducer
