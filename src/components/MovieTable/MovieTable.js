import Button from "react-bootstrap/Button";
import "./MovieTable.css";
import { Link } from "react-router-dom";

const MovieTable = ({ movie, deleteMovie, index }) => {
  return (
    <tr className="table-container">
      <td>{index}</td>
      <td>
        <Button variant="link">{movie.name}</Button>
      </td>
      <td>Here comes description</td>
      <td>
        <Button className="movie-details-btn" variant="primary">
          <Link to={{ pathname: `/movie/${movie.id}`, search: `movieName=${movie.name}` }}> Details</Link>
        </Button>
        <Button className="movie-delete-btn" variant="danger" onClick={async () => await deleteMovie(movie.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default MovieTable;
