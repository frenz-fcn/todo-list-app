import React, { useState, useContext, Fragment, useRef } from "react";
import { Switch } from "@headlessui/react";
import Context from "../context";
import { Dialog, Transition } from "@headlessui/react";

export default function ListItem({ todo }) {
  const { dispatch } = useContext(Context);

  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef();
  const [showAlert, setShowAlert] = useState(false);

  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }

  function updateTodo() {
    if (title.length === 0) {
      alert("Title should not be empty.");
    } else {
      dispatch({
        type: "UPDATE_TODO",
        title: title,
        description: description,
      });
      setTitle("");
      setDescription("");
      closeModal();
    }
  }

  function updateStatus(status, title, description) {
    dispatch({ type: "SET_CURRENT_TODO", payload: todo });
    if (status === "Pending") {
      dispatch({
        type: "UPDATE_TODO",
        title: title,
        description: description,
        status: "Done",
      });
      setEnabled(true);
    } else {
      dispatch({
        type: "UPDATE_TODO",
        title: title,
        description: description,
        status: "Pending",
      });
      setEnabled(false);
    }
  }

  return (
    <>
      <tr>
        <td className="px-6 py-4 font-medium text-center">{todo.title}</td>
        <td className="px-6 py-4 text-left">{todo.description}</td>
        <td className="px-6 py-4 text-center">
          <Switch
            checked={enabled}
            onChange={() =>
              updateStatus(todo.status, todo.title, todo.description)
            }
            className={`${
              todo.status === "Done" ? "bg-green-500" : "bg-yellow-600"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                todo.status === "Done" ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-300`}
            />
          </Switch>
          <p>{todo.status}</p>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <div class="inline-flex">
            <button
              className="bg-yellow-300 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-l"
              onClick={() => {
                dispatch({ type: "SET_CURRENT_TODO", payload: todo });
                setTitle(todo.title);
                setDescription(todo.description);
                openModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-r"
              onClick={() => {
                setTitle(todo.title);
                setDescription(todo.description);
                setShowAlert(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </td>

        {showAlert && (
          <div className="text-white py-4 border-0 rounded relative mb-4 bg-red-500">
            <span className="text-xl inline-block align-middle">
              <i className="fas fa-bell" />
            </span>
            <span className="inline-block align-middle mr-8">
              You want to delete this item?
            </span>

            <div class="inline-flex">
              <button
                class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-l"
                onClick={() => {
                  dispatch({ type: "DELETE_TODO", payload: todo.title });
                  setShowAlert(false);
                }}
              >
                Yes
              </button>
              <button
                class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-r"
                onClick={() => setShowAlert(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </tr>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Todo
                </Dialog.Title>

                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="todo-title"
                      type="text"
                      placeholder="Enter todo title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      rows="5"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="todo-desc"
                      type="text"
                      placeholder="Enter todo description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={updateTodo}
                  >
                    Update
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
