import Card from "react-bootstrap/Card";
import "./MovieSubtitleCard.css";
import { FaBookmark, FaRegBookmark, FaStar, FaRegStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { MdDelete } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

const MovieSubtitleCard = ({ movieSubtitle, removeSubtitle, isDeleteEnabled = true }) => {
  const { whiteBoardSubtitles, setWhiteBoardSubtitles, showOne, setShowOne, changeText, setChangeText } = useContext(ApplicationContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWhiteBoard, setIsWhiteBoard] = useState(false);
  const [chatGptReply, setChatGptReply] = useState("");

  useEffect(() => {
    setIsBookmarked(movieSubtitle.bookmarked);
  }, [movieSubtitle.bookmarked]);

  useEffect(() => {
    setIsWhiteBoard(
      whiteBoardSubtitles.some((subtitle) => {
        return subtitle.id === movieSubtitle.id;
      })
    );
  }, [whiteBoardSubtitles, movieSubtitle.id]);

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
  const generateTooltipElement = (text) => (
    <Tooltip id="tooltip">
      <strong>{text}</strong>
    </Tooltip>
  );

  async function handleMouseUp() {
    const sentence = await GetSentence(window.getSelection().toString());
    setChatGptReply(sentence);
  }

  async function GetSentence(word) {
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `I want to see different usage of words while studying English. I will give you some words and you will create me at least 3 sentences with those words all together.
           For example:
            I'll provide:
            "look for"
            You would create at least 3 sentences in the following format:
            <p> I'm looking for my book I lost</p>
        `,
        },
        {
          role: "user",
          content: JSON.stringify(word),
        },
      ],
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    const apiKey = "";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      alert(`Error happened while fetching story. ${err}`);
    }
  }

  return (
    <div className="card-btns-wrapper">
      <div className="icon-wrapper">
        <div>
          {isBookmarked ? (
            <div
              onClick={async (event) => {
                await setToBookmark(movieSubtitle, event);
              }}
            >
              <OverlayTrigger placement="left" overlay={generateTooltipElement("remove from bookmark")}>
                <a href="#">
                  <FaBookmark size={21} color="#4146BE" />
                </a>
              </OverlayTrigger>
            </div>
          ) : (
            <div
              onClick={async (event) => {
                await setToBookmark(movieSubtitle, event);
              }}
            >
              <OverlayTrigger placement="left" overlay={generateTooltipElement("add to bookmark")}>
                <a href="#">
                  <FaRegBookmark size={21} color="#4146BE" />
                </a>
              </OverlayTrigger>
            </div>
          )}
        </div>
        <div>
          {isWhiteBoard ? (
            <div
              onClick={async (event) => {
                await setToWhiteBoard(movieSubtitle, event);
              }}
            >
              <OverlayTrigger placement="left" overlay={generateTooltipElement("remove from the white board")}>
                <a href="#">
                  <FaStar size={25} color="rgb(198 215 112)" />
                </a>
              </OverlayTrigger>
            </div>
          ) : (
            <div
              onClick={async (event) => {
                await setToWhiteBoard(movieSubtitle, event);
              }}
            >
              <OverlayTrigger placement="left" overlay={generateTooltipElement("add to the white board")}>
                <a href="#">
                  <FaRegStar size={25} color="rgb(198 215 112)" />
                </a>
              </OverlayTrigger>
            </div>
          )}
        </div>
      </div>

      <Card className="subtitle-card" onMouseUp={handleMouseUp}>
        <Card.Body className="subtitle-card-body">
          {showOne ? (
            changeText ? (
              <>
                <div>{movieSubtitle.text1}</div>
                <hr />
                <div></div>
              </>
            ) : (
              <>
                <div></div>
                <hr />
                <div>{movieSubtitle.text2}</div>
              </>
            )
          ) : (
            <>
              <div>{movieSubtitle.text1}</div>
              <hr />
              <div>{movieSubtitle.text2}</div>
            </>
          )}
          {chatGptReply && (
            <>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: chatGptReply }}></div>
            </>
          )}
        </Card.Body>
      </Card>
      <div className="button-group">
        {isDeleteEnabled && (
          <div
            onClick={() => {
              removeSubtitle(movieSubtitle.id);
            }}
          >
            <OverlayTrigger placement="right" overlay={generateTooltipElement("Delete subtitle")}>
              <a href="#">
                <MdDelete size={25} style={{ color: "#4146BE" }} />
              </a>
            </OverlayTrigger>
          </div>
        )}
        <div
          onClick={() => {
            setShowOne(false);
          }}
        >
          <OverlayTrigger placement="right" overlay={generateTooltipElement("See Both")}>
            <a href="#">
              <HiOutlineEmojiHappy size={25} color="#F6C630" />
            </a>
          </OverlayTrigger>
        </div>
        <div
          onClick={() => {
            setShowOne(true);
            setChangeText(!changeText);
          }}
        >
          <OverlayTrigger placement="right" overlay={generateTooltipElement("See One")}>
            <a href="#">
              <FaRegFaceSmileWink size={21} color="#F6C630" />
            </a>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default MovieSubtitleCard;
