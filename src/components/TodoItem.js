import React, { useEffect, useRef, useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl';
import { TiTickOutline } from 'react-icons/ti';

const TodoItem = () => {
    const ref = useRef();
    const [openDropDown, setOpenDropDown] = useState(false);
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
    return (
        <div className='todo-item d-flex flex-column' >
            <span className='todo-completed-label'>completed</span>
            <div className='todo-completed-block'>
                <span className='todo-completed'>
                    <TiTickOutline className='todo-completed-icon'/>
                </span>
            </div>
            <p>hello</p>
            <div className='todo-menu' onClick={() => setOpenDropDown(!openDropDown)} ref={ref}>
                <div className='options'>
                    <SlOptionsVertical className='todo-option-icon' />
                    {
                        openDropDown
                            ?
                            <div className='todo-item-dropdown'>
                                <ul className='todo-dropdown-list'>
                                    <li className='todo-dropdown-list-item'>Edit</li>
                                    <li className='todo-dorpdown-list-item'>Delete</li>
                                    <li className='todo-dorpdown-list-item'>completed</li>
                                </ul>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>

        </div>
    )
}

export default TodoItem