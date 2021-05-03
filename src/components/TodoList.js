import React, { useContext, useState, useEffect } from "react";
import Todo from "./Note";
import Context from "../context";

export default function TodoList() {
  const { state, dispatch } = useContext(Context);
  const [todos, setTodos] = useState(state.todos);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortAscStatus, setSortAscStatus] = useState(true);
  const [search, setSearch] = useState("");

  function sortTodo(column) {
    if (column === "Title") {
      if (sortAsc === true) {
        dispatch({
          type: "SORT_ASC_TODO",
          payload: state,
        });
        setSortAsc(false);
      } else {
        dispatch({
          type: "SORT_DESC_TODO",
          payload: state,
        });
        setSortAsc(true);
      }
    } else {
      if (sortAscStatus === true) {
        dispatch({
          type: "SORT_ASC_STATUS",
          payload: state,
        });
        setSortAscStatus(false);
      } else {
        dispatch({
          type: "SORT_DESC_STATUS",
          payload: state,
        });
        setSortAscStatus(true);
      }
    }
  }

  function handleSearchTodo() {
    setTodos(
      state.todos.filter((todo) => {
        if (
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.title.toUpperCase().includes(search.toUpperCase())
        ) {
          return todo;
        }
      })
    );

    return todos.map((todo) => {
      <Todo todo={todo} />;
    });
  }

  useEffect(() => {
    const timeOut = setTimeout(() => handleSearchTodo(), 100);
    return () => clearTimeout(timeOut);
  }, [search]);

  useEffect(() => {
    setTodos(state.todos);
  }, [state.todos]);

  return (
    <div className="md:mx-auto">
      <input
        className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="search-todo"
        type="text"
        placeholder="Search todo here..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-md font-medium text-black tracking-wider"
                    >
                      Title
                      <button
                        type="button"
                        className="hover:bg-gray-300 text-gray-500 px-1 py-1 rounded-full"
                        onClick={() => sortTodo("Title")}
                      >
                        {sortAsc === true ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-md font-medium text-black tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-md font-medium text-black tracking-wider"
                    >
                      Status
                      <button
                        type="button"
                        className="hover:bg-gray-300 text-gray-500 px-1 py-1 rounded-full"
                        onClick={() => sortTodo("Status")}
                      >
                        {sortAscStatus === true ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-md font-medium text-black tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todos.map((todo) => {
                    return <Todo todo={todo} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
