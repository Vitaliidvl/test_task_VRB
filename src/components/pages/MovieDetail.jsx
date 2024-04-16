import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import classes from '../pages/MovieDetail.module.css';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/movies/${+movieId + 1}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }

        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={classes.movie}>
      <h1>{movie.title}</h1>
      <p>Description: {movie.description}</p>
      <p>Actors: {movie.actors.join(', ')}</p>
      <p>Director: {movie.director}</p>
      <p>Genre: {movie.genre.join(', ')}</p>
      <p>Rating: {movie.rating}</p>
      <Link className={classes.link} to="/">
        Back to homepage
      </Link>
    </div>
  );
}

export default MovieDetail;
