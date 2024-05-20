import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { buyCourse } from '../services/operations/studentsFeaturesAPI';
import { fetchCourseDetails, getFullDetailsOfCourse } from '../services/operations/courseDetailsApi';
import GetAvgRating from '../utils/avgRating';
import Error from './Error';
import ConfirmationModal from "../components/common/ConfirmationModal"
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formDate';
import Footer from '../components/common/Footer';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {refreshToken} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();
    const {loading} = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)

    const [courseData , setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async() => {
            try {
                const result = await fetchCourseDetails(courseId)
                console.log("Printing Course details",result.data.courseDetails[0])
                setCourseData(result)
            } catch (error) {
                console.log("Could not fetch coursedetails")
            }
        }
        getCourseFullDetails()
    },[courseId])

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        console.log("Printing avgRatings -> ",courseData)
        const count = GetAvgRating(courseData?.data?.courseDetails[0].ratingAndReviews)
        console.log("Printing review count -> ",count)
        setAverageReviewCount(count)
    },[courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails[0]?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    },[courseData])

    const [isActive, setIsActive] = useState(Array(0));

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
             ? isActive.concat(id)
             : isActive.filter((e)=> e != id)

        )
    }
    const handleBuyCourse = () => {
        
        if(refreshToken) {
            console.log("I am in buy course handler")
            buyCourse(refreshToken, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }

    if(loading || !courseData) {
        return (
            <div className='spinner'>
               
            </div>
        )
    }

    if(!courseData.success) {
        return (
            <div className='flex justify-center items-center my-auto'>
                <Error />
            </div>
        )
    }

    if (paymentLoading) {
        // console.log("payment loading")
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }
    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data.courseDetails[0];

    console.log("Printing course thumbnail -> ",courseData.data.courseDetails[0])
  return (
    <>
       <div className={`relative w-full bg-richblack-800`}>
          <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                <div className="relative block max-h-[30rem] lg:hidden">
                    <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]">
                        <img
                            src={thumbnail}
                            alt='course thumbnail'
                            className="aspect-auto w-full"
                        />
                    </div>
                    <div
                       className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                    >
                        <div>
                            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                                {courseName}
                            </p>
                        </div>
                        <p className={`text-richblack-200`}>{courseDescription}</p>
                        <div className="text-md flex flex-wrap items-center gap-2">
                            <span className="text-yellow-25">{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                            <span>{`(${ratingAndReviews.length} reviews)`}</span>
                            <span>{`${studentsEnrolled.length} students enrolled`}</span>
                        </div>
                        <div>
                            <p>
                                Created By {`${instructor.firstName} ${instructor.lastName}`}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-5 text-lg">
                           <p>
                            {" "}
                            <BiInfoCircle/> Created at {formatDate(createdAt)}
                           </p>
                           <p className="flex items-center gap-2">
                            {" "}
                            <HiOutlineGlobeAlt /> English
                           </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                      <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                        Rs. {price}
                      </p>
                      <button className="yellowButton" onClick={handleBuyCourse}>
                        Buy Now
                      </button>
                      <button className="blackButton">Add to Cart</button>
                    </div>
                </div>
                {/* Courses Card */}
                <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                  <CourseDetailsCard
                    course={courseData[0]?.data.courseDetails}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                  />
                </div>
            </div>
          </div>
          <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
            <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                <div className="my-8 border border-richblack-600 p-8">
                    <p className="text-3xl font-semibold">What you'll learn</p>
                    <div className='mt-5'>
                       <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                    </div>
                </div>

                <div className="max-w-[830px] ">
                    <div className="flex flex-col gap-3">
                        <p className="text-[28px] font-semibold">Course Content</p>
                        <div className="flex flex-wrap justify-between gap-2">
                            <div className='flex gap-2'>
                                <span>
                                    {courseContent.length}
                                </span>
                                <span>
                                    {totalNoOfLectures} {`lecture(s)`}
                                </span>
                            </div>
                            <div>
                                <button
                                   className='text-yellow-25'
                                   onClick={() => setIsActive([])}
                                >
                                    Collapse all sections
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='py-4'>
                      {
                        courseContent?.map((course,index) =>(
                           <CourseAccordionBar
                              course={course}
                              key={index}
                              isActive={isActive}
                              handleActive={handleActive}
                           /> 
                        ))
                      }
                    </div>

                    <div className="mb-12 py-4">
                        <p className="text-[28px] font-semibold">Author</p>
                        <div className="flex items-center gap-4 py-4">
                            <img
                                src={
                                    instructor.image
                                      ? instructor.image
                                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                }
                                alt='Author'
                                className='h-14 w-14 rounded-full object-cover'
                            />
                            <p className='text-lg'>{`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                        <p className="text-richblack-50">
                            {instructor?.additionalDetails}
                        </p>
                    </div>
                </div>
            </div>
          </div>
       </div>
       <Footer/>
       {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default CourseDetails
