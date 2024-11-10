import { useDispatch, useSelector } from "react-redux";
import MovieCardSearchInfos from "../../Components/MovieCardSearchInfos";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../Components/LoadingComponent";
import Categoria from "../../Components/Categoria";
import styles from "./Search.module.css";
import { useMemo } from "react";
import { searchMovies } from "../../slices/searchMoviesSlice";

const Search = () => {
  const { movies, total_pages, page } = useSelector(
    (state) => state.searchMovies
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const query = urlParams.get("q");
  const { loading: searchLoading } = useSelector((state) => state.searchMovies);
  const arrayTotalPages = useMemo(() => {
    let array = [];

    for (let i = 1; i <= total_pages; i++) {
      array.push(i);
    }

    return array;
  }, [total_pages]);

  if (searchLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <h1
        style={{ color: "#F5C518", marginBottom: "50px" }}
      >{`Pesquisar "${query}"`}</h1>
      <Categoria titulo={"Títulos"} />
      <div className={styles.movies_results_div}>
        {movies.map((movie) => (
          <MovieCardSearchInfos key={movie.id} movie={movie} />
        ))}
      </div>
      <div className={styles.select_page_div}>
        {arrayTotalPages.slice(0, 8).map((item) => (
          <span
            onClick={() => dispatch(searchMovies({ query, page: item }))}
            key={item}
            style={page === item ? { border: "1px solid #E2B616" } : null}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
};

export default Search;
