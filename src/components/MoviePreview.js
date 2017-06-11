import React from 'react';
import { PropTypes } from 'prop-types';


const MoviePreview = (props) => {
  return(
    <div>
      <div className="movie-preview">
        <div className="container padding-0 movie-preview__container">
          <div className="row margin-0">
            <div className="col-xs-12 col-sm-6 text-center movie-preview__image">
              <img src={props.image}/>
            </div>
            <div className="col-xs-12 col-sm-6">
              <h2>{props.title}</h2>
              <p><strong>Rating: </strong>4.5</p>
              <div>
                <button className="btn btn-rent btn-lg">Rent</button>
              </div>
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
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  cast: PropTypes.array.isRequired,
  removePreview: PropTypes.func.isRequired
};
export default MoviePreview;
