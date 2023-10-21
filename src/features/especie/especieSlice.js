import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEspeciesAPI } from "../../services/especie";

const initialState = {
  especies: [],
  loading: false,
};

export const getEspecies = createAsyncThunk("get/especie", async () => {
  const data = await getAllEspeciesAPI();
  return data;
});

export const especieSlice = createSlice({
  name: "especies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEspecies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEspecies.fulfilled, (state, action) => {
        state.loading = false;
        state.especies = action.payload;
      });
  },
});

export const selectEspecieState = (state) => state.especies;
export default especieSlice.reducer;
