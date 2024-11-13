import { apiTMDB } from "../utils/config";

const getTopRatedMovies = async () => {
  const topRateMoviesURL = import.meta.env.VITE_API_TOP_RATED_MOVIES;

  try {
    const resp = await apiTMDB.get(topRateMoviesURL);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPopularMovies = async () => {
  const popularMoviesURL = import.meta.env.VITE_API_POPULAR_MOVIES;

  try {
    const resp = await apiTMDB.get(popularMoviesURL);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const searchMovies = async (query, page) => {
  const searchMoviesURL = import.meta.env.VITE_API_SEARCH_MOVIES;

  const url = page
    ? searchMoviesURL + query + "&page=" + page
    : searchMoviesURL + query;

  try {
    const resp = await apiTMDB.get(url);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUpcomingMovies = async () => {
  const upcomigMoviesURL = import.meta.env.VITE_API_UPCOMING_MOVIES;

  try {
    const resp = await apiTMDB.get(upcomigMoviesURL);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const resp = await apiTMDB.get(`3/movie/${movieId}`);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const FilmsService = {
  getTopRatedMovies,
  getPopularMovies,
  searchMovies,
  getUpcomingMovies,
  getMovieDetails,
};

export default FilmsService;
