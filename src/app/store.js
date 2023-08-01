import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "../features/animal/animalSlice";
import animalProductReducer from "../features/animalProduct/animalProductSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    animal: animalReducer,
    animalProduct: animalProductReducer,
    login: loginReducer,
  },
});
