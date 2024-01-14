import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/shared/Layout.js";
import Home from "./pages/home/Home.js";
import Movies from "./pages/movies/Movies.js";
import MovieSubtitle from "./pages/movieSubtitle/MovieSubtitle.js";
import ApplicationProvider from "./contexts/ApplicationContext.js";
import WhiteBoard from "./pages/whiteBoard/WhiteBoard.js";
import BookMark from "./pages/bookMark/BookMark.js";

function App() {
  return (
    <div className="App">
      <ApplicationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:movieId" element={<MovieSubtitle />} />
              <Route path="/whiteBoard" element={<WhiteBoard />} />
              <Route path="/bookMark" element={<BookMark />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </div>
  );
}

export default App;
