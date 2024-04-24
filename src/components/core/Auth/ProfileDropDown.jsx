import React from 'react'
import { useSelector } from 'react-redux'


const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)

  console.log("Printing user: ",user);

  return (
   <button>
     <div>
       <img
         src= {`profile-${user?.firstName}`}
         
       />
     </div>
   </button>
  )
}

export default ProfileDropDown
