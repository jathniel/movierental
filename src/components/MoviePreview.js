import React,{ Component } from 'react';
import { PropTypes } from 'prop-types';
import RateMovie from './RateMovie';
import * as api from '../api';
class MoviePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      rating: 0
    };
  }
  componentDidMount() {
    this.setState({img:this.props.image});
    this.getMovieRating(this.props._id);

  }
  componentWillReceiveProps(nextProps) {
    let image =nextProps.image;
    this.setState({img: image});
  }
  rateMovie = (rating) => {
    let form = {rating: rating};
    api.rateMovie(this.props._id, form)
    .then(() => {
      this.getMovieRating(this.props._id);
    });
  }
  getMovieRating = (id) => {
    api.getMovieRating(id)
    .then(result => {
      this.setState({rating: result.data});
    });
  }
  render() {
    const rentMovie = (e) => {
      e.preventDefault();
      this.props.rentMovie(this.props._id, this.props.quantity);
    };
    const rentButton = () => {
      if(this.props.quantity >=0 && !this.props.isRented) {
        return <button className="btn btn-rent btn-lg" onClick={rentMovie}>Rent</button>;
      } else if(this.props.isRented) {
        return <h4 className="success">You have Rented this Movie</h4>;
      }
      return <h4 className="error">You cannot rent this anymore</h4>;
    };
    const errorImage = () => {
      this.setState({img:'/images/default.jpg'});
    };
    return(
      <div>
        <div className="movie-preview">
          <div className="container padding-0 movie-preview__container">
            <div className="row margin-0">
              <div className="col-xs-12 col-sm-6 text-center movie-preview__image">
                <img  src={this.state.img} onError={errorImage}/>
              </div>
              <div className="col-xs-12 col-sm-6">
                <RateMovie rating = {this.state.rating} submitRating = {this.rateMovie}/>
                <h2>{this.props.title}</h2>
                <p className="margin-0"><strong>Available: </strong>{this.props.quantity}</p>
                <div>{rentButton()}</div>
                <p className="margin-0"><strong>Directed By: </strong>{this.props.director}</p>
                <p className="margin-0"><strong>Year: </strong>{this.props.year}</p>
                <p><strong>Synopsis: </strong>{this.props.synopsis}</p>
                <h4>Cast</h4>
                {this.props.casts.map((cast, index) =>
                  <span key={index} className="movie-cast">{cast}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={this.props.removePreview}></div>
      </div>
    );
  }
}
MoviePreview.propTypes = {
  _id: PropTypes.string.isRequired,
  rentMovie:PropTypes.func.isRequired,
  isRented:PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  casts: PropTypes.array.isRequired,
  removePreview: PropTypes.func.isRequired
};
export default MoviePreview;
