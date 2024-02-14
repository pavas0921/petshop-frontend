import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCustomerAPI, getCustomerByCompanyAPI, updateCustomerByIdAPI
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

  export const createCustomer = createAsyncThunk(
    "post/createCustomer",
    async (body) => {
      const data = await createCustomerAPI(body);
      return data;
    }
  );

  export const updateCustomerById = createAsyncThunk(
    "patch/updateCustomerById",
    async ({ body, _id }) => {
      const data = await updateCustomerByIdAPI(body, _id);
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
          state.customerLoading = true;
        })
        .addCase(getCustomersByCompany.fulfilled, (state, action) => {
          state.customerLoading = false;
          state.customerHttpStatus = action.payload.httpStatus;
          state.customerStatus = action.payload.status;
          state.customers = action.payload.content;
        })
        .addCase(createCustomer.pending, (state) => {
          state.customerLoading = true;
        })
        .addCase(createCustomer.fulfilled, (state, action) => {
          state.customerLoading = false;
          if (
            action.payload.httpStatus === 201 &&
            action.payload.status === "success"
          ) {
            state.customerHttpStatus = action.payload.httpStatus;
            state.customerStatus = action.payload.status;
            state.customers.push(action.payload.content);
            state.customerMessage = action.payload.message;
            state.customerFlag =  true;
          }
        })
        .addCase(updateCustomerById.pending, (state) => {
          state.customerLoading = true;
        })
        .addCase(updateCustomerById.fulfilled, (state, action) => {
          state.customerLoading = false;
          if (
            action.payload.httpStatus === 200 &&
            action.payload.status === "success"
          ) {
            const index = state.customers.findIndex(
              (item) => item._id === action.payload.updated._id
            );
            if (index !== -1) {
              state.customerHttpStatus = action.payload.httpStatus;
              state.customerStatus = action.payload.status;
              state.customerMessage = action.payload.message;
              state.customers[index] = action.payload.updated;
              state.customerFlag = true;
            }
          }
        });
     },
  });

export const selectCustomerState = (state) => state.customers;
export default CustomerSlice.reducer;