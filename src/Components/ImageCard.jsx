import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./ImageCard.module.css";
import MovieRate from "./MovieRate";
import { useSelector } from "react-redux";
import UserService from "../services/UserService";

const ImageCard = ({ movie }) => {
  const user = useSelector((state) => state.user);

  const addToWatchList = async () => {
    console.log(user.sessionId, movie.id);
    // const accountId = await UserService.returnAccountId(user.sessionId);

    await UserService.addToWatchList(movie.id);
  };

  return (
    <>
      <div className={styles.card_container}>
        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />

        <div className={styles.card_film_infos}>
          <MovieRate movie={movie} width={20} />
          <h4>{movie.title}</h4>
        </div>
        <div className={styles.card_actions}>
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
        </div>
      </div>
    </>
  );
};

export default ImageCard;
