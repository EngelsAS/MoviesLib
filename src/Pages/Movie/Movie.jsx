import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilmsService from "../../services/FilmsService";
import styles from "./Movie.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Pill from "../../Components/Pill";
import IconAddToWatchList from "../../Components/IconAddToWatchList";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const { id: movieId } = useParams();

  const fetchMovieDetails = async () => {
    const data = await FilmsService.getMovieDetails(movieId);

    if (data) {
      setMovie(data);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }

    //eslint-disable-next-line
  }, [movieId]);

  const addToWatchList = async () => {
    toast.promise(UserService.addToWatchList(movie.id), {
      pending: "Adicionando à Watch List",
      success: "Filme adicionado à Watch List",
      error: "Erro ao adicionar filme à Watch List",
    });
  };

  return (
    <div className={styles.movie_container}>
      {movie && (
        <>
          <section className={styles.movie_section}>
            <div className={styles.movie_infos}>
              <div className={styles.movie_title}>
                <h1>{movie.original_title}</h1>
                <p>{movie.release_date.substring(0, 4)}</p>
              </div>
              <div>
                <div className={styles.movie_score_container}>
                  <h4>Avaliação da Crítica</h4>
                  <div className={styles.movie_score}>
                    <Icon
                      icon="ic:baseline-star"
                      style={{ color: "#ffdd00" }}
                      fontSize={26}
                    />
                    <div className={styles.movie_score_infos}>
                      <p>
                        {movie.vote_average}
                        <span style={{ color: "#B8C1C2", fontSize: "12px" }}>
                          /10
                        </span>
                      </p>
                      <h6>{movie.vote_count}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.movie_overview}>
              <div className={styles.poster_container}>
                <IconAddToWatchList onClick={addToWatchList} />
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />
              </div>
              <div>
                <p>{movie.overview}</p>
              </div>
            </div>
            <div className={styles.movie_genres}>
              {movie.genres.map((item, index) => (
                <Pill key={index} text={item.name} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Movie;
