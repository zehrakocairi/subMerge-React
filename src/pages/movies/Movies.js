import "./movies.css";
import Table from "react-bootstrap/Table";
import MovieTable from "../../components/MovieTable/MovieTable";
import useFetch from "../../hooks/useFetch";

const Movies = () => {
  const [movies, setMovies, ,] = useFetch("http://localhost:3001/files", []);

  async function deleteMovie(movieId) {
    try {
      const response = await fetch(`http://localhost:3001/files/${movieId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    setMovies(movies.filter((movie) => movie.id !== movieId));
  }

  return (
    <div>
      <div className="table-container">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Movie Name</th>
              <th>Description</th>
              <th>Chose what you want</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              return <MovieTable key={movie.id} movie={movie} deleteMovie={deleteMovie} />;
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Movies;
