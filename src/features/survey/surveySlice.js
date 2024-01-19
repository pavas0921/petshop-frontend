import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerSurveyAPI, getAllSurveyAPI } from "../../services/survey";

const initialState = {
  surveys: [],
  surveysLoading: false,
  httpStatus: null,
  message: null,
  status: null,
  flag: false
};

export const registerSurvey = createAsyncThunk("post/registerSurvey", async (body) => {
  const data = await registerSurveyAPI(body);
  return data;
});

export const getAllSurvey = createAsyncThunk("get/registerSurvey", async () => {
    const data = await getAllSurveyAPI();
    return data;
  });

export const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    clearHttpStatus: (state) =>{
        state.status = null
        state.error = null
        state.httpStatus = null
        state.message = null
      },
      clearAll: (state) =>{
        state.surveys = [],
        state.error = null
        state.httpStatus = null
        state.message = null
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSurvey.pending, (state) => {
        state.surveysLoading = true;
      })
      .addCase(registerSurvey.fulfilled, (state, action) => {
        state.surveysLoading = false;
        state.surveys = action.payload.content;
        state.httpStatus = action.payload.httpStatus
        state.status = action.payload.status
        state.message = "¡Registro completado con éxito!"
        state.flag = true
      })
      .addCase(getAllSurvey.pending, (state) => {
        state.surveysLoading = true;
      })
      .addCase(getAllSurvey.fulfilled, (state, action) => {
        state.surveysLoading = false;
        state.surveys = action.payload.content;
        state.httpStatus = action.payload.httpStatus
        state.status = action.payload.status
      });
  },
});

export const { clearHttpStatus, clearAll } = surveySlice.actions;
export const selectSurveyState = (state) => state.surveys;
export default surveySlice.reducer;
