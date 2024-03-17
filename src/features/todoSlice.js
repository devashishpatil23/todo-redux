import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [{ id: 1, text: "apple" }];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.fliter((todo) => todo.id !== action.payload);
    },
  },
});
