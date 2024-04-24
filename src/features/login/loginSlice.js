import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginAPI } from '../../services/login'
import { act } from 'react-dom/test-utils'

const initialState = {
  loading: false,
  token: null,
  message: null,
  httpStatus: null,
  status: null,
  flag: false,
}

export const Login = createAsyncThunk('user/login', async (credentials) => {
  const data = await loginAPI(credentials)
  return data
})

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false
      state.httpStatus = null
      state.message = null
      state.status = null
      state.token = null
      state.flag = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false
        if (
          action.payload.httpStatus === 200 &&
          action.payload.status === 'success'
        ) {
          state.flag = false
          state.token = action.payload.token
        } else if (
          action.payload.httpStatus === 401 &&
          action.payload.status === 'error'
        ) {
          state.flag = true
          state.token = null
        }
        state.status = action.payload.status
        state.message = action.payload.message
        state.httpStatus = action.payload.httpStatus
      })
  },
})

export const { clearState } = loginSlice.actions
export const selectLoginState = (state) => state.login
export default loginSlice.reducer
