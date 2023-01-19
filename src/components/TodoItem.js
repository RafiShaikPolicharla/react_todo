import React, { useEffect, useRef, useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl';
import { TiTickOutline } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import EditTodo from './EditTodo';

const TodoItem = ({ DATABASE_NAME, todo, setSearchTodo }) => {
    const ref = useRef();
    const [openDropDown, setOpenDropDown] = useState(false);
    const [completed, setCompleted] = useState(todo.data.completed);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        console.log({ completed })
    }, [completed])
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (openDropDown && ref.current && !ref.current.contains(e.target)) {
                setOpenDropDown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            //cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [openDropDown])

    const handleEdit = () => {
        setOpenModal(!openModal);
    }


    const handleCompleted = async (id) => {
        setSearchTodo("");
        setSearchTodo("");
        setCompleted(!completed);
        const taskDocRef = doc(db, DATABASE_NAME, id)
        try {
            await updateDoc(taskDocRef, {
                completed: !completed
            })
        } catch (err) {
            alert(err)
        }
    }

    /* function to delete a document from firstore */
    const handleDelete = async (id) => {
        const taskDocRef = doc(db, DATABASE_NAME, id)
        try {
            await deleteDoc(taskDocRef)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div key={todo.id} className='todo-item d-flex flex-column' >
            {completed && <span className='todo-completed-label'>completed</span>}
            <div className='todo-completed-block'>
                <span onClick={() => handleCompleted(todo.id)} className='todo-completed todo-not-completed'>
                    {
                        completed
                            ?
                            <RxCross2 className='todo-completed-icon' title='Not Completed' />
                            :
                            <TiTickOutline className='todo-completed-icon' title='Completed' />
                    }
                </span>
            </div>
            <p className='todo-content'>{todo.data.todo}</p>
            <div className='todo-menu' onClick={() => setOpenDropDown(!openDropDown)} ref={ref}>
                <div className='options'>
                    <SlOptionsVertical className='todo-option-icon' />
                    {
                        openDropDown
                            ?
                            <div className='todo-item-dropdown'>
                                <ul className='todo-dropdown-list'>
                                    <li className='todo-dropdown-list-item' onClick={() => {
                                        handleEdit();
                                        setOpenDropDown(!openDropDown)
                                    }}>Edit</li>
                                    <li className='todo-dorpdown-list-item' onClick={() => handleDelete(todo.id)}>Delete</li>
                                    <li className='todo-dorpdown-list-item' onClick={() => handleCompleted(todo.id)}>{completed ? "Not completed" : "completed"}</li>
                                </ul>
                            </div>
                            :
                            ""
                    }
                </div>
                <EditTodo
                    DATABASE_NAME={DATABASE_NAME}
                    onClose={handleEdit}
                    preValue={todo.data.todo}
                    open={openModal}
                    id={todo.id} />
            </div>
        </div >
    )
}

export default TodoItem