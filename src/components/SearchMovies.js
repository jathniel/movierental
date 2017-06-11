import React from 'react';
import { PropTypes } from 'prop-types';
const SearchMovies = ({search, handleSearch}) => {

  return(
    <form onSubmit={handleSearch}>
      <div className="form-group">
        <div className="wrapper">
          <input
          type="text"
          value={search}
          onChange={handleSearch}
          name="search"
          placeholder="Search Movie title"
          className="form-control input input-lg margin-bottom10"/>
        </div>
      </div>
    </form>
  );
};
SearchMovies.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func
};
export default SearchMovies;
