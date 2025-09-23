import React, { useEffect } from 'react'
import Footer from '../components/core/Homepage/Footer'
import { getAverageRating } from '../services/operations/courseDetailsAPI';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getCourseDetails } from '../services/operations/courseDetailsAPI';
import RatingStars from '../components/common/RatingStars';
import { FaCaretRight } from "react-icons/fa";
import { setLoading } from '../slices/authSlice';

function CourseDetails() {
    const [avgRating,setAvgRating]=useState(0);
    const [courseDetails,setCourseDetails]=useState(null);
    const {courseId}=useParams();
    const {loading}=useSelector((state)=>(state.auth));

    const {token} = useSelector((state)=>(state.auth));
    const dispatch = useDispatch();
    const navigate =useNavigate();
    useEffect(()=>{
        getRating();
        getCDetails();
    },[courseId]);

    const getRating = async()=>{
        dispatch(setLoading(true));
        const result = await getAverageRating(courseId);
        // console.log("Average Rating :",result);
        setAvgRating(result);
        dispatch(setLoading(false))

    };
    const getCDetails = async()=>{
        dispatch(setLoading(true));
        const result = await getCourseDetails(courseId,token,navigate,dispatch);
        setCourseDetails(result);
        dispatch(setLoading(false));};
  return (
    <div>
        {/* section -1 */}
        <div className='bg-richblack-800 relative'>
            <div className='w-11/12 mx-auto p-20 text-white text-xl flex flex-col gap-4'>
                <h1 className='text-5xl text-white font-bold'>{courseDetails?.courseName}</h1>
                <p className='text-richblack-500 text-xl'>{courseDetails?.courseDescription}</p>
                <div className='flex items-center text-xl gap-5 text-white'>
                    <div className='flex items-center gap-3'>
                        <p className=' transform translate-y-1 text-yellow-100'>{avgRating}</p>
                        <RatingStars rating={avgRating}></RatingStars>
                    </div>
                    <p className='transform translate-y-1'>({courseDetails?.ratingAndReviwes.length} Reviwes)</p>

                    
                </div>
                <p>{courseDetails?.studentsEnrolled.length} students Enrolled</p>
                <p>Created By : <span className=' italic '>{courseDetails?.instructor.firstName} {courseDetails?.instructor.lastName}</span></p>

            </div>
            {/* side Card */}
            <div className=' transform duration-200 hover:scale-105 absolute -bottom-75 right-40 bg-richblack-900 border border-richblack-300 w-[400px] p-7 flex flex-col gap-6 rounded-md'>
                
                <div className=' '><img className='rounded-md' src={courseDetails?.thumbnail} alt="" /></div>
                <p className=' text-3xl text-white font-semibold'>Rs. {courseDetails?.price}</p>
                <div className=' flex flex-col gap-3 w-full'>
                    <button className='p-2 px-4 bg-yellow-50 text-richblack-900 cursor-pointer font-semibold rounded-md'>Buy Now</button>
                    <button className='p-2 px-4 bg-richblack-800 font-semibold cursor-pointer text-white  rounded-md'>Add to Cart</button>
                </div>
                <p className='text-sm text-richblack-100 text-center'>30-Day Money-Back Guarantee</p>
                <p className=' text-xl font-semibold text-richblack-5'>This Course Includes :</p>
                <ul className=' text-sm text-green-400'>
                    {
                        courseDetails?.tag.map((tag,index)=>(
                            <div className=' flex items-center'>
                                <FaCaretRight></FaCaretRight>
                                <li key={index}>{tag}</li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
        {/* section-2 */}
        <div className='bg-richblack-900 w-[60%] h-[800px]'>
            <div>
                <p>What you'll learn</p>
                <p>{courseDetails?.whatYouWillLearn}</p>
            </div>
            <div>

            </div>
            <div>
                <p>Author</p>
                <div className='flex gap-3 items-center'>
                    <div><img width={25} className=' rounded-full' src={courseDetails?.instructor?.image} alt="" /></div>
                    {courseDetails?.instructor.firstName} {courseDetails?.instructor.lastName}
                </div>
            </div>
        </div>
        <div className=' h-[1px] w-full bg-richblack-600'></div>
        <Footer></Footer>
    </div>
  )
}

export default CourseDetails