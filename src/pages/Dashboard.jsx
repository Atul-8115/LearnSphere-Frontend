import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router'

const Dashboard = () => {
    const {loading: authLoading } = useSelector((state) => state.auth)
    const {loading: profileLoading } = useSelector((state) => state.profile)

    // console.log("Printing what is in authLoading and profileLoading -> ",authLoading," ",profileLoading)
    if(profileLoading || authLoading) {
        return (
            <div className='spinner'></div>
        )
    }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-400'>
        <Sidebar />
        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
