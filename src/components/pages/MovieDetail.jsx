import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import classes from '../pages/MovieDetail.module.css';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { movieId } = useParams();
  const navigate = useNavigate();
  const typedMovieId = +movieId + 1;

  const onDeleteHandler = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      await fetch(`http://localhost:3000/movies/${typedMovieId}`, {
        method: 'DELETE',
      });
      navigate('/');
    }
  };

  const onEditHandler = () => {
    setEditMode(true);
    setEditedMovie({ ...movie });
  };

  const onSaveHandler = async () => {
    await fetch(`http://localhost:3000/movies/${typedMovieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMovie),
    });
    setMovie(editedMovie);
    setEditMode(false);
  };

  const toggleFavorite = async () => {
    const newFavoriteStatus = !isFavorite;
    const fav = {
      ...movie,
      favorite: newFavoriteStatus,
    };
    try {
      const response = await fetch(`http://localhost:3000/movies/${typedMovieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fav),
      });
      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }
      setIsFavorite(newFavoriteStatus);
    } catch (error) {
      console.error('Error toggling favorite status:', error.message);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${typedMovieId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }

        const data = await response.json();
        setMovie(data);
        setIsFavorite(data.favorite);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [typedMovieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={classes.movie}>
      {!editMode ? (
        <>
          <button onClick={onEditHandler} className={classes.button}>
            Edit
          </button>{' '}
          <button onClick={onDeleteHandler} className={classes.button}>
            Delete
          </button>{' '}
          <button onClick={toggleFavorite} className={classes.button}>
            {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
          </button>
          <FaHeart color={isFavorite ? 'red' : 'gray'} />
          <h1>{movie.title}</h1>
          <p>Description: {movie.description}</p>
          <p>Actors: {movie.actors}</p>
          <p>Director: {movie.director}</p>
          <p>Genre: {movie.genre}</p>
          <p>Rating: {movie.rating}</p>
          <Link className={classes.link} to="/">
            Back to homepage
          </Link>
        </>
      ) : (
        <>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={editedMovie.title}
              onChange={(e) => setEditedMovie({ ...editedMovie, title: e.target.value })}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={editedMovie.description}
              onChange={(e) => setEditedMovie({ ...editedMovie, description: e.target.value })}
            />
            <label htmlFor="actors">Actors</label>
            <input
              type="text"
              id="actors"
              value={editedMovie.actors}
              onChange={(e) => setEditedMovie({ ...editedMovie, actors: e.target.value })}
            />
            <label htmlFor="director">Director</label>
            <input
              type="text"
              id="director"
              value={editedMovie.director}
              onChange={(e) => setEditedMovie({ ...editedMovie, director: e.target.value })}
            />
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              value={editedMovie.genre}
              onChange={(e) => setEditedMovie({ ...editedMovie, genre: e.target.value })}
            />
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              value={editedMovie.rating}
              onChange={(e) => setEditedMovie({ ...editedMovie, rating: e.target.value })}
            />
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={editedMovie.image}
              onChange={(e) => setEditedMovie({ ...editedMovie, image: e.target.value })}
            />
          </div>
          <button onClick={onSaveHandler} className={classes.button}>
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
