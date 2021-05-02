import React from "react";

const NotesContext = React.createContext({
  currentTodo: null,
  todos: [],
  currentTodos: [],
});

export default NotesContext;
