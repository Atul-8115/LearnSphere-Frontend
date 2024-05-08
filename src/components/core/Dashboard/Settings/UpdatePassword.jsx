import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const UpdatePassword = () => {
  const { refreshToken } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <>
     <form>
       
     </form> 
    </>
  )
}

export default UpdatePassword
