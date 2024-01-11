import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/shared/Layout.js";
import Home from "./pages/home/Home.js";
import Movies from "./pages/movies/Movies.js";
import MovieSubtitle from "./pages/movieSubtitle/MovieSubtitle.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:movieId" element={<MovieSubtitle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
