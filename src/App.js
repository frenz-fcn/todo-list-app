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
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="App">
        <AddTodo />
        <Header />
        <TodoList />
      </div>
    </Context.Provider>
  );
}

export default App;
