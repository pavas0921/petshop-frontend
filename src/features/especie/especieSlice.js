import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEspeciesAPI } from "../../services/especie";

const initialState = {
  especies: [],
  especiesLoading: false,
  httpStatus: null,
  message: null
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
        state.especiesLoading = true;
      })
      .addCase(getEspecies.fulfilled, (state, action) => {
        state.especiesLoading = false;
        state.especies = action.payload.content;
        state.httpStatus =  action.payload.httpStatus
      });
  },
});

export const selectEspecieState = (state) => state.especies;
export default especieSlice.reducer;
