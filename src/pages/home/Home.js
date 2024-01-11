import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div>
        <div className="home-title">STUDY WITH SUBMERGE</div>
        <div className="search-input">
          <InputGroup size="lg">
            <Form.Control placeholder="Search movie" aria-label="Search movie" aria-describedby="basic-addon2" />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>
        <div className="home-options">
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
    </div>
  );
};

export default Home;
