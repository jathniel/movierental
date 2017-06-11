import React from 'react';
import { PropTypes } from 'prop-types';


const MoviePreview = (props) => {
  const rentMovie = (e) => {
    e.preventDefault();
    props.rentMovie(props.id, props.quantity);
  };
  const rentButton = () => {
    if(props.quantity >=0 && !props.isRented) {
      return <button className="btn btn-rent btn-lg" onClick={rentMovie}>Rent</button>;
    } else if(props.isRented) {
      return <h4 className="success">You have Rented this Movie</h4>;
    }
    return <h4 className="error">You cannot rent this anymore</h4>;
  };
  return(
    <div>
      <div className="movie-preview">
        <div className="container padding-0 movie-preview__container">
          <div className="row margin-0">
            <div className="col-xs-12 col-sm-6 text-center movie-preview__image">
              {props.isRented}
              <img src={props.image}/>
            </div>
            <div className="col-xs-12 col-sm-6">
              <h2>{props.title}</h2>
              <p className="margin-0"><strong>Available: </strong>{props.quantity}</p>
              <p><strong>Rating: </strong>4.5</p>
              <div>{rentButton()}</div>
              <p className="margin-0"><strong>Directed By: </strong>{props.director}</p>
              <p className="margin-0"><strong>Year: </strong>{props.year}</p>
              <p><strong>Synopsis: </strong>{props.synopsis}</p>
              <h4>Cast</h4>
              {props.cast.map(cast =>
                <span key={cast._id} className="movie-cast">{cast.name}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={props.removePreview}></div>
    </div>
  );
};
MoviePreview.propTypes = {
  isRented:PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  cast: PropTypes.array.isRequired,
  removePreview: PropTypes.func.isRequired
};
export default MoviePreview;
