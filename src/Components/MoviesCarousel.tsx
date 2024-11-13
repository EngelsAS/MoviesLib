import { useRef, useState } from "react";
import ImageCard from "./ImageCard";
import styles from "./MoviesCarousel.module.css";
import { Icon } from "@iconify/react";
import Categoria from "./Categoria";
import { MovieType } from "../types/MovieType";

interface IProps {
  movies: MovieType[];
  tituloCategoria: string;
  subtituloCategoria?: string;
  toRemove?: boolean;
  removeFunction?: () => void;
}

const MoviesCarousel = ({
  movies,
  tituloCategoria,
  subtituloCategoria,
  toRemove,
  removeFunction,
}: IProps) => {
  const refCarousel = useRef<HTMLDivElement | null>(null);
  const [countCarousel, setCountCarousel] = useState(0);
  const currentTranslateValue = useRef(0);

  const handleCarousel = (acao: "back" | "next") => {
    const restoMovies = movies.length % 6;
    const lengthCarousel =
      restoMovies !== 0 ? movies.length - restoMovies : movies.length;

    if (acao === "next") {
      if (countCarousel < lengthCarousel) {
        currentTranslateValue.current += 1325;
        refCarousel.current!.style.transform = `translateX(-${currentTranslateValue.current}px)`;
        setCountCarousel((prev) => prev + 6);
      } else {
        refCarousel.current!.style.transform = `translateX(0px)`;
        currentTranslateValue.current = 0;
        setCountCarousel(0);
      }
    }

    if (acao === "back") {
      if (countCarousel > 0) {
        currentTranslateValue.current -= 1325;
        refCarousel.current!.style.transform = `translateX(-${currentTranslateValue.current}px)`;
        setCountCarousel((prev) => prev - 6);
      }
    }
  };

  return (
    <>
      <Categoria titulo={tituloCategoria} subtitulo={subtituloCategoria} />
      <div className={styles.container_carousel}>
        <div className={styles.carousel} ref={refCarousel}>
          {movies.map((movie) => (
            <ImageCard
              key={movie.id}
              movie={movie}
              toRemove={toRemove}
              removeFunction={removeFunction}
            />
          ))}
        </div>
        {countCarousel > 0 && (
          <div
            className={styles.arrow_div_back}
            onClick={() => handleCarousel("back")}
          >
            <Icon icon="iconamoon:arrow-up-2-light" style={{ color: "#fff" }} />
          </div>
        )}

        <div
          className={styles.arrow_div_next}
          onClick={() => handleCarousel("next")}
        >
          <Icon icon="iconamoon:arrow-up-2-light" style={{ color: "#fff" }} />
        </div>
      </div>
    </>
  );
};

export default MoviesCarousel;
