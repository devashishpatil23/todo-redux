import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../features/todoSlice";
import { useState, useEffect } from "react";

function AddTodo() {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!input) return;
    dispatch(addTodo(input));
    setInput("");
  };

  const updateTodoHandler = (e) => {
    e.preventDefault();
    dispatch(updateTodo(input));
    setInput("");
    setEditMode(false);
  };

  useEffect(() => {
    todos.map((todo) => {
      if (todo.isEdit) {
        setInput(todo.text);
        setEditMode(true);
      }
    });
  }, [todos]);
  return (
    <>
      <form
        onSubmit={editMode ? updateTodoHandler : addTodoHandler}
        className="space-x-3 mt-12"
      >
        <h1 className="my-3 text-4xl text- ">Todo list with redux toolkit</h1>
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter a Todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {editMode ? "Save" : "Add"}
        </button>
      </form>
    </>
  );
}

export default AddTodo;
