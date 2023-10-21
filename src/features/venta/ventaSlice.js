import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllVentasAPI } from "../../services/ventas";

const initialState = {
  ventas: {},
  loading: false,
};

export const getVentas = createAsyncThunk("get/ventas", async () => {
  const data = await getAllVentasAPI();
  return data;
});

/*
export const createProduct = createAsyncThunk(
  "get/createProduct",
  async (body) => {
    const data = await createProductAPI(body);
    return data;
  }
);
*/

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
        state.loading = true;
        state.ventas = action.payload;
      });
  },
});

export const selectVentasState = (state) => state.ventas;
export default VentaSlice.reducer;
