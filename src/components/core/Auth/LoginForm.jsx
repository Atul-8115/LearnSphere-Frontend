import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constaints'
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/authApi'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSumbit = (e) => {
    e.preventDefault()
    dispatch(login(email,password,navigate))
  }
  const tabData = [
    {
       id:1,
       tabName: "Student",
       type: ACCOUNT_TYPE.STUDENT
    },
    {
       id:2,
       tabName: "Instructor",
       type: ACCOUNT_TYPE.INSTRUCTOR
    }
  ]
  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      <form
      onSubmit={handleOnSumbit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )}
        </span>
      </label>
      <button
         type='sumbit'
         className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
      >
        Sign In
      </button>
    </form>
    </div>
  )
}

export default LoginForm