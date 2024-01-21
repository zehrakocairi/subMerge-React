import "./MovieSubtitle.css";
import MovieSubtitleCard from "../../components/MovieSubtitleCard/MovieSubtitleCard";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { SiOpenai } from "react-icons/si";

const MovieSubtitle = () => {
  const { movieId } = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const name = searchParams.get("movieName");
  const [movieSubtitles, , ,] = useFetch(`https://kodilist.azure-api.net/submerge/File/${movieId}/Record`, []);
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

  function removeSubtitle(movieSubtitleId) {
    try {
      fetch(`http://localhost:3001/files/${movieId}/records/${movieSubtitleId}`, {
        method: "DELETE",
      });
      if (!movieSubtitles) {
        throw new Error("Network error!");
      }
      setFilteredData((prevMovieSubtitles) => prevMovieSubtitles.filter((prevMovieSubtitle) => prevMovieSubtitle.id !== movieSubtitleId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card
        bg={"Light".toLowerCase()}
        key="Light"
        text={"Light".toLowerCase() === "light" ? "dark" : "white"}
        style={{ width: "15rem" }}
        className="mb-2 openAI-description"
      >
        <Card.Header>
          <SiOpenai color="white" size="30px" />
        </Card.Header>
        <Card.Body>
          <Card.Title> Teach Me!</Card.Title>
          <Card.Text>Select text, reveal insights. It brings you three sentences related to your chosen words.</Card.Text>
        </Card.Body>
      </Card>
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
          return <MovieSubtitleCard key={movieSubtitle.id} movieSubtitle={movieSubtitle} removeSubtitle={removeSubtitle} />;
        })}
      </div>
    </>
  );
};

export default MovieSubtitle;
