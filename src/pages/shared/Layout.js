import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link className="homeLink" to="/">
            <h1>subMerge</h1>
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
            White board
          </Link>
          <Link className="bookmark" to="/bookmark">
            Book marks
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
