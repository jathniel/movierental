import React from 'react';
import { PropTypes } from 'prop-types';
import { Input } from 'valuelink/tags';
const TextInput = ({...props}) => {

  return(
    <div className="form-group">
      <Input {...props} />
    </div>
  );
};
TextInput.propTypes = {
  valueLink: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};
export default TextInput;
