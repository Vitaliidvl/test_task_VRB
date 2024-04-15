import { useState, useEffect } from 'react';

function MovieDetail({ match }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `http://localhost:3000/movies/${match.params.id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [match.params.id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Rating: {movie.rating}</p>
      <p>Release Date: {movie.releaseDate}</p>
      <p>Description: {movie.description}</p>
      {/* Add other movie details here */}
    </div>
  );
}

export default MovieDetail;
