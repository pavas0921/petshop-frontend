import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserAPI } from "../../services/user";

const initialState = {
  users: {},
  status : null,
  error : null,
  message : null,
  httpStatus : null,
  userLoading: false,
};

export const createUser = createAsyncThunk("post/createUser", async (body) => {
  const data = await createUserAPI(body);
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearHttpStatus: (state) =>{
      state.status = null
      state.error = null
      state.httpStatus = null
      state.message = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload.user;
        state.httpStatus = action.payload.httpStatus,
        state.status = action.payload.status,
        state.message = action.payload.message
      });
  },
});

export const selectUserState = (state) => state.users;
export default userSlice.reducer;
