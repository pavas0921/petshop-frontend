import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createUserAPI,
  getAllUsersAPI,
  getUsersByCompanyAPI,
  updateUserStatusAPI,
} from '../../services/user'

const initialState = {
  users: [],
  status: null,
  error: null,
  message: null,
  httpStatus: null,
  userLoading: false,
}

export const createUser = createAsyncThunk('post/createUser', async (body) => {
  const data = await createUserAPI(body)
  return data
})

export const getAllUsers = createAsyncThunk('get/getAllUsers', async () => {
  const data = await getAllUsersAPI()
  return data
})

export const updateUserStatus = createAsyncThunk(
  'patch/updateUserStatus',
  async ({ _id, currentStatus }) => {
    const data = await updateUserStatusAPI(_id, currentStatus)
    return data
  }
)

export const getUsersByCompany = createAsyncThunk(
  'get/getUsersByCompany',
  async (idCompany) => {
    const data = await getUsersByCompanyAPI(idCompany)
    return data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearHttpStatus: (state) => {
      state.status = null
      state.error = null
      state.httpStatus = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.userLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userLoading = false
        if (
          action.payload.status === 'success' &&
          action.payload.httpStatus === 201
        ) {
          state.users.push(action.payload.content)
          ;(state.httpStatus = action.payload.httpStatus),
            (state.status = action.payload.status),
            (state.message = action.payload.message)
        }
      })
      .addCase(getAllUsers.pending, (state) => {
        state.userLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userLoading = false
        state.users = action.payload.content
        ;(state.httpStatus = action.payload.httpStatus),
          (state.status = action.payload.status),
          (state.message = action.payload.message)
      })
      .addCase(getUsersByCompany.pending, (state) => {
        state.userLoading = true
      })
      .addCase(getUsersByCompany.fulfilled, (state, action) => {
        state.userLoading = false
        state.users = action.payload.content
        state.httpStatus = action.payload.httpStatus
        state.status = action.payload.status
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.userLoading = true
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.userLoading = false
        state.httpStatus = action.payload.httpStatus
        state.status = action.payload.status
        const index = state.users.findIndex(
          (item) => item._id === action.payload.updated._id
        )
        if (index !== -1) {
          state.users[index].status = action.payload.updated.status
        }
      })
  },
})

export const selectUserState = (state) => state.users
export default userSlice.reducer
