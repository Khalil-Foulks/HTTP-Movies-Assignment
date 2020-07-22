import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const item = movieList.find(
    thing => `${thing.id}` === params.id
  )

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleUpdate = e => {
    e.preventDefault();
    push(`/update-movie/${params.id}`)
  }

  const handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log('handleDelete ', res)
        const newMovieArr = movieList.filter(v => v.id !== item.id) // looks for movies that don't match current movie id and sets that as the new movieList Array
        setMovieList(newMovieArr)
        alert("Movie Deleted!")
        push(`/`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="update" onClick={handleUpdate} style={{padding: "10px", color:"black"}}>Edit Movie</button>
      <button className="delete" onClick={handleDelete} style={{padding: "10px", color:"black"}}>Delete Movie</button>
    </div>
  );
}

export default Movie;
