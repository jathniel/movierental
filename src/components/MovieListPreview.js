import React,{ Component } from 'react';
import { PropTypes } from 'prop-types';

class MovieListPreview extends Component {
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
    const OnClick = () => {
      this.props.handleClick(this.props._id);
    };
    const errorImage = () => {
      this.setState({img:'/images/default.jpg'});
    };
    return(
      <a className="movie-card" onClick={OnClick}>
       <img src={this.state.img} onError={errorImage}/>
       </a>
    );
  }
}
MovieListPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  toErrorImage: PropTypes.func
};
export default MovieListPreview;
