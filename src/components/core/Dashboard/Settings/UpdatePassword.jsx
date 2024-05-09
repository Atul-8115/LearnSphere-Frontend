import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { changePassword } from '../../../../services/operations/SettingsAPI'

const UpdatePassword = () => {
  const { refreshToken } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(refreshToken, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
     <form onSubmit={handleSubmit(submitPasswordForm)}>
       <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
         <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
         <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='oldPassword' className='lable-style text-white'>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                 Current Password <sup className="text-pink-200">*</sup>
              </p>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name='oldPassword'
              id='oldPassword'
              placeholder='Enter Current Password'
              style={{
                boxShadow: "inset 1px -1px 0px rgba(255, 255, 255, 0.18)",
               }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("oldPassword", { required : true})}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-3 top-[50px] z-[10] cursor-pointer'
            >
              {
                 showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                 ) : (
                  <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                 )
              }
            </span>
          </div>
          {
            errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your current password
              </span>
             )
          }
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='newPassword' className='lable-style'>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name='newPassword'
              id='newPassword'
              style={{
                boxShadow: "inset 1px -1px 0px rgba(255, 255, 255, 0.18)",
               }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              placeholder='Enter new password'
              {...register("newPassword", {required: true})}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className='absolute right-3 top-[50px] z-[10] cursor-pointer'
            >
              {
                 showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                 ) : (
                  <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                 )
              }
            </span>
            {
              errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your new passowrd
                </span>
              )
            }
          </div>
         </div>
       </div>
       <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn
          type="submit" text="Update"
        />
       </div>
     </form> 
    </>
  )
}

export default UpdatePassword
