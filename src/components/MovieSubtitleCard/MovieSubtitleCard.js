import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./movieSubtitleCard.css";

const MovieSubtitleCard = () => {
  return (
    <div>
      <div className="card-head">
        <h2 className="movie-title">Movie name comes</h2>
        <InputGroup className="mb-3 search-word ">
          <Form.Control placeholder="search a word" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </InputGroup>
      </div>
      <div className="card-btns-wrapper">
        <Card className="subtitle-card">
          <Card.Body>This is some text within a card body.</Card.Body>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
        <div className="button-group">
          <Button variant="danger">Delete</Button>
          <Button variant="primary">Show both</Button>
          <Button variant="primary">Show one</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieSubtitleCard;
