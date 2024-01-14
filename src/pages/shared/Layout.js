import "./layout.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <h1>subMerge</h1>
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
          <Link className="bookMark" to="/bookMark">
            Book mark
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
