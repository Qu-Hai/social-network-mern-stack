import axios from 'axios';
import React, { Component } from 'react';

class SignupUser extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandlerSignup = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post('http://localhost:5000/users/signup', this.state)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="form-container sign-up-container">
        <form onSubmit={this.submitHandlerSignup}>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="Name"
          />
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
          <input
            type="password"
            name="passwordConfirm"
            onChange={this.changeHandler}
            placeholder=" Confirm Password"
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignupUser;
