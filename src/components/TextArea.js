import React from 'react';
import { PropTypes } from 'prop-types';
import { TextArea } from 'valuelink/tags';
const FormTextArea = ({...props}) => {

  return(
    <div className="form-group">
      <TextArea {...props}/>
    </div>
  );
};
FormTextArea.propTypes = {
  valueLink: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};
export default FormTextArea;
