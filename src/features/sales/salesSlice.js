import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  categories: [],
  categoryLoading: false,
  httpStatus: null,
  message: null
};



export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const selectCategoryState = (state) => state.categories;
export default categorySlice.reducer;
