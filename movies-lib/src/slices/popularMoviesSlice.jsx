import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FilmsService from "../services/FilmsService";

const initialState = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  movies: [],
  loading: false,
  error: null,
};

export const getPopularMovies = createAsyncThunk(
  "popularMovies/getPopularMovies",
  async (_, thunkAPI) => {
    try {
      const data = await FilmsService.getPopularMovies();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.status_message);
    }
  }
);

export const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movies = [];
        state.page = 0;
        state.total_pages = 0;
        state.total_results = 0;
      });
  },
});

export default popularMoviesSlice.reducer;
