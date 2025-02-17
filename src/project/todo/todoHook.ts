import { useEffect, useState } from "react";
import { TODO } from "./todo";

export default function useTodo() {
  const [todos, setTodos] = useState<TODO[]>(() => {
    const fetchedTodos = localStorage.getItem("todos");
    if (!fetchedTodos) return [];
    return JSON.parse(fetchedTodos);
  });

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (value: string) => {
    const newTodo = {
      id: Date.now(),
      value,
      isCompleted: false,
      isTodoEditable: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: number, updatedTodo: TODO) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const toggleEditable = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isTodoEditable: !todo.isTodoEditable }
          : todo,
      ),
    );
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    toggleEditable,
  };
}
