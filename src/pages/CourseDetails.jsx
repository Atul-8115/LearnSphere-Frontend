import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentsFeaturesAPI';

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {refreshToken} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();

    const handleBuyCourse = () => {
        
        if(refreshToken) {
            buyCourse(refreshToken, [courseId], user, navigate, dispatch);
            return;
        }
    }


  return (
    <div className='flex items-center'>
        <button className='bg-yellow-50 p-6 mt-10 '
        onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails
