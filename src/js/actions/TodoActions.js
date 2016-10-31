import dispatcher from "../dispatcher";

export function saveTodo(text) {
  // console.log("Inside TodoActions.saveTodo()");
  dispatcher.dispatch({
    type: "SAVE_TODO",
    text,
  });
}

export function deleteTodo(id) {
  // console.log("Inside TodoActions.deleteTodo()");
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id,
  });
}

export function toggleEdit(id) {
  // console.log("Inside TodoActions.toggleEdit()");
  dispatcher.dispatch({
    type: "TOGGLE_EDIT",
    id,
  });
}

export function toggleComplete(id) {
  // console.log("Inside TodoActions.toggleComplete()");
  dispatcher.dispatch({
    type: "TOGGLE_COMPLETE",
    id,
  });
}

export function reloadTodos() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  // console.log("Inside TodoActions.reloadTodos()");
  dispatcher.dispatch({type: "FETCH_TODOS"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
      {
        id: 8484848484,
        text: "Go Shopping Again",
        complete: false
      },
      {
        id: 6262627272,
        text: "Hug Wife",
        complete: true
      },
    ]});
  }, 1000);
}

