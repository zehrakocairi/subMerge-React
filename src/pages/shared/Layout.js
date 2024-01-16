import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link className="homeLink" to="/">
            <h1>SubMerge</h1>
          </Link>
        </div>
        <div className="navigationLinks">
          <Link className="homeLink" to="/">
            Home
          </Link>
          <Link className="moviesLink" to="/movies">
            Movies
          </Link>
          <Link className="whiteBoardLink" to="/whiteBoard">
            White Board
          </Link>
          <Link className="bookmark" to="/bookmark">
            Bookmarks
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
