//Redux
import { useEffect } from "react";
import { getTopRatedMovies } from "../../slices/topRatedMoviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../slices/popularMoviesSlice";
import MoviesCarousel from "../../Components/MoviesCarousel";

const Home = () => {
  const dispatch = useDispatch();
  const { movies: topRatedMovies } = useSelector(
    (state) => state.topRatedMovies
  );
  const { movies: popularMovies } = useSelector((state) => state.popularMovies);

  useEffect(() => {
    console.log("teste");
    dispatch(getTopRatedMovies());
    dispatch(getPopularMovies());
  }, [dispatch]);

  return (
    <>
      {/* <div style={{ border: "1px solid red" }}>
        <div>teste</div>
        <div>Teste</div>
      </div> */}
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
