import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import ValidateInput from './ValidateInput';
import ValidateInputNumber from './ValidateInputNumber';
import AdminCast from './AdminCast';
import * as api from '../api';
class UpdateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      castCollection: props.form.casts,
      form: props.form,
      error: {}
    };
  }
  componentDidMount() {
    let form = this.state.form;
    form.cast = '';
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
  submitForm = (event) => {
    event.preventDefault();
    api.updateMovie(this.state._id, this.state.form, this.state.castCollection)
    .then(() => {
      this.props.updateMovie(this.state.form);
    });
  }
  render() {
    return(
      <div className="add-movie admin-preview">
        <div className="movie-title">Update Movie</div>
        <form noValidate onSubmit={this.submitForm}>
          <div className="form-group">
            <ValidateInput
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
            name="image"
            className="form-control"
            placeholder="Image Link"
            value={this.state.form.image}
            onChange={this.handleChange}
            required={true} />
          </div>

          <div className="form-group">
          <ValidateInputNumber
          name="quantity"
          className="form-control"
          placeholder="quantity"
          value={this.state.form.quantity}
          onChange={this.handleChange}
          required={true} />
          </div>
          <div className="form-group">
          <ValidateInput
          name="director"
          className="form-control"
          placeholder="Director"
          value={this.state.form.director}
          onChange={this.handleChange}
          required={true} />
          </div>
          <div className="form-group">
            <ValidateInputNumber
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
            {this.state.castCollection.map((cast, index) =>
              <AdminCast key={index} id={index} name={cast} handleClick={this.deleteCastById}/>
            )}
            <input type="text" name="cast" value={this.state.form.cast} onChange={this.handleChange} className="form-control" placeholder="Enter Cast names"/>
          </div>
          <button onClick={this.addCast} className="btn btn-primary btn-lg btn-block margin-top10">ADD CAST</button>
          <hr/>
          <button type="submit" className="btn btn-primary btn-lg btn-block margin-top10">UPDATE MOVIE</button>
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
