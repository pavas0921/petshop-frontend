import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategoryAPI, getAllCategoryByIdAPI } from "../../services/categoria";

const initialState = {
  categories: [],
  categoryLoading: false,
  httpStatus: null,
  message: null
};

export const getCategory = createAsyncThunk("get/category", async () => {
  const data = await getAllCategoryAPI();
  return data;
});

export const getAllCategoryById = createAsyncThunk("get/getAllCategoryById", async (idCompany) => {
  const data = await getAllCategoryByIdAPI(idCompany);
  return data;
});

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload.content;
        state.httpStatus = action.payload.httpStatus
      })
      .addCase(getAllCategoryById.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(getAllCategoryById.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload.content;
        state.httpStatus = action.payload.httpStatus
      });
  },
});

export const selectCategoryState = (state) => state.categories;
export default categorySlice.reducer;
