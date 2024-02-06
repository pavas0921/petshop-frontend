import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCustomerAPI, getCustomerByCompanyAPI
} from "../../services/customer";

const initialState = {
    customers: [],
    customerLoading: false,
    customerMessage: null,
    customerHttpStatus: null,
    customerStatus: null,
    customerFlag: false
  };

  export const getCustomersByCompany = createAsyncThunk(
    "get/customersByCompany",
    async (companyId) => {
      const data = await getCustomerByCompanyAPI(companyId);
      return data;
    }
  );

  export const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      clearAlert: (state) => {
        state.customerStatus = null;
        state.customerHttpStatus = null;
        state.customerMessage = null;
        state.customerFlag = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCustomersByCompany.pending, (state) => {
          state.customersLoading = true;
        })
        .addCase(getCustomersByCompany.fulfilled, (state, action) => {
          state.customerLoading = false;
          state.customerHttpStatus = action.payload.httpStatus;
          state.customerStatus = action.payload.status;
          state.customers = action.payload.content;
        })
     },
  });

export const selectCustomerState = (state) => state.customers;
export default CustomerSlice.reducer;