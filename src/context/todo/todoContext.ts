import { TODO } from "../../project/todo/todo";
import React, { useContext } from "react";

const TodosContext = React.createContext( {
    todos: [] as TODO[],
    addTodo: (value: string) => {},
    updateTodo: (id:number, todo: TODO) => {},
    deleteTodo: (id:number) => {},
    toggleComplete: (id: number) => {},
    toggleEditable: (id: number) => {},
})

const TodoProvider = TodosContext.Provider

const useTodos = () => {
   return useContext(TodosContext);
}

export {
    TodosContext,
    TodoProvider,
    useTodos
}