import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createVentaAPI,
  getAllVentasByCompanyAPI,
  getVentasByDateRangeAPI,
  getDailySalesCountAPI,
} from '../../services/ventas'

const initialState = {
  ventas: [],
  httpStatus: null,
  status: null,
  message: null,
  salesFlag: false,
  loading: false,
}

export const getAllVentasByCompany = createAsyncThunk(
  'get/getAllVentasByCompany',
  async () => {
    const data = await getAllVentasByCompanyAPI()
    return data
  }
)

export const getVentasByDateRange = createAsyncThunk(
  'post/getVentasByDateRange',
  async (body) => {
    const data = await getVentasByDateRangeAPI(body)
    return data
  }
)

export const createVenta = createAsyncThunk(
  'post/createVenta',
  async (body) => {
    const data = await createVentaAPI(body)
    return data
  }
)

export const getDailySalesCount = createAsyncThunk(
  'post/getDailySalesCount',
  async (body) => {
    const data = await getDailySalesCountAPI(body)
    return data
  }
)

export const VentaSlice = createSlice({
  name: 'venta',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVentasByCompany.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllVentasByCompany.fulfilled, (state, action) => {
        state.loading = false
        state.httpStatus = action.payload.httpStatus
        state.ventas = action.payload.content
        state.status = action.payload.status
        state.message = action.payload.message
      })
      .addCase(getVentasByDateRange.pending, (state) => {
        state.loading = true
      })
      .addCase(getVentasByDateRange.fulfilled, (state, action) => {
        state.loading = false
        state.httpStatus = action.payload.httpStatus
        state.ventas = action.payload.content
        state.status = action.payload.status
        state.message = action.payload.message
      })
      .addCase(createVenta.pending, (state) => {
        state.loading = true
      })
      .addCase(createVenta.fulfilled, (state, action) => {
        state.loading = false
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === 'success'
        ) {
          state.ventas = action.payload.venta
          ;(state.httpStatus = action.payload.httpStatus),
            (state.message = action.payload.message),
            (state.status = action.payload.status)
          state.flag = true
        }
      })
      .addCase(getDailySalesCount.pending, (state) => {
        state.loading = true
      })
      .addCase(getDailySalesCount.fulfilled, (state, action) => {
        state.loading = false
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === 'success'
        ) {
          state.httpStatus = action.payload.httpStatus
          state.ventas = action.payload.content
          state.status = action.payload.status
        }
      })
  },
})

export const selectVentasState = (state) => state.ventas
export default VentaSlice.reducer
