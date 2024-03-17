import React, { useEffect, useState } from "react";
import TodoForm from "./Componenets/Todoformui/TodoForm";
import TodoItem from "./Componenets/Todoui/TodoItem";
import { TodoProvider } from "./Context/index";
import ThemeBtn from "./Componenets/ThemeBtn/ThemeBtn"; // Import ThemeBtn
import { ThemeProvider } from "./Context/Theme";
import SystemNotification from "./Componenets/Notification/SystemNotification";

export default function App() {
  let th=localStorage.getItem("theme");
  const [theme, setTheme] = useState(th ? th : "light");

  const darkTheme = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  const lightTheme = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  // Existing state and functions for todos
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
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
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}
    >
      <ThemeProvider value={{ theme, darkTheme, lightTheme }}>
        <div className="min-h-screen py-8 dark:bg-[#172842]">
          <div className="w-full md:max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 dark:text-white">
            <div className="heading grid grid-cols-7">
              <h1 className="text-3xl font-bold text-center mb-4 col-span-6">
                Todo App
              </h1>
              <ThemeBtn /> {/* Include ThemeBtn here */}
              <SystemNotification/>
            </div>
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
      </ThemeProvider>
    </TodoProvider>
  );
}
