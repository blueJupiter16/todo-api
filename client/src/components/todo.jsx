import React, { Component } from 'react';
import './todo.css';
import Card from '@material-ui/core/Card';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.todo.completed
    };
  }

  handlePatch = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth', this.props.xauthToken);

    const options = {
      method: 'PATCH',
      headers,
      body: {
        completed: true
      }
    };

    const request = new Request('/api/todos/' + this.props.todo._id, options);
    console.log(request);
    fetch(request)
      .then(resp => {
        if (Math.floor(resp.status / 100) === 4) {
          return Promise.reject('Bad Request');
        } else {
          return Promise.resolve(resp.json());
        }
      })
      .then(body => {
        this.setState({ completed: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          {this.renderCompletedContent()}

          <button
            onClick={() => this.props.onDelete(this.props.todo._id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderCompletedContent() {
    var returnVal = '';
    if (!this.state.completed) {
      returnVal = (
        <React.Fragment>
          <p className="lead">{this.props.todo.text}</p>
          <button
            onClick={this.handlePatch}
            type="button"
            class="btn btn-success"
          >
            Mark as completed
          </button>
        </React.Fragment>
      );
    } else {
      returnVal = (
        <React.Fragment>
          <p className="lead">
            <s>{this.props.todo.text}</s>
          </p>
        </React.Fragment>
      );
    }

    return returnVal;
  }
}

export default Todo;
