import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FilmsService from "../services/FilmsService";

//Para configurar nosso slice precisamos criar um initial state
const initialState = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  movies: [],
  loading: false,
  error: null,
};

//A funçao no asyncThunk do slice deve levar o mesmo nome da funcao do service que ela utiliza, no caso
//a getTopRatedMovies
export const getTopRatedMovies = createAsyncThunk(
  "topRatedMovies/getTopRatedMovies",
  //quando necessario podemos usar o underscore para ignorar o primeiro parametro da funcao asyncrona e usar apenas a thunkApi
  async (_, thunkAPI) => {
    try {
      const data = await FilmsService.getTopRatedMovies();
      return data;
    } catch (error) {
      //rejeitando o valor com a thunkApi fazendo assim os extra reducers cairem corretamente no rejected
      return thunkAPI.rejectWithValue(error.status_message);
    }
  }
);

//Aqui criamos nosso slice, a estrutura de todo slice é padrao
export const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  //nos reducers colocamos todas as funcoes que queremos utilizar em outros arquivos para gerenciar os estados do nosso slice
  //podemos colocar qualquer funcao aqui, e podemos gerenciar os estados do slice de qualquer maneira, basta usar o parametro
  //state pra acessar ou modificar os atributos do nosso slice
  reducers: {
    reset: (state) => {
      state.movies = [];
      state.page = 0;
      state.total_pages = 0;
      state.total_results = 0;
      state.loading = false;
      state.error = null;
    },
  },
  //os extra reducers vao levar funcoes que vao trabalhar diretamente com as respostas das requisicoes que estao sendo feitas no slice
  //vc pode gerenciar varias requisicoes de forma simples, basta colocar o nome da funcao e o estado da requisicao no qual vc deseja
  //que uma funcao seja realizada, por exemplo:
  //nomeDaFuncao.pending, (state) => {state.loading = true; console.log("carregando")}
  extraReducers: (builder) => {
    builder
      .addCase(getTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movies = [];
        state.page = 0;
        state.total_pages = 0;
        state.total_results = 0;
      });
  },
});

export const { reset } = topRatedMoviesSlice.actions;
export default topRatedMoviesSlice.reducer;
