import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
class LoginUser extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false,
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandlerLogin = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post('http://localhost:5000/users/login', this.state, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 'success') {
          const IDToken = `Bearer ${res.data.token}`;
          localStorage.setItem('IDToken', IDToken);
          this.setState({ loggedIn: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form-container sign-in-container">
        <form onSubmit={this.submitHandlerLogin}>
          <h1>Login</h1>
          <span>or use your account</span>
          <input
            type="email"
            name="email"
            onChange={this.changeHandler}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={this.changeHandler}
            placeholder="Password"
          />
          <Link to="#">Forgot your password?</Link>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginUser;
