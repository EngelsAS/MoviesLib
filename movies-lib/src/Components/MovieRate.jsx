import { Icon } from "@iconify/react";
import styles from "./MovieRate.module.css";

const MovieRate = ({ movie, width }) => {
  return (
    <div className={styles.rate_div}>
      <Icon icon="ic:round-star" style={{ color: "#F5C518" }} width={width} />
      <span>{movie.vote_average.toFixed(1)}</span>
    </div>
  );
};

export default MovieRate;
