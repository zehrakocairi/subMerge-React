import Card from "react-bootstrap/Card";
import "./MovieSubtitleCard.css";
import { FaBookmark, FaRegBookmark, FaStar, FaRegStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { MdDelete } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaRegFaceSmileWink } from "react-icons/fa6";

const MovieSubtitleCard = ({ movieSubtitle, removeSubtitle, isDeleteEnabled = true }) => {
  const { whiteBoardSubtitles, setWhiteBoardSubtitles, showOne, setShowOne, changeText, setChangeText } = useContext(ApplicationContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWhiteBoard, setIsWhiteBoard] = useState(false);

  useEffect(() => {
    setIsBookmarked(movieSubtitle.bookmarked);
  }, []);

  useEffect(() => {
    setIsWhiteBoard(
      whiteBoardSubtitles.some((subtitle) => {
        return subtitle.id === movieSubtitle.id;
      })
    );
  }, [whiteBoardSubtitles]);

  function setToWhiteBoard(movieSubtitle, event) {
    event.preventDefault();

    if (!isWhiteBoard) {
      setWhiteBoardSubtitles((prevSubtitles) => [...prevSubtitles, movieSubtitle]);
    } else {
      setWhiteBoardSubtitles((prevSubtitles) => prevSubtitles.filter((prevSubtitle) => prevSubtitle.id !== movieSubtitle.id));
    }
  }
  async function setToBookmark(movieSubtitle, event) {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/files/${movieSubtitle.documentId}/records/${movieSubtitle.id}/bookmark`, {
        method: isBookmarked ? "DELETE" : "POST",
      });
      if (response.status === 200) {
        setIsBookmarked(!isBookmarked);
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
            {isBookmarked ? (
              <FaBookmark
                style={{ color: "#4146BE" }}
                onClick={async (event) => {
                  await setToBookmark(movieSubtitle, event);
                }}
                size={20}
              />
            ) : (
              <FaRegBookmark
                style={{ color: "#4146BE" }}
                onClick={async (event) => {
                  await setToBookmark(movieSubtitle, event);
                }}
                size={20}
              />
            )}
          </a>
        </div>
        <div>
          <a href="">
            {isWhiteBoard ? (
              <FaStar
                style={{ color: "#4146BE" }}
                onClick={(event) => {
                  setToWhiteBoard(movieSubtitle, event);
                }}
                size={25}
              />
            ) : (
              <FaRegStar
                style={{ color: "#4146BE" }}
                onClick={(event) => {
                  setToWhiteBoard(movieSubtitle, event);
                }}
                size={25}
              />
            )}
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
        {isDeleteEnabled && (
          <div
            onClick={() => {
              removeSubtitle(movieSubtitle.id);
            }}
          >
            <MdDelete size={25} style={{ color: "#4146BE" }} />
          </div>
        )}
        <div
          onClick={() => {
            setShowOne(false);
          }}
        >
          <HiOutlineEmojiHappy size={25} color="#F6C630" />
        </div>
        <div
          onClick={() => {
            setShowOne(true);
            setChangeText(!changeText);
          }}
        >
          <FaRegFaceSmileWink size={21} color="#F6C630" />
        </div>
      </div>
    </div>
  );
};

export default MovieSubtitleCard;
