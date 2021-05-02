import React, { useContext, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Context from "./context";
import Reducer from "./reducer";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  console.log(state);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <AddTodo />
      <Header />
      <TodoList />
    </Context.Provider>
  );
}

export default App;
