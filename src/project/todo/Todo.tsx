import Input_Form from "../../components/Input_Form";
import TodoItem from "./Todo_Item";
import { TodoProvider } from "../../context/index.ts";
import useTodo from "./todoHook.ts";

export default function Todo() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    toggleEditable,
  } = useTodo();

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        toggleEditable,
      }}
    >
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
          <Input_Form onSubmitAction={addTodo} />
        </div>
        <div className="flex flex-col gap-y-3 h-full">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo}></TodoItem>
          ))}
        </div>
      </div>
    </TodoProvider>
  );
}
