import React, { Component } from 'react';

export class Signin extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleClick = () => {
    this.setState(state => ({
      ...state,
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }));
    this.props.changeActiveModule('login');
  };

  validateForm() {
    return this.state.email.length > 0
        && this.state.password.length > 0
        && this.state.password === this.state.confirmPassword;
  }

  render() {
    return (
      <div className="container" id="container">
        <div className="container__button" action="#">
          <button className="button__log-in button" onClick={() => this.handleClick('login')}>Log In</button>
          <button className="button__sign-in button" onClick={() => this.handleClick('signin')}>Sign In</button>
        </div>
        <form id="signIn" className="form__sing-in" onSubmit={this.handleSubmit}>
          <div className="form__sing-in sign-in">
            <div className="sign-in__Name form_block">
              <label htmlFor="name" className="input-label">name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="sign-in__Email form_block">
              <label
                htmlFor="email"
                className="input-label"
              >
                e-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="sign-in__password form_block">
              <label
                htmlFor="password"
                className="input-label"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="sign-in__confirmPassword form_block">
              <label
                htmlFor="confirm_password"
                className="input-label"
              >
                  confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            <div className="form__buttonSubmit buttonSubmit">
              <button
                className="buttonSubmit__sign-in submit__button"
                id="submitBtnSignIn"
                onClick={this.handleClick}
                disabled={!this.validateForm()}
              >
                  Submit
              </button>
            </div>
            <div className="form__error" id="error" />
          </div>
        </form>
      </div>
    );
  }
}
