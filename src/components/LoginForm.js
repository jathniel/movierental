import React from 'react';
import { PropTypes } from 'prop-types';

const LoginForm = ({
  submitLogin,
  username,
  password,
  error,
  handleChange
}) => {
  return(
    <form onSubmit={submitLogin}>
      <div className="form-group">
       <input type="text"
       name="username"
       value={username} onChange={handleChange}
       className="form-control input input-lg margin-bottom10"
       id="username" placeholder="Username"/>
       </div>
       <div className="form-group">
         <input type="password" name="password" value={password} onChange={handleChange} className="form-control input input-lg margin-bottom10" id="username" placeholder="Enter Password"/>
      </div>
      {error ? <p className="error" >Wrong Credentials</p> : null }
      <button type="submit" className="btn btn-primary btn-lg btn-block margin-top10">LOGIN</button>
    </form>
  );
};
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  submitLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default LoginForm;
