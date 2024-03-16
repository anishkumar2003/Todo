import { createContext, useContext } from "react";
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      msg: "Learn React",
      completed: false,
    },
    {
      id: 2,
      msg: "Learn Tailwind",
      completed: false,
    },
    {
      id: 3,
      msg: "Learn Firebase",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, todo) => {},
  toggleCompleted: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};
export const TodoProvider = TodoContext.Provider;
