import React,{ Component } from 'react';
// import { PropTypes } from 'prop-types';
import LoginForm from './loginForm';
import * as api from '../api';
class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false
  }

  submitLogin = (event) => {
    event.preventDefault();
    this.checkLogin(this.state.username, this.state.password);
  };
  checkLogin = (username, password) => {
    api.checkLogin(username, password)
    .then(() => {
      this.setState({error: false});
      window.location = '/movies';
    })
    .catch((e) => {
      console.error(e);
      this.setState({error: true});
    });
  };
  handleChange = (event) => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  render() {

    return (
      <div className="login">
        <div className="row margin-0">
          <div className="col-xs-12 col-sm-6 login-container text-center">
            <div className="login-details">
              <h3>Sign In</h3>
              <LoginForm
                username={this.state.username}
                password={this.state.password}
                error={this.state.error}
                submitLogin={this.submitLogin}
                handleChange={this.handleChange}
                />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 login-image"></div>
        </div>
      </div>
    );
  }
}

export default Login;
