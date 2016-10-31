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

  saveTodo(text) {
    // console.log("Inside TodoStore.saveTodo");
    const id = Date.now();
    this.todos.push({
      id,
      text,
      complete: false,
    });
    this.emit("change");
  }

  deleteTodo(id) {
    // console.log("Inside TodoStore.deleteTodo()");
    var index = this.todos.findIndex(x => x.id === id);
    this.todos.splice(index, 1);
    this.emit("change");
  }

  toggleEdit(id)  {
    // console.log("Inside TodoStore.toggleEdit()");
    var index = this.todos.findIndex(x => x.id === id);
    this.todos[index].edit = !this.todos[index].edit;
    this.emit("change");
  }

  toggleComplete(id) {
    // console.log("Inside TodoStore.toggleComplete()");
    var index = this.todos.findIndex(x => x.id === id);
    this.todos[index].complete = !this.todos[index].complete;
    this.emit("change");
  }

  getAll() {
    // console.log("Inside TodoStore.getAll()");
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case "SAVE_TODO": {
        // console.log("SAVE_TODO action called");
        this.saveTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        // console.log("RECEIVE_TODOS action called");
        this.todos = action.todos;
        this.emit("change");
        break;
      }
      case "DELETE_TODO": {
        // console.log("DELETE_TODO action called");
        this.deleteTodo(action.id);
        break;
      }
      case "TOGGLE_EDIT": {
        // console.log("TOGGLE_EDIT action called");
        this.toggleEdit(action.id);
        break
      }
      case "TOGGLE_COMPLETE": {
        // console.log("TOGGLE_COMPLETE action called");
        this.toggleComplete(action.id);
        break
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;

