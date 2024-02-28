import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createVentaAPI, getAllVentasAPI } from "../../services/ventas";

const initialState = {
  ventas: [],
  message: null, 
  httpStatus: null,
  status: null,
  loading: false,
  flag: false
};

export const getVentas = createAsyncThunk("get/ventas", async () => {
  const data = await getAllVentasAPI();
  return data;
});


export const createVenta = createAsyncThunk(
  "post/createVenta",
  async (body) => {
    const data = await createVentaAPI(body);
    return data;
  }
);


export const VentaSlice = createSlice({
  name: "venta",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVentas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVentas.fulfilled, (state, action) => {
        state.loading = false;
        state.ventas = action.payload;
      })
      .addCase(createVenta.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVenta.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.httpStatus === 200 && action.payload.status === "success"){
          state.ventas = action.payload.venta;
          state.httpStatus = action.payload.httpStatus,
          state.message = action.payload.message,
          state.status = action.payload.status
          state.flag = true
        }
      });
  },
});

export const selectVentasState = (state) => state.ventas;
export default VentaSlice.reducer;
