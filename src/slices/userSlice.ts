import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";
import { MovieType } from "../types/MovieType";

interface PropsInitialState {
  sessionId: null | string;
  filmesFavoritos: MovieType[];
  error: any;
  loading: boolean;
}

const initialState: PropsInitialState = {
  sessionId: null,
  filmesFavoritos: [],
  error: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",

  async (requestToken: string, thunkAPI) => {
    try {
      const data = await UserService.createSession(requestToken);
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.status_message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.sessionId = null;
      state.filmesFavoritos = [];
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
