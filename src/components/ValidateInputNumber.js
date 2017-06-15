import React from 'react';
import { PropTypes } from 'prop-types';


const ValidateInputNumber = ({
  name,
  placeholder,
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
    <input type="number"
    name={name}
    value={value}
    className='form-control'
    placeholder={placeholder}
    onChange={checkValue}
    />
  );
};
ValidateInputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
export default ValidateInputNumber;
