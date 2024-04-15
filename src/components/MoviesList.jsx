import { Link } from 'react-router-dom';
import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Link key={movie.id} to={`details/${+movie.id}`}>
          <Movie
            key={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            rating={movie.rating}
            image={movie.image}
          />
        </Link>
      ))}
    </ul>
  );
};

export default MovieList;
