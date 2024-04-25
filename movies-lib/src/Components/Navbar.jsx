import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../slices/searchMoviesSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loading: loadingQuery } = useSelector((state) => state.searchMovies);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.length > 0) {
      console.log(query);
      dispatch(searchMovies({ query }));

      if (!loadingQuery) {
        console.log(location.pathname);
        navigate(`/search?q=${query}`);
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlQuery = urlParams.get("q");
    if (location.pathname === "/search") {
      dispatch(searchMovies({ query: urlQuery }));
      console.log(location.search);
    }
  }, [location.search, location.pathname, dispatch]);

  return (
    <nav className={styles.navbar}>
      <Link to={"/"} style={{ margin: "0px", padding: "0px" }}>
        <h4>MoviesLib</h4>
      </Link>

      <div className={styles.div_search_bar}>
        <Icon
          icon="basil:search-solid"
          style={{ color: "#757575" }}
          onClick={handleSearch}
        />
        <input
          value={query}
          placeholder="Pesquisar no MoviesLib"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/search"}>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
