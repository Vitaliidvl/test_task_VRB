import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
    <>
      <h1>Title: {movie.title}</h1>
      <h2>Plot: {movie.description}</h2>
      <Link to="/">Back to homepage</Link>
    </>
  );
}

export default MovieDetail;
