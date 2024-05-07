import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <>
      <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePic/>
      {/* Edit Profile */}
      <EditProfile/>
      {/* Update Password */}
      <UpdatePassword/>
      {/* Delete Account */}
      <DeleteAccount/>
    </>
  )
}

export default Settings
