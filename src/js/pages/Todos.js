import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount() {
    // console.log("Inside Todos.componentWillMount()");
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    // console.log("Inside Todos.componentWillUnmount()");
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    // console.log("Inside Todos.getTodos()");
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  saveTodo() {
    // console.log("Inside Todos.saveTodo()");
    const saveInput = this.refs.saveInput;
    const task = saveInput.value;

    TodoActions.saveTodo(task);

    this.refs.saveInput.value = '';
  }

  reloadTodos() {
    // console.log("Inside Todos.reloadTodos()");
    TodoActions.reloadTodos();
  }

  render() {
    // console.log("Inside Todos.render()");
    const buttonStyle = { margin: "10px" };

    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <form onSubmit={this.saveTodo.bind(this)}>
          <input type="text" placeholder="add a task" ref="saveInput" />
          <button class="btn btn-success btn-sm" style={buttonStyle}>Save</button>
        </form>
        <br />
        <button onClick={this.reloadTodos.bind(this)} class="btn btn-default btn-sm" >Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}

