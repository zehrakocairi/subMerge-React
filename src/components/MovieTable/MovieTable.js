import Button from "react-bootstrap/Button";
import "./movieTable.css";
import { Link } from "react-router-dom";

const MovieTable = ({ movie }) => {
  return (
    <tr className="table-container">
      <td>1</td>
      <td>
        <Button variant="link">{movie.name}</Button>
      </td>
      <td>Here comes description</td>
      <td>
        <Button className="movie-details-btn" variant="primary">
          <Link to={{ pathname: `/movie/${movie.id}`, search: `movieName=${movie.name}` }}> Details</Link>
        </Button>
        <Button className="movie-delete-btn" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default MovieTable;
