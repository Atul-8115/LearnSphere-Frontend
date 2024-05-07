import React, { useState } from 'react'

import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router'
import { logout } from '../../../services/operations/authApi'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {
  const {user, loading: profileLoading} = useSelector((state) => state.profile)
  const { loading: authLoading} = useSelector((state) => state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
     <div className='text-white'>
        <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>

          <div className='flex flex-col'>
            {
                sidebarLinks.map((link) => {
                  if(link.type && link.type !== user?.accountType) return null
                  return (
                      <SidebarLink
                        key={link.id}
                        link={link}
                        iconName={link.icon}
                      />
                  )
                })
            }
          </div>

          <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

          <div className='flex flex-col'>
              <SidebarLink
                link={{name: "Settings", path: "dashboard/settings"}}
                iconName="VscSettingsGear"
              />

              <button
                 onClick={() => 
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null)
                    })}
                  className="px-8 py-2 text-sm font-medium text-richblack-300"
              >

                <div className="flex items-center gap-x-2">
                  <VscSignOut size={24} className='text-lg'/>
                  <span>Logout</span>
                </div>
              </button>
          </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData ={confirmationModal} />}
     </div>
  )
}

export default Sidebar
