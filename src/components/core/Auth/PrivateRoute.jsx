import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const PrivateRoute = ({childre}) => {
    const {refreshToken} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    if(refreshToken !== null) {
        return childre;
    } else {
        navigate("/login")
    }
}

export default PrivateRoute
