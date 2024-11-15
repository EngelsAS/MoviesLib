import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import MoviesCarousel from "../../Components/MoviesCarousel";
import { MovieType } from "../../types/MovieType";

const Perfil = () => {
  const [watchList, setWatchList] = useState<MovieType[]>([]);

  const fetchData = async () => {
    const data = await UserService.getWatchList();
    console.log(data);
    setWatchList(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MoviesCarousel
        movies={watchList}
        tituloCategoria={"Watch List"}
        toRemove={true}
        removeFunction={fetchData}
      />
    </>
  );
};

export default Perfil;
