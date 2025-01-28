
import { useState } from 'react';
import { useTodos } from '../../context/index.ts';
import { TODO } from './todo.ts'
function TodoItem( todo: TODO) {
    const {id, value, isCompleted, isTodoEditable} = todo;

    const {deleteTodo, updateTodo, toggleComplete, toggleEditable} = useTodos()
    const [msg, setMsg] = useState(value);

    return (
        <div key={id} className={`flex w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`} >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.isCompleted}
                onChange={() => toggleComplete(id)}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${ isTodoEditable ? "border-black/10 px-2" : "border-transparent" } ${todo.isCompleted ? "line-through" : ""}`}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (isCompleted) return;
                    if (isTodoEditable)  {
                        updateTodo(id, {...todo, value: msg});
                        toggleEditable(id)
                    }
                    else toggleEditable(id);
                }}
                disabled={todo.isCompleted}>
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0" 
                onClick={() => deleteTodo(todo.id)}>
                ❌ 
            </button>
        </div>
    );
}

export default TodoItem;