import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadImageAPI } from "../../services/cloudinary";

const initialState = {
  images: [],
  photoLoading: false,
  flag: false,
  statusCode: null,
};

export const uploadImage = createAsyncThunk(
  "post/uploadImage",
  async (body) => {
    const data = await uploadImageAPI(body);
    return data;
  }
);

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearImage: (state) => {
      state.images = [];
      state.flag = false;
      state.statusCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.photoLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.photoLoading = false;
        if (action.payload.httpStatus === 200) {
          state.images = [action.payload.data.secure_url];
          state.flag = true;
          state.statusCode = action.payload.httpStatus;
        }
      });
  },
});

export const { clearImage } = imageSlice.actions;
export const selectImageState = (state) => state.images;
export default imageSlice.reducer;
