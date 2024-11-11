import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../slices/searchMoviesSlice";
// import UserService from "../services/UserService";
// import { loginUser } from "../slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loading: loadingQuery } = useSelector((state) => state.searchMovies);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  // const [requestToken, setRequestToken] = useState(null);

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

  // const handleLogin = async () => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const requestToken = urlParams.get("request_token");

  //   if (!requestToken) {
  //     try {
  //       const data = await UserService.getRequestToken();
  //       const requestToken = data.request_token;

  //       const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173`;
  //       window.location.href = redirectUrl;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     dispatch(loginUser(requestToken));
  //   }
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const requestToken = urlParams.get("request_token");

  //   if (requestToken) {
  //     setRequestToken(requestToken);
  //   }
  // }, [location.search]);

  // const renderLink = () => {
  //   if (user.sessionId) {
  //     return <Link>Profile</Link>;
  //   } else if (requestToken) {
  //     return <Link onClick={handleLogin}>Logar</Link>;
  //   } else {
  //     return <Link onClick={handleLogin}>Autenticar</Link>;
  //   }
  // };

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
      {/* <button onClick={() => console.log(user)}>cons</button> */}
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
            <Link to="/perfil">Perfil</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
