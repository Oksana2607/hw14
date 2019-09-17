import React, { Component } from 'react';

export class Login extends Component {
  state = {
    email: '',
    password: ''
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
      email: '',
      password: ''
    }));
    this.props.changeActiveModule('main');
    this.props.changeActiveComponent('usersTable');
  };

  render() {
    return (
      <div className="container" id="container">
        <div className="container__button" action="#">
          <button className="button__log-in button" onClick="location.href='index.html'">Log In</button>
          <button className="button__sign-in button" onClick="location.href='signIn.html'">Sign In</button>
        </div>
        <form className="container-log-in" id="logIn" onSubmit={this.handleSubmit}>
          <div className="form__log-in log-in">

            <div className="log-in__Email form_block">
              <label htmlFor="email_log" className="input-label">e-mail</label>
              <input
                type="email_log"
                id="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className="log-in__password form_block">
              <label htmlFor="password_log" className="input-label">password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form__buttonSubmit buttonSubmit">
            <button
              className="buttonSubmit__log-in submit__button"
              id="submitBtn"
              onClick={this.handleClick}
            >
              Submit
            </button>
          </div>
          <div className="form__error" id="error" />
        </form>
      </div>
    );
  }
}
