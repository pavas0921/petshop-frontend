import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createVentaAPI,
  getAllVentasByCompanyAPI,
  getVentasByDateRangeAPI,
  getDailySalesCountAPI,
} from '../../services/ventas'

const initialState = {
  ventas: [],
  salesHttpStatus: null,
  salesStatus: null,
  salesMessage: null,
  salesFlag: false,
  loading: false,
  totalDailySales: null,
  saleDetail: [],
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
  reducers: {
    clearState: (state) => {
      state.salesHttpStatus = null
      state.salesStatus = null
      state.salesMessage = null
      state.salesFlag = false
      console.log('limpiar')
    },
    clearSaleDetail: (state) => {
      state.saleDetail = []
    },

    addSelectedProduct: (state, action) => {
      state.saleDetail.push(action.payload) // Agregar un nuevo producto seleccionado al array
    },
    updateProductQty: (state, action) => {
      const index = state.saleDetail.findIndex(
        (item) => item._id === action.payload._id
      )
      if (index >= 0) {
        state.saleDetail[index] = action.payload
      }
    },
    removeSelectedProduct: (state, action) => {
      const index = state.saleDetail.findIndex(
        (item) => item._id === action.payload._id
      )
      if (index >= 0) {
        state.saleDetail.splice(index, 1)
      }
    },
    setMessage: (state, action) => {
      state.salesStatus = action.payload.error
      state.salesMessage = action.payload.message
      state.salesFlag = action.payload.flag
    },
  },
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
          sessionStorage.setItem("customer", JSON.stringify(action.payload.customer))
          state.ventas = action.payload.venta
          state.salesHttpStatus = action.payload.httpStatus
          state.salesMessage = action.payload.message
          state.salesStatus = action.payload.status
          state.salesFlag = true
          state.saleDetail = []
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
          state.totalDailySales = action.payload.content
          state.status = action.payload.status
        }
      })
  },
})

export const {
  clearState,
  addSelectedProduct,
  updateProductQty,
  setMessage,
  removeSelectedProduct,
  clearSaleDetail,
} = VentaSlice.actions
export const selectVentasState = (state) => state.ventas
export default VentaSlice.reducer
