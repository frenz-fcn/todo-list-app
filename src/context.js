// import { createContext } from "react";

// const Context = createContext({
//   currentTodo: null,
//   todos: [],
// });

// export default Context;

import React from "react";

const NotesContext = React.createContext({
  currentTodo: null,
  todos: [
    { title: "E", description: "EE", status: "Pending" },
    { title: "C", description: "CC", status: "Pending" },
    { title: "A", description: "AA", status: "Pending" },
    { title: "B", description: "BB", status: "Pending" },
    { title: "D", description: "DD", status: "Pending" },
  ],
});

export default NotesContext;
