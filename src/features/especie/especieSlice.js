import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllEspeciesAPI,
  getEspeciesByCompanyAPI,
  createEspecieAPI,
} from "../../services/especie";

const initialState = {
  especies: [],
  especiesLoading: false,
  httpStatus: null,
  message: null,
  specieFlag: false,
};

export const getEspecies = createAsyncThunk("get/especie", async () => {
  const data = await getAllEspeciesAPI();
  return data;
});

export const getEspeciesByCompany = createAsyncThunk(
  "get/getEspeciesByCompany",
  async (idCompany) => {
    const data = await getEspeciesByCompanyAPI(idCompany);
    return data;
  }
);

export const createEspecie = createAsyncThunk(
  "post/createEspecie",
  async (body) => {
    const data = await createEspecieAPI(body);
    return data;
  }
);

export const especieSlice = createSlice({
  name: "especies",
  initialState,
  reducers: {
    clearState: (state) => {
      state.httpStatus = null;
      state.message = null;
      state.categoryFlag = false;
      state.specieFlag = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEspecies.pending, (state) => {
        state.especiesLoading = true;
      })
      .addCase(getEspecies.fulfilled, (state, action) => {
        state.especiesLoading = false;
        state.especies = action.payload.content;
        state.httpStatus = action.payload.httpStatus;
      })
      .addCase(getEspeciesByCompany.pending, (state) => {
        state.especiesLoading = true;
      })
      .addCase(getEspeciesByCompany.fulfilled, (state, action) => {
        state.especiesLoading = false;
        state.especies = action.payload.content;
        state.httpStatus = action.payload.httpStatus;
      })
      .addCase(createEspecie.pending, (state) => {
        state.especiesLoading = true;
      })
      .addCase(createEspecie.fulfilled, (state, action) => {
        state.especiesLoading = false;
        if (action.payload.httpStatus === 201) {
          state.especies.push(action.payload.especie);
          state.httpStatus = action.payload.httpStatus;
          state.message = action.payload.message;
        }
      });
  },
});

export const { clearState } = especieSlice.actions;
export const selectEspecieState = (state) => state.especies;
export default especieSlice.reducer;
