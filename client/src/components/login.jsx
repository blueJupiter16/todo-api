import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = param => event => {
    //
    if (param === 'email') {
      this.setState({ email: event.target.value });
    } else if (param === 'password') {
      this.setState({ password: event.target.value });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form
          className="form-signin"
          onSubmit={e =>
            this.props.onSubmit(
              e,
              this.state.email,
              this.state.password,
              '/api/users/login'
            )
          }
        >
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.handleChange('email')}
            //required
            autofocus
          />
          <label for="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            required
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>

          <a className="pull-right" onClick={() => this.props.signup()}>
            New? SignUp
          </a>
        </form>
      </React.Fragment>
    );
  }
}
