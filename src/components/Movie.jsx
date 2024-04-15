// import { Link } from 'react-router-dom';
import classes from './Movie.module.css';

const Movie = ({ title, releaseDate, rating, image }) => {
  return (
    <li className={classes.movie}>
      <h2>{title}</h2>
      <img className={classes.image} src={image} alt="image" />
      <h2>{rating}</h2>
      <h3>{releaseDate}</h3>
    </li>
  );
};

export default Movie;
