import React, { useState } from 'react'
import Tab from '../../common/Tab'
import { ACCOUNT_TYPE } from '../../../utils/constaints'


const SignupForm = () => {

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    // Data to pass to tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: ACCOUNT_TYPE.INSTRUCTOR
        }
    ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      {/* Form */}
      <form>
         <div>
            <label>
                <p>
                    First Name
                </p>
                <input
                    required
                    type='text'
                    name="firstName"
                    // value={firstName}
                    placeholder='Enter your first name'
                />
            </label>
            <label>
                <p>
                    Last Name
                </p>
                <input
                    required
                    type='text'
                    name='lastName'
                    placeholder='Enter your last name'
                />
            </label>
         </div>
      </form>
    </div>
  )
}

export default SignupForm
