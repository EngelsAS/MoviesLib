import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./ImageCard.module.css";
import MovieRate from "./MovieRate";
import { useSelector } from "react-redux";
import UserService from "../services/UserService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MovieType } from "../types/MovieType";
import { RootState } from "../types/StoreTypes";

interface IProps {
  movie: MovieType;
  toRemove: boolean;
  removeFunction: () => void;
}

const ImageCard = ({ movie, toRemove, removeFunction }: IProps) => {
  const user = useSelector((state: RootState) => state.user);

  const addToWatchList = async () => {
    console.log(user.sessionId, movie.id);
    // const accountId = await UserService.returnAccountId(user.sessionId);
    toast.promise(UserService.addToWatchList(movie.id), {
      pending: "Adicionando à Watch List",
      success: "Filme adicionado à Watch List",
      error: "Erro ao adicionar filme à Watch List",
    });
  };

  const removeFromWatchList = async () => {
    try {
      await UserService.removeFromWatchList(movie.id);
      if (removeFunction) {
        removeFunction();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.card_container}>
        <Link style={{ margin: "0", padding: "0" }} to={`/movie/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
        </Link>

        <div className={styles.card_film_infos}>
          <MovieRate movie={movie} width={20} />
          <h4>{movie.title}</h4>
        </div>
        <div className={styles.card_actions}>
          {toRemove && (
            <Icon
              icon="mdi:remove-bold"
              fontSize={24}
              style={{ color: "#d91212" }}
              onClick={removeFromWatchList}
            />
          )}
          {!toRemove && (
            <>
              <Icon
                fontSize={24}
                icon="material-symbols:star"
                style={{ color: "#fff" }}
              />
              <Icon
                fontSize={24}
                icon="subway:mark-2"
                style={{ color: "#fff" }}
                onClick={addToWatchList}
              />
              <Icon fontSize={24} icon="mdi:like" style={{ color: "#fff" }} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageCard;
