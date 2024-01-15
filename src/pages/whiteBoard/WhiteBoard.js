import "./WhiteBoard.css";
import { useContext, useState, useRef } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import MovieSubtitleCard from "../../components/MovieSubtitleCard/MovieSubtitleCard";

function WhiteBoard() {
  const { whiteBoardSubtitles } = useContext(ApplicationContext);

  return (
    <div>
      {whiteBoardSubtitles.map((whiteBoardSubtitle) => {
        return <MovieSubtitleCard key={whiteBoardSubtitle.id} movieSubtitle={whiteBoardSubtitle} isDeleteEnabled={false} />;
      })}
    </div>
  );
}

export default WhiteBoard;
