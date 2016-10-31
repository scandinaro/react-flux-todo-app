import React from "react";

import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteTodo() {
    // console.log("Inside Todo.deleteTodo()");
    TodoActions.deleteTodo(this.props.id);
  }

  toggleEdit() {
    // console.log("Inside Todo.toggleEdit()");
    TodoActions.toggleEdit(this.props.id);
  }

  toggleComplete() {
    // console.log("Inside Todo.toggleComplete()");
    TodoActions.toggleComplete(this.props.id);
  }

  handleChange(e) {
    // console.log("Inside Todo.handleChange()");
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    // console.log("Inside Todo.handleSubmit()");
    e.preventDefault();
    let text = this.state.value;
    let id = this.props.id;
    this.todos = [
      {
        id: id,
        text: text,
      },
    ];
    // this is poorly written, should just call TodoActions.updateTodo, but not sure how to go about
    // that with the way the array was initally set up.
    TodoActions.saveTodo(text);
    TodoActions.deleteTodo(id);
  }

  render() {
    // console.log("Inside Todo.render()");
    const buttonStyle = { margin: "5px" };

    const { complete, edit, text, id } = this.props;

    const icon = complete ? "\u2714" : "\u2716"

    if (edit) {
      return (
        <li>

            <input 
              onChange={this.handleChange.bind(this)} 
              value={this.state.value} 
              focus="focused" 
              placeholder={text}
            />
            <button onClick={this.toggleEdit.bind(this)} class="btn btn-default btn-sm" style={buttonStyle}>Cancel</button>
            <button onClick={this.handleSubmit.bind(this)} class="btn btn-success btn-sm" style={buttonStyle}>Update</button>

        </li>
      );
    }

    return (
      <li>
        <span>{text}</span>
        <span onClick={this.toggleComplete.bind(this)} class="btn btn-default btn-xs" style={buttonStyle}>{icon}</span>
        <button onClick={this.toggleEdit.bind(this)} class="btn btn-primary btn-sm" style={buttonStyle}>Edit</button>
        <button onClick={this.deleteTodo.bind(this)} class="btn btn-danger btn-sm" style={buttonStyle}>Delete</button>
      </li>
    );
  }
}

