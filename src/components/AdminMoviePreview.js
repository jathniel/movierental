import React,{ Component } from 'react';
import { PropTypes } from 'prop-types';

class AdminMoviePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
    };
  }
  componentDidMount() {
    this.setState({img:this.props.image});
  }
  componentWillReceiveProps(nextProps) {
    let image =nextProps.image;
    this.setState({img: image});
  }
  render() {
    const deleteMovie =(e) => {
      e.preventDefault();
      this.props.deleteMovie(this.props._id);
    };
    const errorImage = () => {
      this.setState({img:'/images/default.jpg'});
    };
    return(
      <div className="admin-preview">
      <div className="preview-buttons">
        <button className="btn btn-danger btn-lg" onClick={deleteMovie}>Delete</button>
        <button className="btn btn-warning btn-lg" onClick={this.props.updateMovie}>Update</button>
      </div>
        <div className="movie-title">
          {this.props.title}
        </div>
        <div className="movie-count">
          <strong>Quantity: </strong>{this.props.quantity}
        </div>
        <img className="movie-image" src={this.state.img} onError={errorImage}/>
        <p className="margin-0"><strong>Director: </strong>{this.props.director}</p>
        <p className="margin-0"><strong>Year: </strong>{this.props.year}</p>
        <p><strong>Synopsis: </strong>{this.props.synopsis}</p>
        <hr/>
        <p><strong>Cast:</strong></p>
        {this.props.casts.map((cast, index) =>
          <div key={index} className="cast-preview">
            <span>{cast}</span>
          </div>
        )}
      </div>
    );
  }
}
AdminMoviePreview.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  casts: PropTypes.array.isRequired,
  updateMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired
};
export default AdminMoviePreview;
