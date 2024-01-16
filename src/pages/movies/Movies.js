import "./Movies.css";
import Table from "react-bootstrap/Table";
import MovieTable from "../../components/MovieTable/MovieTable";
import useFetch from "../../hooks/useFetch";
import PageTitle from "../../components/PageTitle/PageTitle";

const Movies = () => {
  const [movies, setMovies, ,] = useFetch("http://localhost:3001/files", []);

  async function handleDeleteMovie(movieId) {
    try {
      const response = await fetch(`http://localhost:3001/files/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network error!");
      }
    } catch (error) {
      console.log("Error occured while deleting movie : " + error);
    }

    setMovies(movies.filter((movie) => movie.id !== movieId));
  }

  return (
    <div>
      <PageTitle title="Movies" />
      <div className="table-container">
        <Table striped hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Movie Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, i) => {
              return <MovieTable key={movie.id} index={i + 1} movie={movie} deleteMovie={handleDeleteMovie} />;
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Movies;
