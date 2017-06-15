import React from 'react';
import { PropTypes } from 'prop-types';
import AdminCast from './AdminCast';

const AdminMoviePreview = (props) => {
  const deleteCast = (id) => {
    props.deleteCastById(id);
  };
  const deleteMovie =(e) => {
    e.preventDefault();
    props.deleteMovie(props.id);
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
      {props.cast.map(cast =>
        <AdminCast key={cast._id} className="movie-cast" handleClick={deleteCast} {...cast} />
      )}
    </div>
  );
};
AdminMoviePreview.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  cast: PropTypes.array.isRequired,
  updateMovie: PropTypes.func.isRequired
};
export default AdminMoviePreview;
