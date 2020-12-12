import React, { Component } from 'react';
import './../Login.css';
import LoginUser from './../components/LoginUser';
import SignupUser from './../components/SignupUser';
class Login extends Component {
  state = {
    isOpen: false,
  };
  changeHandlerSignup = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="fluid">
        <div
          className={
            this.state.isOpen ? 'container' : 'container right-panel-active'
          }
          id="container"
        >
          <SignupUser />
          <LoginUser />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost btn"
                  id="signIn"
                  onClick={this.changeHandlerSignup}
                >
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, World!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost btn"
                  id="signUp"
                  onClick={this.changeHandlerSignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
