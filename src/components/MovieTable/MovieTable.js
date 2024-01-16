import Button from "react-bootstrap/Button";
import "./MovieTable.css";
import { Link } from "react-router-dom";
import { BiSolidDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const MovieTable = ({ movie, deleteMovie, index }) => {
  return (
    <tr className="table-container">
      <td>{index}</td>
      <td>
        <Button variant="link">
          <Link to={{ pathname: `/movie/${movie.id}`, search: `movieName=${movie.name}` }}>{movie.name}</Link>
        </Button>
      </td>
      <td>Here comes description</td>
      <td>
        <Link to={{ pathname: `/movie/${movie.id}`, search: `movieName=${movie.name}` }}>
          <BiSolidDetail size={25} style={{ color: "#10a37f", margin: "5px" }} />
        </Link>

        <MdDelete size={25} style={{ color: "#c5167a", margin: "5px" }} onClick={async () => await deleteMovie(movie.id)} />
      </td>
    </tr>
  );
};

export default MovieTable;
