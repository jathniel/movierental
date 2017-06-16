import React,{ Component } from 'react';
import { PropTypes } from 'prop-types';
import * as api from '../api';
class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
    };
  }
  uploadRequest({ file }) {
    let data = new FormData();
    data.append('file', file);
    api.uploadFile(data)
    .then(res => {
      this.setState({img: res});
      this.props.updateImage(res);
    });
  }

  render() {
    const handleFileUpload = (e) => {
      let file = e.target.files[0];
      this.uploadRequest({file});
    };
    return(
      <div>
        <label className="btn btn-default btn-file margin-bottom10">
            Browse <input type="file" onChange={handleFileUpload} className="hidden"/>
        </label>
        {this.state.img ? <img src={this.state.img} className="preview-image"/>: ''}
      </div>
    );
  }
}
UploadFile.propTypes = {
  updateImage: PropTypes.func,
  className: PropTypes.string
};
export default UploadFile;
