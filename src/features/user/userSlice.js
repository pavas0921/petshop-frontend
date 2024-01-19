import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserAPI, getAllUsersAPI } from "../../services/user";

const initialState = {
  users: [],
  status: null,
  error: null,
  message: null,
  httpStatus: null,
  userLoading: false,
};

export const createUser = createAsyncThunk("post/createUser", async (body) => {
  const data = await createUserAPI(body);
  return data;
});

export const getAllUsers = createAsyncThunk("get/registerSurvey", async () => {
  const data = await getAllUsersAPI();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearHttpStatus: (state) => {
      state.status = null;
      state.error = null;
      state.httpStatus = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userLoading = false;
        if (
          action.payload.status === "success" &&
          action.payload.httpStatus === 201
        ) {
          state.users.push(action.payload.content);
          (state.httpStatus = action.payload.httpStatus),
            (state.status = action.payload.status),
            (state.message = action.payload.message);
        }
      })
      .addCase(getAllUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload.content;
        (state.httpStatus = action.payload.httpStatus),
          (state.status = action.payload.status),
          (state.message = action.payload.message);
      });
  },
});

export const selectUserState = (state) => state.users;
export default userSlice.reducer;
