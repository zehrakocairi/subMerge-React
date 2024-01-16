import "./WhiteBoard.css";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import MovieSubtitleCard from "../../components/MovieSubtitleCard/MovieSubtitleCard";
import PageTitle from "../../components/PageTitle/PageTitle";

function WhiteBoard() {
  const { whiteBoardSubtitles } = useContext(ApplicationContext);

  return (
    <>
      <PageTitle title="White Board"></PageTitle>
      <div className="whiteBoardWrapper">
        {whiteBoardSubtitles.map((whiteBoardSubtitle) => {
          return <MovieSubtitleCard key={whiteBoardSubtitle.id} movieSubtitle={whiteBoardSubtitle} isDeleteEnabled={false} />;
        })}
      </div>
    </>
  );
}

export default WhiteBoard;
