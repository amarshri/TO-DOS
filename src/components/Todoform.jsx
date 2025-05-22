import React, { useState } from 'react'
import { useTodo } from '../Context/Todocontext';

function TodoForm() {
    const [todo,settodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e)=>{
        e.preventDefault()
        if (!todo) return 

        addTodo({todo ,complete : false})
        settodo("")
    }


    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-[#8fa8d565] rounded-l-lg px-3 outline-none duration-150 bg-[#151a36] py-1.5"
                value={todo}
                onChange={(e)=>settodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-[#c4f1f8] text-[#040a23] shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

