import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBusinessCategoryAPI } from "../../services/businessCategory";

const initialState = {
  businessCategories: [],
  businessCategoriesLoading: false,
  businessCategoriesHttpStatus: null,
  businessCategoriesMessage: null,
};

export const getAllBusinessCategory = createAsyncThunk(
  "get/getAllBusinessCategory",
  async () => {
    const data = await getAllBusinessCategoryAPI();
    return data;
  }
);

export const businessCategorySlice = createSlice({
    name: "businessCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllBusinessCategory.pending, (state) => {
          state.businessCategoriesLoading = true;
        })
        .addCase(getAllBusinessCategory.fulfilled, (state, action) => {
          state.businessCategoriesLoading = false;
          state.businessCategories = [action.payload.content];
          state.businessCategoriesHttpStatus = action.payload.httpStatus
        });
    },
  });
  
  export const selectBusinessCategoryState = (state) => state.businessCategories;
  export default businessCategorySlice.reducer;
  