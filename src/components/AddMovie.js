import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import AdminCast from './AdminCast';
import ValidateInput from './ValidateInput';
import * as api from '../api';
class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      castIndex: 0,
      castCollection: [],
      form: {},
      error: {}
    };
  }

  addCast = (event) => {
    event.preventDefault();
    let data = this.state.castCollection;
    data.push({
      id: this.state.castIndex,
      name: this.state.form.cast
    });

    this.setState({
      castIndex: this.state.castIndex + 1,
      castCollection: data,
      cast: ''
    });
  }
  deleteCastById = (id) => {
    let state = this.state;
    let index = state.castCollection.findIndex(data => data.id == id);
    state.castCollection.splice(index, 1);
    this.setState(state);
  };
  handleChange =(event) => {
    event.preventDefault();
    let state = this.state;
    state.form[event.target.name] = event.target.value;
    this.setState(state);
  };
  submitForm = (event) => {
    event.preventDefault();
    api.addMovie(this.state.form, this.state.castCollection)
    .then(() => {
      this.props.getMovieList();
    });
  }
  render() {
    return(
      <div className="add-movie admin-preview">
        <div className="movie-title">Add Movie</div>
        <form noValidate onSubmit={this.submitForm}>
          <div className="form-group">
            <ValidateInput
            type="text"
            name="title"
            className="form-control"
            placeholder="title"
            value={this.state.form.title}
            onChange={this.handleChange}
            required={true} />
          </div>
          <div className="form-group">
          <label className="btn btn-default btn-file margin-bottom10">
              Browse <input type="file" className="hidden"/>
          </label> Or
            <ValidateInput
            type="text"
            name="image"
            className="form-control"
            placeholder="Image Link"
            value={this.state.form.imageLink}
            onChange={this.handleChange}
            required={true} />
          </div>

          <div className="form-group">
          <ValidateInput
          type="number"
          name="quantity"
          className="form-control"
          placeholder="quantity"
          value={this.state.form.quantity}
          onChange={this.handleChange}
          required={true} />
          </div>
          <div className="form-group">
          <ValidateInput
          type="text"
          name="director"
          className="form-control"
          placeholder="Director"
          value={this.state.form.director}
          onChange={this.handleChange}
          required={true} />
          </div>
          <div className="form-group">
            <ValidateInput
            type="number"
            name="year"
            className="form-control"
            placeholder="year"
            value={this.state.form.year}
            onChange={this.handleChange}
            required={true} />
          </div>
          <div className="form-group">
            <textarea  name="synopsis" value={this.state.form.synopsis}
            onChange={this.handleChange} className="form-control" placeholder="Synopsis"/>
          </div>
          <div className="form-group">
            <p>Cast</p>
            {this.state.castCollection.map(cast =>
              <AdminCast key={cast.id} className="movie-cast" handleClick={this.deleteCastById} {...cast} />
            )}
            <input type="text" name="cast" value={this.state.form.cast} onChange={this.handleChange} className="form-control" placeholder="Enter Cast names"/>
          </div>
          <button onClick={this.addCast} className="btn btn-primary btn-lg btn-block margin-top10">ADD Cast</button>
          <hr/>
          <button type="submit" className="btn btn-primary btn-lg btn-block margin-top10">ADD MOVIE</button>
        </form>
      </div>
    );
  }
}
AddMovie.propTypes = {
  getMovieList: PropTypes.func.isRequired,

};
export default AddMovie;
