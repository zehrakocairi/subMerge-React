import Card from "react-bootstrap/Card";
import "./movieSubtitleCard.css";
import { FaStar, FaBookReader } from "react-icons/fa";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

const MovieSubtitleCard = ({ movieSubtitle, removeSubtitle }) => {
  const { whiteBoardSubtitles, setWhiteBoardSubtitles, showOne, setShowOne, changeText, setChangeText } = useContext(ApplicationContext);

  function setToWhiteBoard(movieSubtitle, event) {
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
  async function setToBookmark(movieSubtitle, event) {
    event.preventDefault();

    const isBookmarked = movieSubtitle.bookmarked;
    try {
      const response = await fetch(`http://localhost:3001/files/${movieSubtitle.documentId}/records/${movieSubtitle.id}/bookmark`, {
        method: isBookmarked ? "DELETE" : "POST",
      });
      if (response.status === 200) {
        movieSubtitle.bookmarked = !isBookmarked;
      }
      throw new Error("Something went wrong on api server!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card-btns-wrapper">
      <div className="icon-wrapper">
        <div>
          <a href="#">
            <FaStar
              style={{ color: "da1717" }}
              onClick={async (event) => {
                await setToBookmark(movieSubtitle, event);
              }}
            />
          </a>
        </div>
        <div>
          <a href="">
            <FaBookReader
              style={{ color: "da1717" }}
              onClick={(event) => {
                setToWhiteBoard(movieSubtitle, event);
              }}
            />
          </a>
        </div>
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
        <div
          onClick={() => {
            removeSubtitle(movieSubtitle.id);
          }}
        >
          <MdDelete size={24} style={{ color: "da1717" }} />
        </div>
        <div
          onClick={() => {
            setShowOne(false);
          }}
        >
          <LiaEyeSolid size={20} />
          <LiaEyeSolid size={20} />
        </div>
        <div
          onClick={() => {
            setShowOne(true);
            setChangeText(!changeText);
          }}
        >
          <LiaEyeSolid size={20} />
          <LiaEyeSlashSolid size={20} />
        </div>
      </div>
    </div>
  );
};

export default MovieSubtitleCard;
