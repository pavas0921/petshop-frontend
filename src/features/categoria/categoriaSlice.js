import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategoryAPI } from "../../services/categoria";

const initialState = {
  categorias: [],
  loading: false,
};

export const getCategory = createAsyncThunk("get/category", async () => {
  const data = await getAllCategoryAPI();
  return data;
});

export const categorySlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      });
  },
});

export const selectCategoryState = (state) => state.categorias;
export default categorySlice.reducer;
