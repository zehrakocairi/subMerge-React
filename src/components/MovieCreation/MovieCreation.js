import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./movieCreation.css";

const MovieCreation = () => {
  return (
    <div className="creation-container">
      <div className="creation-title">STUDY WITH SUBMERGE</div>
      <div className="search-input">
        <InputGroup size="lg">
          <Form.Control placeholder="Search movie" aria-label="Search movie" aria-describedby="basic-addon2" />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="creation-options">
        <Form.Select aria-label="Default select example">
          <option>Choose a language</option>
          <option value="1">English</option>
          <option value="2">Turkish</option>
          <option value="3">German</option>
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option>Choose a language</option>
          <option value="1">English</option>
          <option value="2">Turkish</option>
          <option value="3">German</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default MovieCreation;
