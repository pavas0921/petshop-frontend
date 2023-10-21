import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserAPI } from "../../services/user";

const initialState = {
  users: {},
  loading: false,
};

export const createUser = createAsyncThunk("get/createUser", async (body) => {
  const data = await createUserAPI(body);
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export const selectUserState = (state) => state.users;
export default userSlice.reducer;
