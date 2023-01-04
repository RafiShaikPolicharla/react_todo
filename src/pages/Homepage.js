import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Todo from '../components/Todo';
import { useAuth } from '../context/AuthContext';

const Homepage = () => {

    return (
        <div >
            <Todo />
        </div>
    )
}

export default Homepage