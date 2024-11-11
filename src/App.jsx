import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Movie from "./Pages/Movie/Movie";
import Search from "./Pages/Search/Search";
import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";
import Perfil from "./Pages/Perfil";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <div id="corpo">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Movie />} path="/movie" />
            <Route element={<Search />} path="/search" />
            <Route element={<Perfil />} path="/perfil" />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
