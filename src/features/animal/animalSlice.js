import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAnimalAPI } from "../../services/animal";

const initialState = {
  animal: [],
  loading: false,
};

export const getAllAnimal = createAsyncThunk(
  "animal/getAllAnimal",
  async () => {
    const data = await getAllAnimalAPI();
    return data;
  }
);

export const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAnimal.fulfilled, (state, action) => {
        state.loading = false;
        state.animal = action.payload;
      });
  },
});

export const selectAnimalState = (state) => state.animal;
export default animalSlice.reducer;
