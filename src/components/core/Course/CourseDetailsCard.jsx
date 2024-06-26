import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ACCOUNT_TYPE } from '../../../utils/constaints'
import toast from 'react-hot-toast'
import copy from "copy-to-clipboard"
import { addToCart } from '../../../slices/cartSlice'

const CourseDetailsCard = ({course, setConfirmationModal,handleBuyCourse}) => {

    const { user } = useSelector((state) => state.profile)
    const { refreshToken } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log("Printing course -> ",course)
    const {
        thumbnail,
        price,
    } = course

    console.log("Printing thumbnail -> ",thumbnail)
    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor,you can't buy a course")
            return;
        }
        if(refreshToken) {
            console.log("dispatching add to cart")
            dispatch(addToCart(course))
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link Copied to Clipboard")
    }
  return (
    <div className='text-richblack-5'>
      <img
          src={thumbnail}
          alt='Thumnail Image'
          className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
      />
      <div>
        Rs. {price}
      </div>
      <div className='flex flex-row gap-3'>
        <button
                className='bg-yellow-50 w-fit text-richblack-900'
                onClick={
                    user && course?.studentsEnrolled.includes(user?._id)
                    ? ()=> navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
            >
                {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                }
        </button>

        {
            (!course?.studentsEnrolled.includes(user?.id) && (
                <button onClick={handleAddToCart}  
                            className='bg-yellow-50 w-fit text-richblack-900'
                >
                    Add to Cart
                </button>
            ))
        }
      </div>

      <div>
        <p>
           30-Day Money-Back Guarantee
        </p>
        <p>
            This Course Includes:
        </p>
        <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions?.map((item, index)=> (
                        <p key={index} className='flex gap-2'>
                            <span>{item}</span>
                        </p>
                    ))
                }
        </div>
      </div>
      <div>
        <button
        className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
        onClick={handleShare}
        >
            Share
        </button>
      </div>
    </div>
  )
}

export default CourseDetailsCard
