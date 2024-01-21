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
import { SiOpenai } from "react-icons/si";
import Spinner from "react-bootstrap/Spinner";

const MovieSubtitleCard = ({ movieSubtitle, removeSubtitle, isDeleteEnabled = true }) => {
  const { whiteBoardSubtitles, setWhiteBoardSubtitles, showOnlyFirst, showSingle } = useContext(ApplicationContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWhiteBoard, setIsWhiteBoard] = useState(false);
  const [chatGptReply, setChatGptReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showSingleLocal, setShowSingleLocal] = useState(false);
  const [showFirstLocal, setShowFirstLocal] = useState(false);

  useEffect(() => {
    console.log("showSingle", showSingle);
    setShowSingleLocal(showSingle);
    setShowFirstLocal(showOnlyFirst);
  }, [showSingle, showOnlyFirst]);

  useEffect(() => {
    setIsBookmarked(movieSubtitle.bookmarked);
  }, [movieSubtitle.bookmarked]);

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
      const response = await fetch(`https://kodilist.azure-api.net/submerge/File/${movieSubtitle.documentId}/Record/${movieSubtitle.id}/Bookmark`, {
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
    setIsLoading(true);
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
            <p> I'm looking for my book I've lost</p>
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
    const apiKey = "*********";

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
      let tempContent = data.choices[0].message.content;
      if (word) {
        tempContent = tempContent.toLowerCase().replaceAll(word.toLowerCase(), `<b style="color: #10a37f">${word}</b>`);
      }
      return tempContent;
    } catch (err) {
      alert(`Error happened while fetching story. ${err}`);
    } finally {
      setIsLoading(false);
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
                  <FaStar size={25} color="#10a37f" />
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
                  <FaRegStar size={25} color="#10a37f" />
                </a>
              </OverlayTrigger>
            </div>
          )}
        </div>
      </div>
      <Card className="subtitle-card" onMouseUp={handleMouseUp}>
        <Card.Body className="subtitle-card-body">
          {showSingleLocal ? (
            showFirstLocal ? (
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
          {chatGptReply ? (
            <>
              <hr />
              <div style={{ position: "relative" }}>
                <SiOpenai className="openAILogo" size="30px" />
                <div dangerouslySetInnerHTML={{ __html: chatGptReply }} className="openAIsentences" />
              </div>
            </>
          ) : (
            isLoading && <Spinner className="spinner" animation="grow" />
          )}
        </Card.Body>
      </Card>
      <div className="button-group">
        {isDeleteEnabled && (
          <div
            onClick={(e) => {
              e.preventDefault();
              removeSubtitle(movieSubtitle.id);
            }}
          >
            <OverlayTrigger placement="right" overlay={generateTooltipElement("Delete subtitle")}>
              <a href="#">
                <MdDelete size={25} style={{ color: "#c5167a" }} />
              </a>
            </OverlayTrigger>
          </div>
        )}
        <div
          onClick={(e) => {
            e.preventDefault();
            setShowSingleLocal(false);
          }}
        >
          <OverlayTrigger placement="right" overlay={generateTooltipElement("See both for all subtitles")}>
            <a href="#">
              <HiOutlineEmojiHappy size={25} color="#10a37f" />
            </a>
          </OverlayTrigger>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            setShowSingleLocal(true);
            setShowFirstLocal(!showFirstLocal);
          }}
        >
          <OverlayTrigger placement="right" overlay={generateTooltipElement("See one for all subtitles")}>
            <a href="#">
              <FaRegFaceSmileWink size={21} color="#10a37f" />
            </a>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default MovieSubtitleCard;
