import { MovieType } from "../types/MovieType";
import styles from "./MovieCardSearchInfos.module.css";
import MovieRate from "./MovieRate";
import { Icon } from "@iconify/react";

const MovieCardSearchInfos = ({ movie }: { movie: MovieType }) => {
  return (
    <div className={styles.movie_card_div}>
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
      ) : (
        <div className={styles.no_img_path}>
          <Icon icon="subway:movie" style={{ color: "#757575" }} width={100} />
        </div>
      )}

      <div className={styles.movie_card_infos}>
        <h2>{movie.title}</h2>
        <MovieRate movie={movie} width={25} />
        <p title={movie.overview}>
          {movie.overview.length > 500
            ? movie.overview.substring(0, 500) + "..."
            : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCardSearchInfos;
