import React from "react";

import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";

export default class Todo extends React.Component {
  constructor(props) {
    super();
  }

  deleteTodo() {
    TodoActions.deleteTodo(this.props.id);
  }

  editTodo() {
    TodoActions.editTodo(this.props.id);
  }

  toggleComplete() {
    TodoActions.toggleComplete(this.props.id);
  }

  render() {
    const buttonStyle = { margin: "5px" };

    const { complete, edit, text, id } = this.props;

    const icon = complete ? "\u2714" : "\u2716"

    if (edit) {
      return (
        <li>
          <input value={text} focus="focused"/>
        </li>
      );
    }

    return (
      <li>
        <span>{text}</span>
        <span onClick={this.toggleComplete.bind(this)} class="btn btn-default btn-xs" style={buttonStyle}>{icon}</span>
        <button onClick={this.editTodo.bind(this)} class="btn btn-primary btn-sm" style={buttonStyle}>Edit</button>
        <button onClick={this.deleteTodo.bind(this)} class="btn btn-danger btn-sm" style={buttonStyle}>Delete</button>
      </li>
    );
  }
}