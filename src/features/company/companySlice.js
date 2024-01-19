import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCompaniesAPI } from "../../services/company";

const initialState = {
  companies: [],
  companyLoading: false,
  httpStatus: null
};

export const getAllCompanies = createAsyncThunk("get/company", async () => {
  const data = await getAllCompaniesAPI();
  return data;
});

export const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.companyLoading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.companyLoading = false;
        state.companies = action.payload.company
        state.httpStatus = action.payload.httpStatus
      });
  },
});

export const selectCompnayState = (state) => state.companies;
export default companySlice.reducer;
