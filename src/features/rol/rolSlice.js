import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRolesAPI } from "../../services/rol";

const initialState = {
  roles: [],
  loading: false,
  httpStatus: null
};

export const getAllRoles = createAsyncThunk("get/rol", async () => {
  const data = await getAllRolesAPI();
  return data;
});

export const rolSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles
        state.httpStatus = action.payload.httpStatus
      });
  },
});

export const selectRolesState = (state) => state.roles;
export default rolSlice.reducer;
