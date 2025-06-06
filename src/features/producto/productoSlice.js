import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProductAPI,
  getAllProductsAPI,
  getProductsByCompanyAPI,
  disableProductByIdAPI,
  updateProductByIdAPI
} from "../../services/producto";

const initialState = {
  products: [],
  productsLoading: false,
  productMessage: null,
  productHttpStatus: null,
  productStatus: null,
  productFlag: false
};

export const getProducts = createAsyncThunk("get/products", async (companyId) => {
  const data = await getAllProductsAPI(companyId);
  return data;
});

export const getProductsByCompany = createAsyncThunk(
  "get/productsByCompany",
  async (companyId) => {
    const data = await getProductsByCompanyAPI(companyId);
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "get/createProduct",
  async (body) => {
    const data = await createProductAPI(body);
    return data;
  }
);

export const disableProductById = createAsyncThunk(
  "delete/disableProductById",
  async ({ body, _id }) => {
    
    const data = await disableProductByIdAPI(body, _id);
    return data;
  }
);

export const updateProductById = createAsyncThunk(
  "patch/updateProductById",
  async ({ body, _id }) => {
    const data = await updateProductByIdAPI(body, _id);
    return data;
  }
);

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.productStatus = null;
      state.productHttpStatus = null;
      state.productMessage = null;
      state.productFlag = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productHttpStatus = action.payload.httpStatus;
        state.productStatus = action.payload.status;
        state.products = action.payload.content;
      })
      .addCase(getProductsByCompany.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getProductsByCompany.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productHttpStatus = action.payload.httpStatus;
        state.productStatus = action.payload.status;
        state.products = action.payload.content;
      })
      .addCase(createProduct.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productsLoading = false;
        if (
          action.payload.httpStatus === 201 &&
          action.payload.status === "success"
        ) {
          state.productHttpStatus = action.payload.httpStatus;
          state.productStatus = action.payload.status;
          state.products.push(action.payload.producto);
          state.productMessage = action.payload.message;
          state.productFlag =  true;
        }
      })
      .addCase(disableProductById.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(disableProductById.fulfilled, (state, action) => {
        state.productsLoading = false;
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === "success"
        ) {
          
          const index = state.products.findIndex(
            (item) => item._id === action.payload.updated._id
          );
          
          if (index !== -1) {
            console.log("action", action.payload)
            state.productHttpStatus = action.payload.httpStatus;
            state.productStatus = action.payload.status;
            state.productMessage = action.payload.message;
            state.products[index] = action.payload.updated;
            state.productFlag = true;
          }
        }
      })
      .addCase(updateProductById.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.productsLoading = false;
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === "success"
        ) {
          const index = state.products.findIndex(
            (item) => item._id === action.payload.updated._id
          );
          if (index !== -1) {
            console.log(state.products)
            state.productHttpStatus = action.payload.httpStatus;
            state.productStatus = action.payload.status;
            state.productMessage = action.payload.message;
            state.products[index] = action.payload.updated;
            state.productFlag = true;
          }
        }
      });
      
  },
});

export const { clearAlert } = ProductSlice.actions;
export const selectProductState = (state) => state.products;
export default ProductSlice.reducer;
