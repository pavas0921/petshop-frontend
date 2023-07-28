import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAnimalProductAPI } from "../../services/animalProduct";

const initialState = {
  animalProduct: [],
  loading: false,
};

export const getAllAnimalProduct = createAsyncThunk(
  "animal/getAllAnimalProduct",
  async () => {
    const data = await getAllAnimalProductAPI();
    return data;
  }
);

export const animalProductSlice = createSlice({
  name: "animalProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnimalProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAnimalProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.animalProduct = action.payload;
      });
  },
});

export const selectAnimalProductState = (state) => state.animalProduct;
export default animalProductSlice.reducer;
