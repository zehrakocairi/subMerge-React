import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./movieSubtitleCard.css";
import { FaStar, FaBookReader } from "react-icons/fa";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

const MovieSubtitleCard = ({ movieSubtitle }) => {
  const [showOne, setShowOne] = useState(false);
  const [changeText, setChangeText] = useState(false);
  const { whiteBoardSubtitles, setWhiteBoardSubtitles } = useContext(ApplicationContext);

  function handleClick(movieSubtitle, event) {
    event.preventDefault();

    const isWhiteBoard = whiteBoardSubtitles.some((subtitle) => {
      return subtitle.id === movieSubtitle.id;
    });

    if (!isWhiteBoard) {
      setWhiteBoardSubtitles((prevSubtitles) => [...prevSubtitles, movieSubtitle]);
    } else {
      setWhiteBoardSubtitles((prevSubtitles) => prevSubtitles.filter((prevSubtitle) => prevSubtitle.id !== movieSubtitle.id));
    }
  }

  return (
    <div className="card-btns-wrapper">
      <div className="icon-wrapper">
        <a href="">
          <FaStar />
        </a>
        <a href="">
          <FaBookReader
            onClick={(event) => {
              handleClick(movieSubtitle, event);
            }}
          />
        </a>
      </div>

      <Card className="subtitle-card">
        {showOne ? (
          changeText ? (
            <Card.Body className="subtitle-card-body">
              <div>{movieSubtitle.text1}</div>
              <hr />
              <div></div>
            </Card.Body>
          ) : (
            <Card.Body className="subtitle-card-body">
              <div></div>
              <hr />
              <div>{movieSubtitle.text2}</div>
            </Card.Body>
          )
        ) : (
          <Card.Body className="subtitle-card-body">
            <div>{movieSubtitle.text1}</div>
            <hr />
            <div>{movieSubtitle.text2}</div>
          </Card.Body>
        )}
      </Card>
      <div className="button-group">
        <Button className="delete-subtitle" variant="danger">
          delete
        </Button>
        <Button
          className="show-both"
          variant="primary"
          onClick={() => {
            setShowOne(false);
          }}
        >
          see both
        </Button>
        <Button
          className="show-one"
          variant="primary"
          onClick={() => {
            setShowOne(true);
            setChangeText(!changeText);
          }}
        >
          see one
        </Button>
      </div>
    </div>
  );
};

export default MovieSubtitleCard;
