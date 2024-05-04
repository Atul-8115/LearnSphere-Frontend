import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "pandeyatulkumar94@gmail.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Atul Kumar Pandey, Bhitoli Khurd, Lucknow-226201",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+91 8960 461 209",
    },
  ]

const ContactDetails = () => {
  return (
    <div className='flex flex-col gap6 rounded-xl bg-richblack-800 lg:p-6'>
      {
        contactDetails.map((ele, index) => {
            let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
            return (
                <div
                  className='flex flex-row gap-3 p-3 text-sm text-richblack-200'
                  key={index}
                >
                  <div className=''>
                    <Icon size={25}/>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className="text-lg font-semibold text-richblack-5">
                            {ele.heading}
                    </h1>
                    <p className='font-medium'>{ele.description}</p>
                    <p className='font-semibold'>{ele.details}</p>
                  </div>
                </div>
            )
        })
      }
    </div>
  )
}

export default ContactDetails
