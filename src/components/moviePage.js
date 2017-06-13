import React,{ Component }  from 'react';
import ReactScrollPagination from 'react-scroll-pagination';
import MovieList from './MovieList';
import SearchMovies from './SearchMovies';
import MoviePreview from './MoviePreview';
import * as api from '../api';


class MoviePage extends Component {
  state = {
    movielist:[],
    search: '',
    limit: 7,
    selectedMovie: null
  }
  componentDidMount() {
    this.getMovieList();
  }
  getMovieList = () => {
    return api.getMovieList()
    .then((result) => {
      this.setState({movielist: result});
    })
    .catch((e) => {
      console.error(e);
    });
  };
  searchMovieList = () => {
    return api.searchMovies(this.state.search, this.state.limit)
    .then((result) => {
      this.setState({movielist: result});
    })
    .catch((e) => {
      console.error(e);
    });
  };
  updateLimit =() => {
    setTimeout(() => {
      this.setState({limit: this.state.limit + 7});
      this.searchMovieList();
    }, 1000);

  };
  handleSearch = (event) => {
    event.preventDefault();
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
    this.searchMovieList();
  };
  getMovieDescription = (id) => {
    return api.getMovieDescription(id)
    .then(result => result)
    .catch((e) => {
      console.error(e);
    });
  };
  handleClick = (id) => {
    this.getMovieDescription(id)
    .then(resp => {
      this.setState({
        selectedMovie: resp
      });
    })
    .catch((e) => {
      console.error(e);
    });
  }
  removePreview = () => {
    this.setState({
      selectedMovie: null
    });
  };
  rentMovie = (movieId, quantity) => {
    return api.rentMovie(movieId, quantity)
    .then(() => {
      let selectedMovie = this.state.selectedMovie;
      selectedMovie['quantity'] = this.state.selectedMovie.quantity - 1;
      selectedMovie['isRented'] = true;
      this.setState(selectedMovie);
    });
  }
  render() {
    return(
      <div className="movie">
        {this.state.selectedMovie ? <MoviePreview {...this.state.selectedMovie} rentMovie={this.rentMovie} removePreview={this.removePreview}/> : null }
        <div className="search-bar">
          <div className="container">
            <div className="search-container">
              <SearchMovies
              search={this.state.search}
              handleSearch={this.handleSearch}/>
            </div>
          </div>
        </div>
        <div className="movie-list container">
          <MovieList movies={this.state.movielist} handleClick={this.handleClick}/>
        </div>
        <ReactScrollPagination fetchFunc={this.updateLimit}/>

      </div>
    );
  }
}

export default MoviePage;
