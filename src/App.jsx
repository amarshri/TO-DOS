import { useState , useEffect} from 'react'
import{TodoProvider} from './Context'
import './App.css'
import TodoForm from './components/Todoform'
import TodoItem from './components/Todositem'

function App() {

  const [todos,settodos]=useState([])

  const addTodo = (todo)=>{
settodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  const updatedtodo = (id , todo)=>{
settodos((prev)=> prev.map((prevtodo)=> (prevtodo.id === id ?todo :prevtodo)))
  }

  const deletetodo = (id)=>{
    settodos((prev)=>prev.filter((todo)=>todo.id !== id))
  }

  const togglecomplete = (id)=>{
    settodos((prev)=>prev.map((prevtodo)=>prevtodo.id=== id?{...prevtodo,complete:!prevtodo.complete}: prevtodo))
  }

  // useEffect(() => {
  //  const todos = JSON.parse( localStorage.getItem("todos"))

  //  if (todos && todos.length>0) {
  //   settodos(todos)
  //  }
  // }, [])

  useEffect(() => {
  try {
    const todosStr = localStorage.getItem("todos");
    const todos = todosStr ? JSON.parse(todosStr) : [];

    if (Array.isArray(todos) && todos.length > 0) {
      settodos(todos);
    }
  } catch (err) {
    console.error("Failed to parse todos from localStorage:", err);
    localStorage.removeItem("todos"); // Optional: clean up invalid data
  }
}, []);

  
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,updatedtodo,deletetodo,togglecomplete}}>
  <div className="bg-[#07162d] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-[#eaebd9] bg-[#142847]">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>{
                          return (<div key={todo.id} className='w-full'>
                          <TodoItem todo={todo}/>
                          </div>)
                        })}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
