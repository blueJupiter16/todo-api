import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import SignUp from './components/signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'login',
      xauth: ''
    };
  }

  handleSubmit = (event, email, password, route) => {
    //console.log('handleSubmit');
    var token = '';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    const request = new Request(route, options);

    fetch(request)
      .then(resp => {
        if (resp.status === 400) {
          return Promise.reject('Bad Request');
        } else {
          token = resp.headers.get('X-Auth');
          //console.log(resp);
          return Promise.resolve(resp.json());
        }
      })
      .then(body => {
        //console.log(body.email);
        this.setState({ screen: 'dashboard', xauth: token, email: body.email });
        //console.log(this.state);
      })
      .catch(err => {
        //console.log(err);
        alert(err);
      });

    event.preventDefault();
  };

  handleSignUp = () => {
    this.setState({ screen: 'signup' });
  };

  handleSignIn = () => {
    this.setState({ screen: 'login' });
  };

  handleSignOut = () => {
    this.setState({ screen: 'login', xauth: '', email: '' });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">{this.renderState(this.state.screen)}</div>
      </React.Fragment>
    );
  }

  renderState(state) {
    if (state === 'login') {
      return <Login onSubmit={this.handleSubmit} signup={this.handleSignUp} />;
    } else if (state === 'signup') {
      return <SignUp onSubmit={this.handleSubmit} signin={this.handleSignIn} />;
    } else {
      return (
        <Dashboard
          onSignOut={this.handleSignOut}
          xauthToken={this.state.xauth}
        />
      );
    }
  }
}

export default App;
