import React from 'react';
import { PropTypes } from 'prop-types';


const AdminCast = (props) => {
  const handleClick= (event) => {
    event.preventDefault();
    props.handleClick(props.id);
  };

  return(
    <div className="cast-preview">
      <span>{props.name}</span>
      <span onClick={handleClick} className="delete-cast"><i className="fa fa-times" aria-hidden="true"></i></span>
    </div>
  );
};
AdminCast.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
export default AdminCast;
