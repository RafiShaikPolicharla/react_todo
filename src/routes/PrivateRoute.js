import React from "react"
import { Route, Navigate  } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({ children })=> {
    const { currentUser } = useAuth();

    if(!currentUser)
    {
        return <Navigate to="/login"/>
    }

    return children;
}
export default PrivateRoute