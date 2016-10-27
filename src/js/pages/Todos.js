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
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  createTodo() {
    const createInput = this.refs.createInput;
    const task = createInput.value;

    TodoActions.createTodo(task);

    this.refs.createInput.value = '';
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const buttonStyle = { margin: "10px" };

    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <form onSubmit={this.createTodo.bind(this)}>
          <input type="text" placeholder="add a task" ref="createInput" />
          <button class="btn btn-success btn-sm" style={buttonStyle}>Create</button>
        </form>
        <br />
        <button onClick={this.reloadTodos.bind(this)} class="btn btn-primary btn-sm" >Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}