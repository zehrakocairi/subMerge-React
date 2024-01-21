import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./MovieCreation.css";
import { useState } from "react";

const MovieCreation = () => {
  const [movieName, setMovieName] = useState("");

  async function ProcessNewMovie() {
    try {
      const response = await fetch(`https://kodilist.azure-api.net/submerge/fetchsubtitles?movieName=${movieName}`);
      if (!response.ok) {
        throw new Error("Network error!");
      }
      setMovieName("");
      const { message } = await response.json();
      alert(message);
    } catch (error) {
      console.error("Error fetching new movie:", error);
    }
  }

  return (
    <div className="creation-container">
      <div className="creation-title">STUDY WITH SUBMERGE</div>
      <div className="search-input">
        <InputGroup size="lg">
          <Form.Control
            placeholder="Write a movie name"
            aria-label="Write a movie name"
            aria-describedby="basic-addon2"
            onChange={(e) => setMovieName(e.target.value)}
            value={movieName}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={ProcessNewMovie}>
            Create
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
