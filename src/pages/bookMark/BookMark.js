import { useEffect, useState } from "react";
import MovieSubtitleCard from "../../components/MovieSubtitleCard/MovieSubtitleCard";

function BookMark() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getBookMarkedSubtitles() {
      const response = await fetch(`http://localhost:3001/bookmarks`);
      const responseJson = await response.json();
      setData(responseJson);
    }
    getBookMarkedSubtitles();
  });

  return (
    <div>
      {data.map((movieSubtitle) => {
        return <MovieSubtitleCard key={movieSubtitle.id} movieSubtitle={movieSubtitle} />;
      })}
    </div>
  );
}

export default BookMark;
