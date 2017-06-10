import React from 'react';
import { PropTypes } from 'prop-types';

const MovieList = ({ movies }) => {
  return(
    <div className="movie-list container">
      <h1>Movies</h1>
      {movies.map(movie =>
        <a key={movie.id} className="movie-card">
          <img src={movie.image}/>
        </a>
      )}

    </div>
  );
};
MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};
export default MovieList;
