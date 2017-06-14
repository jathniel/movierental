import React from 'react';
import { PropTypes } from 'prop-types';


const ValidateInput = ({
  name,
  placeholder,
  type,
  value,
  onChange
}) => {
  const validate = (value) => {
    if (value || value === '') {
      return false;
    }
    return true;
  };
  const checkValue = (event) => {
    onChange(event);
    return validate(event.target.value);
  };
  return(
    <input type={type}
    name={name}
    value={value}
    className='form-control'
    placeholder={placeholder}
    onChange={checkValue}
    />
  );
};
ValidateInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
export default ValidateInput;
