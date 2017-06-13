import React,{ Component } from 'react';
import SearchMovies from './SearchMovies';
import ReactScrollPagination from 'react-scroll-pagination';
import MovieList from './MovieList';
import * as api from '../api';
class Admin extends Component {
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

  render() {
    return (
      <div className="admin">
        <div className="row margin-0">
          <div className="col-xs-12 col-sm-6 col-md-7 admin-movie-list">
            <SearchMovies
            search={this.state.search}
            handleSearch={this.handleSearch}/>
            <MovieList movies={this.state.movielist} handleClick={this.handleClick}/>
            <ReactScrollPagination fetchFunc={this.updateLimit}/>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-5 admin-movie-description">

          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
