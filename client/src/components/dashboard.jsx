import React, { Component } from 'react';
import Todo from './todo';
import CreateTodo from './createtodo';
import './dashboard.css';

const _ = require('lodash');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth', this.props.xauthToken);

    const options = {
      method: 'GET',
      headers
    };
    const request = new Request('/api/todos', options);

    fetch(request)
      .then(resp => {
        if (resp.status === 400) {
          return Promise.reject('Bad Request');
        } else {
          return Promise.resolve(resp.json());
        }
      })
      .then(body => {
        var bd = [];
        bd = Object.keys(body).map(i => {
          return body[i];
        });
        this.setState({ todos: bd });
        //console.log(this.state);
      })
      .catch(err => {
        //console.log(err);
      });
  }

  handleDelete = id => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth', this.props.xauthToken);

    const options = {
      method: 'DELETE',
      headers
    };
    const request = new Request('/api/todos/' + id, options);
    //console.log('Delete-',request);
    fetch(request)
      .then(resp => {
        if (resp.status === 400) {
          return Promise.reject('Bad Request');
        } else {
          return Promise.resolve(resp.json());
        }
      })
      .then(body => {
        //console.log('body', body.todo);
        //console.log('todos', this.state.todos);
        var t = _.remove(this.state.todos, todo => {
          return todo._id !== body.todo._id;
        });
        //console.log(t);
        this.setState({ todos: t });
        //console.log(this.state);
      })
      .catch(err => {
        //console.log(err);
      });
  };

  saveTodo = text => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth', this.props.xauthToken);

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        text: text
      })
    };
    const request = new Request('/api/todos', options);
    //console.log('Create',request);
    fetch(request)
      .then(resp => {
        if (resp.status === 400) {
          return Promise.reject('Bad Request');
        } else {
          return Promise.resolve(resp.json());
        }
      })
      .then(body => {
        //console.log('body ', body);
        var bd = [];
        bd = _.concat(this.state.todos, body);
        this.setState({ todos: bd });
        //console.log('after concat ', bd);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="filler" />
        <div className="logout">
          <button
            type="button"
            className="btn btn-default btn-sm"
            onClick={this.props.onSignOut}
          >
            <span className="glyphicon glyphicon-log-out">Log out</span>
          </button>
        </div>

        <div className="row">
          <CreateTodo onSave={this.saveTodo} />
        </div>
        {this.state.todos.map((obj, index) => {
          return (
            <Todo
              key={obj._id}
              todo={obj}
              xauthToken={this.props.xauthToken}
              onDelete={this.handleDelete}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Dashboard;
