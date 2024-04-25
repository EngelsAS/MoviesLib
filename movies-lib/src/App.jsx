import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";
import Search from "./Pages/Search";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div id="corpo">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Movie />} path="/movie" />
            <Route element={<Search />} path="/search" />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
