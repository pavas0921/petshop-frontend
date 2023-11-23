import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductAPI, getAllProductsAPI } from "../../services/producto";

const initialState = {
  productos: {},
  loading: false,
};

export const getProducts = createAsyncThunk("get/products", async () => {
  const data = await getAllProductsAPI();
  return data;
});

export const createProduct = createAsyncThunk(
  "get/createProduct",
  async (body) => {
    const data = await createProductAPI(body);
    return data;
  }
);

export const ProductoSlice = createSlice({
  name: "producto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      });
  },
});

export const selectProductoState = (state) => state.productos;
export default ProductoSlice.reducer;
