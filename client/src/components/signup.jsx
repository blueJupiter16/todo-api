import React, { Component } from 'react';
import './signup.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repassword: ''
    };
  }

  handleChange = param => event => {
    //
    if (param === 'email') {
      this.setState({ email: event.target.value });
    } else if (param === 'password') {
      this.setState({ password: event.target.value });
    } else {
      this.setState({ repassword: event.target.value });
    }
  };

  checkPasswords(e) {
    if (this.state.password === this.state.repassword) {
      this.props.onSubmit(
        e,
        this.state.email,
        this.state.password,
        '/api/users'
      );
    } else {
      alert('Passwords DO Not match');
    }
    e.preventDefault();
  }
  render() {
    return (
      <React.Fragment>
        <form className="form-signup" onSubmit={e => this.checkPasswords(e)}>
          <h1 className="h3 mb-3 font-weight-normal">SignUp</h1>
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
            required
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
          <label for="inputPasswordAgain" className="sr-only">
            Re-enter Password
          </label>
          <input
            type="password"
            id="inputPasswordAgain"
            className="form-control"
            placeholder="Re-enter Password"
            value={this.state.repassword}
            onChange={this.handleChange('repassword')}
            required
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign Up
          </button>

          <a className="pull-right" onClick={() => this.props.signin()}>
            Already have an account? SignIn
          </a>
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
