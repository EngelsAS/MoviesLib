//Redux
import { useEffect } from "react";
import { getTopRatedMovies } from "../../slices/topRatedMoviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../slices/popularMoviesSlice";
import MoviesCarousel from "../../Components/MoviesCarousel";
import { RootState } from "../../types/StoreTypes";

const Home = () => {
  const dispatch = useDispatch();
  const { movies: topRatedMovies } = useSelector(
    (state: RootState) => state.topRatedMovies
  );
  const { movies: popularMovies } = useSelector(
    (state: RootState) => state.popularMovies
  );

  useEffect(() => {
    console.log("teste");
    dispatch(getTopRatedMovies());
    dispatch(getPopularMovies());
  }, [dispatch]);

  return (
    <>
      <MoviesCarousel
        movies={popularMovies}
        tituloCategoria={"Popular Movies"}
        subtituloCategoria={"What's been most popular lately?"}
      />

      <MoviesCarousel
        movies={topRatedMovies}
        tituloCategoria={"Top Rated Movies"}
      />
    </>
  );
};

export default Home;
