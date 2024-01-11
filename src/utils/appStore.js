import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import moviesSliceReducer from "./moviesSlice";
import gptSliceReducer from "../utils/gptSlice";
import configSliceReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userSliceReducer,
    movies: moviesSliceReducer,
    gpt: gptSliceReducer,
    config: configSliceReducer,
  },
});

export default appStore;
