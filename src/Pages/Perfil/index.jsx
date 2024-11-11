import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import MoviesCarousel from "../../Components/MoviesCarousel";

const Perfil = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserService.getWatchList();
      console.log(data);
      setWatchList(data.results);
    };

    fetchData();
  }, []);

  return (
    <>
      <MoviesCarousel movies={watchList} tituloCategoria={"Watch List"} />
    </>
  );
};

export default Perfil;
