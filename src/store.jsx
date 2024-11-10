import { configureStore } from "@reduxjs/toolkit";
import topRatedMoviesReducer from "./slices/topRatedMoviesSlice";
import popularMoviesReducer from "./slices/popularMoviesSlice";
import searchMoviesReducer from "./slices/searchMoviesSlice";

export const store = configureStore({
  reducer: {
    topRatedMovies: topRatedMoviesReducer,
    popularMovies: popularMoviesReducer,
    searchMovies: searchMoviesReducer,
  },
});
