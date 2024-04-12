import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllSupplierAPI, createSupplierAPI } from '../../services/supplier'

const initialState = {
  suppliers: [],
  supplierLoading: false,
  httpStatus: null,
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
        console.log('Act', action.payload.content)
        state.suppliers = action.payload.content
        //state.suppliers = action.payload.content
        state.httpStatus = action.payload.status
      })
      .addCase(createSupplier.pending, (state) => {
        state.supplierLoading = true
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.supplierLoading = false
        state.supplierLoading = action.payload.suppliers
        state.httpStatus = action.payload.status
      })
  },
})

export const selectSupplierState = (state) => state.suppliers
export default supplierSlice.reducer
