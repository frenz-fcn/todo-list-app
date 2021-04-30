import React from "react";

const NotesContext = React.createContext({
  currentTodo: null,
  todos: [
    { title: "Todo 1", description: "Sample todo 1 description...", status: "Pending" },
    { title: "Todo 2", description: "Sample todo 1 description...", status: "Pending" },
    { title: "Todo 3", description: "Sample todo 1 description...", status: "Done" }, 
  ],
});

export default NotesContext;
