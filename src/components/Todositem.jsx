import React, { useState } from 'react';
import { useTodo } from '../Context';
function TodoItem({ todo }) {
    const [istodoeditable, setistodoeditable] = useState(false)
    const [todomsg, settodomsg] = useState(todo.todo)
    const {updatedtodo,deletetodo,togglecomplete} = useTodo()

      const editTodo = () => {
    updatedtodo(todo.id, {...todo, todo: todomsg})
    setistodoeditable(false)
  }
  const togglecompleted = () => {
    //console.log(todo.id);
    togglecomplete(todo.id)
  }


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/20 duration-300  text-black ${
                todo.complete ? "bg-[#697099]" : "bg-[#ede3ed]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.complete}
                onChange={togglecompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    istodoeditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.complete ? "line-through" : ""}`}
                value={todomsg}
                onChange={(e) => settodomsg(e.target.value)}
                readOnly={!istodoeditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.complete) return;

                    if (istodoeditable) {
                        editTodo();
                    } else setistodoeditable((prev) => !prev);
                }}
                disabled={todo.complete}
            >
                {istodoeditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deletetodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
