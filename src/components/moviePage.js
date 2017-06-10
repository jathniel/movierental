import React,{ Component }  from 'react';
import MovieList from './MovieList';
import * as api from '../api';


class MoviePage extends Component {
  state = {
    movielist:[]
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

  render() {
    return(
      <div className="movie">
        <div className="search-bar">
          <div className="container">
            <div className="search-container">
              <form>
                <div className="form-group">
                  <div className="wrapper">
                    <input type="text" name="search" placeholder="Search Movie title" className="form-control input input-lg margin-bottom10"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <MovieList movies={this.state.movielist}/>
      </div>
    );
  }
}

export default MoviePage;
