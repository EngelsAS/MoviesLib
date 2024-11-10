import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FilmsService from "../services/FilmsService";

const initialState = {
  movies: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
};

export const searchMovies = createAsyncThunk(
  "searchMovies/searchMovies",
  async ({ query, page }, thunkAPI) => {
    console.log(thunkAPI);
    console.log(page);
    console.log(query);
    try {
      const data = await FilmsService.searchMovies(query, page);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.status_message);
    }
  }
);

export const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {
    reset: (state) => {
      state.movies = [];
      state.loading = false;
      state.page = 0;
      state.total_pages = 0;
      state.total_results = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.movies = [];
        state.page = 0;
        state.total_pages = 0;
        state.total_results = 0;
      });
  },
});

export const { reset } = searchMoviesSlice.actions;
export default searchMoviesSlice.reducer;
