import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Movies = () => {
  return (
    <div>
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
          <tr>
            <td>1</td>
            <td>
              <Button variant="link">Titanic</Button>
            </td>
            <td>Here comes description</td>
            <td>
              <Button className="movie-details-btn" variant="primary">
                Details
              </Button>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <Button variant="link">Friends</Button>
            </td>
            <td>Here comes description</td>
            <td>
              <Button className="movie-details-btn" variant="primary">
                Details
              </Button>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Movies;
