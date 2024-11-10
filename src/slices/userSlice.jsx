import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";

const initialState = {
  sessionId: null,
  filmesFavoritos: [],
  error: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",

  async (requestToken, thunkAPI) => {
    const state = thunkAPI.getState();
    const userState = state.user;
    console.log(userState);

    try {
      const data = await UserService.createSession(requestToken);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.status_message);
    }
  }
);

export const userSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.sessionId = null;
      state.favoriteMovies = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.sessionId = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.sessionId = null;
        state.error = action.payload;
        state.loading = false;
        state.filmesFavoritos = [];
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
