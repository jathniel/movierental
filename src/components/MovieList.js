import React from 'react';
import { PropTypes } from 'prop-types';
import MovieListPreview from './MovieListPreview';
const MovieList = ({ movies, handleClick }) => {

  return(
    <div>
      {movies.map(movie =>
        <MovieListPreview key={movie._id} handleClick={handleClick} {...movie}/>
      )}
    </div>
  );
};
MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  handleClick: PropTypes.func
};
export default MovieList;
