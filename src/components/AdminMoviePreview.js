import React from 'react';
import { PropTypes } from 'prop-types';


const AdminMoviePreview = (props) => {

  const deleteMovie =(e) => {
    e.preventDefault();
    props.deleteMovie(props._id);
  };

  return(
    <div className="admin-preview">
    <div className="preview-buttons">
      <button className="btn btn-danger btn-lg" onClick={deleteMovie}>Delete</button>
      <button className="btn btn-warning btn-lg" onClick={props.updateMovie}>Update</button>
    </div>
      <div className="movie-title">
        {props.title}
      </div>
      <div className="movie-count">
        <strong>Quantity: </strong>{props.quantity}
      </div>
      <img className="movie-image" src={props.image}/>
      <p className="margin-0"><strong>Director: </strong>{props.director}</p>
      <p className="margin-0"><strong>Year: </strong>{props.year}</p>
      <p><strong>Synopsis: </strong>{props.synopsis}</p>
      <hr/>
      <p><strong>Cast:</strong></p>
      {props.casts.map((cast, index) =>
        <div key={index} className="cast-preview">
          <span>{cast}</span>
        </div>
      )}
    </div>
  );
};
AdminMoviePreview.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  casts: PropTypes.array.isRequired,
  updateMovie: PropTypes.func.isRequired
};
export default AdminMoviePreview;
