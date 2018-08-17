import React, { Component } from 'react';
import './createtodo.css';

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleChange = param => event => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <textarea
            placeholder="Create a todo"
            className="save-text"
            onChange={this.handleChange(this.event)}
          />
          <br />
          <button
            onClick={() => {
              this.props.onSave(this.state.text);
              this.setState({ text: '' });
            }}
            type="button"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateTodo;
