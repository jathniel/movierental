import React from 'react';
import { PropTypes } from 'prop-types';


const MovieListPreview = (props) => {
  const OnClick = () => {
    props.handleClick(props._id);
  };
  return(
    <a className="movie-card" onClick={OnClick}>
     <img src={props.image}/>
     </a>
  );
};
MovieListPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};
export default MovieListPreview;
