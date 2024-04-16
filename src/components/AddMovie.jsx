import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AddMovie.module.css';

function AddMovie({ onAddMovie }) {
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const ratingRef = useRef('');
  const releaseDateRef = useRef('');
  const genreRef = useRef('');
  const actorsRef = useRef('');
  const directorRef = useRef('');
  const imageRef = useRef('');
  const isFavoriteRef = useRef(false);

  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    const movie = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      rating: ratingRef.current.value,
      release_date: releaseDateRef.current.value,
      genre: genreRef.current.value,
      actors: actorsRef.current.value,
      director: directorRef.current.value,
      image: imageRef.current.value,
      isFavorite: isFavoriteRef.current.value,
    };

    onAddMovie(movie);
    navigate('/');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Description</label>
        <textarea rows="5" id="opening-text" ref={descriptionRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="rating">Rating</label>
        <input type="text" id="rating" ref={ratingRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="genre">Genre</label>
        <input type="text" id="genre" ref={genreRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="actors">Actors</label>
        <input type="text" id="actors" ref={actorsRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="director">Director</label>
        <input type="text" id="director" ref={directorRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="image">Image</label>
        <input type="text" id="image" ref={imageRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
