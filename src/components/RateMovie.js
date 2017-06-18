import React,{ Component } from 'react';
import { PropTypes } from 'prop-types';
class RateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRating: false
    };
  }

  toggleRating = () => {
    this.setState({isRating: true});
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.submitRating(Number(e.target.value));
    this.setState({isRating: false});
  }
  render() {
    return(
      <div className="movie-rating">
        <h3>Rating</h3>
        {this.state.isRating ?
          <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary">
            <input type="radio" name="options" value="1" onClick={this.handleClick}/> 1
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" value="2" onClick={this.handleClick}/> 2
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" value="3" onClick={this.handleClick}/> 3
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" value="4" onClick={this.handleClick}/> 4
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="options" value="5" onClick={this.handleClick}/> 5
          </label>
          </div> :
          <div>
            <div className="movie-rating__rate">
            {this.props.rating}
            </div>
            <button className="btn btn-xs btn-secondary" onClick={this.toggleRating}>Rate</button>
          </div>
          }
      </div>
    );
  }
}
RateMovie.propTypes = {
  rating: PropTypes.string.isRequired,
  submitRating: PropTypes.func.isRequired
};
export default RateMovie;
