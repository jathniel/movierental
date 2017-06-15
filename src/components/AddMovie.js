import React from 'react';
import { PropTypes } from 'prop-types';
import Link, { LinkedComponent } from 'valuelink';
import TextInput from './TextInput';
import FormTextArea from './TextArea';
import AdminCast from './AdminCast';
import * as api from '../api';
class AddMovie extends LinkedComponent {
  constructor(props) {
    super(props);
    this.state = {
      castCollection: [],
      error: false,
      title: '',
      image: '',
      quantity: '',
      year: '',
      director: '',
      synopsis: '',
      cast: ''
    };
  }

  addCast = (event) => {
    event.preventDefault();
    let data = this.state.castCollection;
    data.push(this.state.cast);
    this.setState({
      castCollection: data,
      cast: '',
    });
  }
  deleteCast = (index) => {
    let state = this.state;
    state.castCollection.splice(index, 1);
    this.setState(state);
  };
  handleChange =(event) => {
    event.preventDefault();
    let state = this.state;
    state.form[event.target.name] = event.target.value;
    this.setState(state);
  };
  submitForm = () => {
    let form = {
      title: this.state.title,
      image: this.state.image,
      quantity: Number(this.state.quantity),
      year: Number(this.state.year),
      director: this.state.director,
      synopsis: this.state.synopsis,
      casts: this.state.castCollection
    };
    api.addMovie(form)
    .then(() => {
      this.props.getMovieList();
    });
  }
  render() {
    const titleLink = Link.state(this, 'title')
                    .check(x => x, 'Title is required');
    const imageLink = Link.state(this, 'image');
    const quantityLink = Link.state(this, 'quantity')
                    .check(x => x, 'Quantity is required');
    const directorLink = Link.state(this, 'director')
                    .check(x => x, 'Director is required');
    const yearLink = Link.state(this, 'year')
                  .check(x => x, 'year is required');
    const synopsisLink = Link.state(this, 'synopsis')
                  .check(x => x, 'synopsis is required');
    const castLink = Link.state(this, 'cast')
                  .check(x => x, 'cast is required');

    const checkSubmit =(e) => {
      e.preventDefault();
      if(this.state.castCollection.length <= 0 ||
        titleLink.error ||
        quantityLink.error ||
        directorLink.error ||
        yearLink.error ||
        synopsisLink.error) {
        this.setState({error: true});
      } else {
        this.setState({error: false});
        this.submitForm();
      }
    };
    return(
      <div className="add-movie admin-preview">
        <div className="movie-title">Add Movie</div>
        <form noValidate onSubmit={checkSubmit}>
          <TextInput type="text" placeholder="title" className="form-control" valueLink={ titleLink }/>
          <div className="form-group">
            <label className="btn btn-default btn-file margin-bottom10">
                Browse <input type="file" className="hidden"/>
            </label> Or
            <TextInput type="text" className="form-control" placeholder="Image Link" valueLink={ imageLink } />
          </div>
          <TextInput type="number" className="form-control" placeholder="Quantity" valueLink={ quantityLink } />
          <TextInput type="text" className="form-control" placeholder="Director" valueLink={ directorLink } />
          <TextInput type="number" className="form-control" placeholder="Year" valueLink={ yearLink } />
          <FormTextArea   valueLink={ synopsisLink } className="form-control" placeholder="Synopsis"/>
          <div className="form-group">
            <p>Cast</p>
            {this.state.castCollection.map((cast, index) =>
              <AdminCast key={index} id={index} name={cast} handleClick={this.deleteCast}/>
            )}
            <TextInput type="text" className="form-control" placeholder="Enter Cast names" valueLink={ castLink } />
          </div>
          <button disabled={castLink.error} onClick={this.addCast} className="btn btn-primary btn-lg btn-block margin-top10">ADD Cast</button>
          <hr/>
          {this.state.error ?
            <div className="error-wrapper">Please check the details above</div> : ''
          }
          <button type="submit"
          className="btn btn-primary btn-lg btn-block margin-top10">ADD MOVIE</button>
        </form>
      </div>
    );
  }
}
AddMovie.propTypes = {
  getMovieList: PropTypes.func.isRequired,

};
export default AddMovie;
