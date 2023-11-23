import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDetalleProductoAPI,
  getAllDetalleProductoAPI,
  getDetalleByIdProductoAPI,
  getDetalleProductByIdAPI,
} from "../../services/detalleProducto";

const initialState = {
  detalleProductos: {},
  loading: false,
};

export const getAllDetalleProducto = createAsyncThunk(
  "get/getAllDetalleProducto",
  async () => {
    const data = await getAllDetalleProductoAPI();
    return data;
  }
);

export const getDetalleProductoById = createAsyncThunk(
  "get/getDetalleProductoById",
  async (body) => {
    const data = await getDetalleProductByIdAPI(body);
    return data;
  }
);

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
      .addCase(getAllDetalleProducto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDetalleProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleProductos = action.payload;
      })
      .addCase(getDetalleByProductId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetalleByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleProductos = action.payload;
      })
      .addCase(createDetalleProducto.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDetalleProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleProductos = action.payload;
      })
      .addCase(getDetalleProductoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetalleProductoById.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleProductos = action.payload;
      });
  },
});

export const selectDetalleProductoState = (state) => state.detalleProductos;
export default DetalleProductoSlice.reducer;
