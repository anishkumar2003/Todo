import React, { useEffect, useState } from "react";
import TodoForm from "./Componenets/Todoformui/TodoForm";
import TodoItem from "./Componenets/Todoui/TodoItem";
import { TodoProvider } from "./Context/index";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev,{ id: Date.now(), ...todo }]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevtodo) => (todo.id === id ? todo : prevtodo))
    );
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((prevtodo) => {
        if (prevtodo.id === id) {
          return { ...prevtodo, completed: !prevtodo.completed };
        }
        return prevtodo;
      })
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)), [todos];
  });

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full md:max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}
