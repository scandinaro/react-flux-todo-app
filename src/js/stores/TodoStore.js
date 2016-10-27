import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();
    this.todos.push({
      id,
      text,
      complete: false,
    });
    this.emit("change");
  }

  deleteTodo(id) {
    var index = this.todos.findIndex(x => x.id === id);
    this.todos.splice(index, 1);
    this.emit("change");
  }

  editTodo(id)  {
  
  }

  toggleComplete(id) {
    var index = this.todos.findIndex(x => x.id === id);
    this.todos[index].complete = !this.todos[index].complete;
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.id);
        break;
      }
      case "EDIT_TODO": {
        this.editTodo(action.id);
        break
      }
      case "UPDATE_TODO": {
        this.updateTodo(action.id);
        break
      }
      case "TOGGLE_COMPLETE": {
        this.toggleComplete(action.id);
        break
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;