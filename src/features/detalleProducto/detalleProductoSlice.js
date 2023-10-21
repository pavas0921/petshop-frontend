import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDetalleProductoAPI,
  getAllDetalleProductoAPI,
  getDetalleByIdProductoAPI,
} from "../../services/detalleProducto";

const initialState = {
  detalleProductos: {},
  loading: false,
};

export const getDetalleByProductId = createAsyncThunk(
  "get/getDetalleByProductId",
  async (body) => {
    const data = await getDetalleByIdProductoAPI(body);
    return data;
  }
);

export const createDetalleProducto = createAsyncThunk(
  "create/createDetalleProduct",
  async (body) => {
    console.log("***********");
    const data = await createDetalleProductoAPI(body);
    return data;
  }
);

export const DetalleProductoSlice = createSlice({
  name: "detalleProducto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetalleByProductId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetalleByProductId.fulfilled, (state, action) => {
        state.loading = true;
        state.detalleProductos = action.payload;
      })
      .addCase(createDetalleProducto.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDetalleProducto.fulfilled, (state, action) => {
        state.loading = true;
        state.detalleProductos = action.payload;
      });
  },
});

export const selectDetalleProductoState = (state) => state.detalleProductos;
export default DetalleProductoSlice.reducer;
