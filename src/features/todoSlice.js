import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load todos from localStorage if available, otherwise set initial state
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [{ id: 1, text: "apple", isEdit: false }]
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload };
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, isEdit: true } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.isEdit ? { ...todo, text: action.payload, isEdit: false } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, updateTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
