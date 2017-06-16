import React from 'react';
import { PropTypes } from 'prop-types';
import Link, { LinkedComponent } from 'valuelink';
import TextInput from './TextInput';
import FormTextArea from './TextArea';
import AdminCast from './AdminCast';
import * as api from '../api';
import UploadFile from './UploadFile';
class UpdateMovie extends LinkedComponent {
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
  componentDidMount() {
    let form = {
      _id: this.props.form._id,
      title: this.props.form.title,
      image: this.props.form.image,
      quantity: Number(this.props.form.quantity),
      year: Number(this.props.form.year),
      director: this.props.form.director,
      synopsis: this.props.form.synopsis,
      castCollection: this.props.form.casts
    };
    this.setState(form);
  }
  addCast = (event) => {
    event.preventDefault();
    let data = this.state.castCollection;
    data.push(this.state.form.cast);

    this.setState({
      castCollection: data,
      cast: ''
    });
  }
  deleteCastById = (index) => {
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
    api.updateMovie(this.state._id,form)
    .then(() => {
      form._id = this.state._id,
      this.props.updateMovie(form);
    });
  }
  updateImage = (img) => {
    this.setState({image: img});
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
        <div className="movie-title">Update Movie</div>
        <form noValidate onSubmit={checkSubmit}>
          <TextInput type="text" placeholder="title" className="form-control" valueLink={ titleLink }/>
          <div className="form-group">
            <UploadFile updateImage = {this.updateImage}/>  Or
            <TextInput type="text" className="form-control" placeholder="Image Link" valueLink={ imageLink } />
          </div>
          <TextInput type="number" className="form-control" placeholder="Quantity" valueLink={ quantityLink } />
          <TextInput type="text" className="form-control" placeholder="Director" valueLink={ directorLink } />
          <TextInput type="number" className="form-control" placeholder="Year" valueLink={ yearLink } />
          <FormTextArea   valueLink={ synopsisLink } className="form-control" placeholder="Synopsis"/>
          <div className="form-group">
            <p>Cast</p>
            {this.state.castCollection.map((cast, index) =>
              <AdminCast key={index} id={index} name={cast} handleClick={this.deleteCastById}/>
            )}
            <TextInput type="text" className="form-control" placeholder="Enter Cast names" valueLink={ castLink } />
          </div>
          <button disabled={castLink.error} onClick={this.addCast} className="btn btn-primary btn-lg btn-block margin-top10">ADD Cast</button>
          <hr/>
          {this.state.error ?
            <div className="error-wrapper">Please check the details above</div> : ''
          }
          <button type="submit"
          className="btn btn-primary btn-lg btn-block margin-top10">UPDATE MOVIE</button>
        </form>
      </div>
    );
  }
}
UpdateMovie.propTypes = {
  getMovieList: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  updateMovie: PropTypes.func.isRequired

};
export default UpdateMovie;
