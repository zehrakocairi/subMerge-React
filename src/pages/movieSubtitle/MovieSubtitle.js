import "./movieSubtitle.css";
import MovieSubtitleCard from "../../components/MovieSubtitleCard/MovieSubtitleCard";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

const MovieSubtitle = () => {
  const { movieId } = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const name = searchParams.get("movieName");
  const [movieSubtitles, , ,] = useFetch(`http://localhost:3001/files/${movieId}/records`, []);
  let [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (movieSubtitles) GetFilteredData();
  }, [movieSubtitles]);

  function GetFilteredData(text) {
    if (!text) {
      setFilteredData(movieSubtitles);
      return;
    }
    const updatedFilteredData = movieSubtitles.filter((movieSubtitle) => movieSubtitle.text1.includes(text) || movieSubtitle.text2.includes(text));
    setFilteredData(updatedFilteredData);
  }

  return (
    <div className="card-container">
      <div className="card-head">
        {name ? <h2 className="movie-title "> {name}</h2> : <h2 className="movie-title ">Name not available</h2>}
        <InputGroup className="mb-3 search-word ">
          <Form.Control
            placeholder="search a word"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => GetFilteredData(e.target.value)}
          />
        </InputGroup>
      </div>
      {filteredData.map((movieSubtitle) => {
        return <MovieSubtitleCard key={movieSubtitle.id} movieSubtitle={movieSubtitle} />;
      })}
    </div>
  );
};

export default MovieSubtitle;
