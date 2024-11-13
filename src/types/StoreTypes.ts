import { MovieType } from "./MovieType";

export interface RootState {
  topRatedMovies: MoviesObject;
  popularMovies: MoviesObject;
  searchMovies: {
    movies: MovieType[];
    loading: boolean;
    total_pages: number;
    page: number;
  };
  user: {
    sessionId: string;
  };
}

interface MoviesObject {
  movies: MovieType[];
}
