import { nanoid } from "nanoid";

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: nanoid(2),
        title: action.title,
        description: action.description,
        status: action.status,
      };

      const addedTodo = [...state.todos, newTodo];

      return {
        ...state,
        todos: addedTodo,
        currentTodos: addedTodo,
      };
    case "DELETE_TODO":
      const deletedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );

      return {
        ...state,
        todos: deletedTodos,
        currentTodos: deletedTodos,
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload,
      };
    case "UPDATE_TODO":
      const updatedTodo = {
        ...state.currentTodo,
        title: action.title,
        description: action.description,
        status: action.status,
      };

      const findTodoIndex = state.todos.findIndex(
        (todo) => todo.id === state.currentTodo.id
      );

      const updatedTodos = [
        ...state.todos.slice(0, findTodoIndex),
        updatedTodo,
        ...state.todos.slice(findTodoIndex + 1),
      ];

      return {
        currentTodo: null,
        todos: updatedTodos,
        currentTodos: updatedTodos,
      };
    case "SORT_ASC_TODO":
      const sortedAsc = state.todos.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });

      return {
        todos: sortedAsc,
      };
    case "SORT_DESC_TODO":
      const sortedDesc = state.todos.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });

      return {
        todos: sortedDesc,
      };
    case "SORT_ASC_STATUS":
      const sortedAscTodos = state.todos.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        return 0;
      });

      return {
        todos: sortedAscTodos,
      };
    case "SORT_DESC_STATUS":
      const sortedDescTodos = state.todos.sort((a, b) => {
        if (a.status > b.status) {
          return -1;
        }
        return 0;
      });

      return {
        todos: sortedDescTodos,
      };
    default:
      return state;
  }
}
