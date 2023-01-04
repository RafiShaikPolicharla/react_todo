import React, { useState } from 'react'
import "./styles/todoStyles.css";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import TodoItem from './TodoItem';


const Todo = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        setLoading(true);
        auth.signOut().then(res => {
            console.log({ res })
            navigate("/login")
        }
        ).catch(err => console.log(err.message))
            .finally(setLoading(false));
    }
    return (
        <>
            <main className='todo-page'>
                <section className='todo-header'>
                    <div className='todo-title'>ToDo List </div>
                    <div className='todo-search'>
                        <input type='text' className='todo-input' />
                        <button className='todo-search-btn'>
                            <AiOutlineSearch />
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
                    <input  type="text" title="Type a todo list" placeholder="Take a note.." className='todo-add-input' />
                    <span title='add-todo'>
                        <GrAdd className="todo-add-icon" />
                    </span>
                    {/* </div> */}
                </section>
                <section className='container todo-container'>
                    <TodoItem />
                </section>
            </main>
        </>
    )
}

export default Todo