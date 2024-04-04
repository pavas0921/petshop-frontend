import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCategoryAPI,
  getAllCategoryByIdAPI,
  createCategoryAPI,
} from "../../services/categoria";
import { Category } from "@mui/icons-material";

const initialState = {
  categories: [],
  categoryLoading: false,
  httpStatus: null,
  message: null,
  categoryFlag: false,
};

export const getCategory = createAsyncThunk("get/category", async () => {
  const data = await getAllCategoryAPI();
  return data;
});

export const getAllCategoryById = createAsyncThunk(
  "get/getAllCategoryById",
  async (idCompany) => {
    const data = await getAllCategoryByIdAPI(idCompany);
    return data;
  }
);

export const createCategory = createAsyncThunk(
  "post/createCategory",
  async (body) => {
    const data = await createCategoryAPI(body);
    return data;
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearState: (state) => {
      state.httpStatus = null;
      state.message = null;
      state.categoryFlag = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload.content;
        state.httpStatus = action.payload.httpStatus;
      })
      .addCase(getAllCategoryById.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(getAllCategoryById.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload.content;
        state.httpStatus = action.payload.httpStatus;
      })
      .addCase(createCategory.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        if (action.payload.httpStatus === 201) {
          state.categories.push(action.payload.category);
          state.httpStatus = action.payload.httpStatus;
          state.categoryFlag = true;
          state.message = action.payload.message;
        }
      });
  },
});

export const { clearState } = categorySlice.actions;
export const selectCategoryState = (state) => state.categories;
export default categorySlice.reducer;
