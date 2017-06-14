import React,{ Component } from 'react';
import SearchMovies from './SearchMovies';
import ReactScrollPagination from 'react-scroll-pagination';
import MovieList from './MovieList';
import AdminMoviePreview from './AdminMoviePreview';
import AddMovie from './AddMovie';
import * as api from '../api';
class Admin extends Component {
  state = {
    movielist:[],
    search: '',
    limit: 12,
    addMovie: false,
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
  deleteCast = (id) => {
    return api.deleteCast(id)
    .then(result => result)
    .catch((e) => {
      console.error(e);
    });
  }
  handleClick = (id) => {
    this.getMovieDescription(id)
    .then(resp => {
      this.setState({
        addMovie: false,
        selectedMovie: resp
      });
    })
    .catch((e) => {
      console.error(e);
    });
  }
  removePreview = () => {
    this.setState({
      addMovie: false,
      selectedMovie: null
    });
  };
  deleteCastById = (id) => {
    this.deleteCast(id)
    .then(() => {
      let state = this.state.selectedMovie;
      let index = state.cast.findIndex(data => data.id == id);
      state.cast.splice(index, 1);
      this.setState(state);
    });
  };
  addMovie = () => {
    this.setState({
      addMovie: true,
      selectedMovie: null
    });
  }
  render() {
    return (
      <div className="admin">
        <div className="row margin-0">
          <div className="col-xs-12 col-sm-6 col-md-7 admin-movie-list">
            <SearchMovies
            search={this.state.search}
            handleSearch={this.handleSearch}/>
            <div className="add-movie__button" onClick={this.addMovie}><i className="fa fa-plus" aria-hidden="true"></i>Add Movie</div>
            <MovieList movies={this.state.movielist} handleClick={this.handleClick}/>
            <ReactScrollPagination fetchFunc={this.updateLimit}/>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-5 admin-movie-description">
          {this.state.selectedMovie ? <AdminMoviePreview {...this.state.selectedMovie} deleteCastById={this.deleteCastById}/> : null}
          {this.state.addMovie ? <AddMovie getMovieList={this.getMovieList}/> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
