import React, { useEffect, useState } from 'react'
import "./styles/todoStyles.css";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import TodoItem from './TodoItem';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext';


const Todo = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [addTodo, setAddTodo] = useState("");
    const [data,setData] = useState([]);
    const [todos, setTodos] = useState([]);
    const [searchTodo,setSearchTodo] = useState("");
    const { currentUser } = useAuth();

    const DATABASE_NAME = currentUser.multiFactor.user.uid;

    useEffect(() => {
        console.log({ todos })
    }, [todos])

    useEffect(()=>{
        if(searchTodo === "")
        setTodos(data);
    },[searchTodo])

    const handleSearchTodo = ()=>{
        if(searchTodo === "")
        {
            resetTodos();
            return
        }
        const filterTodos = filterTodo(data,searchTodo);
        setTodos(filterTodos);
    }

    const filterTodo = (filterArray,filterValue)=>{
        const newArray = filterArray.filter(todo => {
            if(todo.data.todo.toLowerCase().includes(filterValue.toLowerCase()))
            return todo;
        })
        return newArray
    }

    const resetTodos = ()=>{
        setTodos(data);
    }

    useEffect(() => {
        const taskColRef = query(collection(db, DATABASE_NAME), orderBy('created', 'desc'))
        onSnapshot(taskColRef, (snapshot) => {
            const todoList = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
            setTodos(todoList);
            setData(todoList);
        })
    }, [])

    const handleLogout = () => {
        setLoading(true);
        auth.signOut().then(res => {
            console.log({ res })
            navigate("/login")
        }
        ).catch(err => console.log(err.message))
            .finally(setLoading(false));
    }


    const handleAddTodo = async () => {
        if(addTodo === "")
        {
            alert("Todo should not be empty")
            return;
        }
        try {
            await addDoc(collection(db, DATABASE_NAME), {
                todo: addTodo,
                completed: false,
                created: Timestamp.now()
            });
            setAddTodo("");
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <main className='todo-page'>
                <section className='todo-header'>
                    <div className='todo-title'>ToDo List </div>
                    <div className='todo-search'>
                        <input type='text' className='todo-input' onChange={(e)=>setSearchTodo(e.target.value)} value={searchTodo} placeholder="Type to search.."/>
                        <button onClick={handleSearchTodo} className='todo-search-btn'>
                            <AiOutlineSearch className='todo-search-icon' />
                        </button>
                    </div>
                    <div className='todo-profile'>
                        <span className='todo-greeting'>Welcome Back!</span>
                        <span className='todo-user'>User Name</span>

                        <button title="logout" disabled={loading} onClick={handleLogout} className="todo-logout">
                            <span className='todo-logout-title'>Logout</span>
                            <FiLogOut />
                        </button>
                    </div>
                </section>
                <section className='todo-add-block'>
                    {/* <div  className="input-add-input"> */}
                    <input onChange={(e) => setAddTodo(e.target.value)}  value={addTodo} type="text" title="Type a todo list" placeholder="Take a note.." className='todo-add-input' />
                    <span onClick={handleAddTodo} title='add-todo'>
                        <GrAdd className="todo-add-icon" />
                    </span>
                    {/* </div> */}
                </section>
                <section className='container mt-3  todo-container'>
                    {
                        todos.length > 0
                            ?
                            todos.map(todo => {
                                return <TodoItem DATABASE_NAME={DATABASE_NAME} key={todo.id} setSearchTodo={setSearchTodo}  todo={todo} />
                            })
                            :
                            <div>No data Found</div>
                    }
                </section>
            </main>
        </>
    )
}

export default Todo