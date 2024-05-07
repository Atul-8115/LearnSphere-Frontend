import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const PrivateRoute = ({children}) => {
    const {refreshToken} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    if(refreshToken !== null) {
        return children;
    } else {
        navigate("/login")
    }
}

export default PrivateRoute
