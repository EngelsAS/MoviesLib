import styles from "./ImageCard.module.css";
import MovieRate from "./MovieRate";

const ImageCard = ({ movie }) => {
  return (
    <>
      <div className={styles.card_container}>
        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
        <div className={styles.card_film_infos}>
          <MovieRate movie={movie} width={20} />
          <h4>{movie.title}</h4>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
