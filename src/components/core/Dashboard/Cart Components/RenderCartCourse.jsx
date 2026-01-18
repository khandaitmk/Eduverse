import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactStars from 'react-stars'
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from '../../../../slices/cartSlice';
import { getAverageRating } from '../../../../services/operations/courseDetailsAPI';
import { PiCurrencyInrBold } from "react-icons/pi";


function RenderCartCourse() {
    const {cart} =useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [avgRating,setAvgRating]=useState(0);

    const getRating = async(courseId)=>{
            dispatch(setLoading(true));
            const result = await getAverageRating(courseId);
            // console.log("Average Rating :",result);
            setAvgRating(result);
            dispatch(setLoading(false))
    
        };

  return (
    <div className='w-full lg:w-[60%] flex flex-col gap-4 md:gap-5 overflow-auto'>
        {
            cart.map((course,index) =>{
                const result =getAverageRating(course._id);
                
                return (
                    <div key={index} className=' flex flex-col sm:flex-row border border-richblack-400 rounded-md p-3 md:p-4 lg:p-5 w-full gap-4'>
                        <div className=' flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10 items-start sm:items-center w-full'>
                            <div className=' w-full sm:w-[150px] md:w-[180px] lg:w-[205px] flex-shrink-0'><img className='w-full h-auto rounded-md' src={course?.thumbnail} alt="Thumbnail of the course" /></div>
                            <div className=' flex flex-col gap-2 flex-1'>
                                <h1 className=' text-base md:text-lg font-semibold'>{course.courseName}</h1>
                                <p className=' text-richblack-500 text-sm md:text-base'>Category : {course?.category?.name || ''}</p>
                                <div className=' flex flex-wrap gap-2 items-center'>
                                    <span className=' translate-y-0.5 text-yellow-50 text-sm md:text-base'>{avgRating}</span>
                                    <ReactStars
                                    count={5}
                                    size={16}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<i className="far fa-star"></i>}
                                    fullIcon={<i className="fas fa-star"></i>}
                                    ></ReactStars>
                                    <span className=' translate-y-0.5 text-xs md:text-sm'>{course?.ratingAndReviwes?.length || 0} Ratings</span>
                                </div>
                            </div>
                            <div className=' flex flex-col gap-3 md:gap-5 w-full sm:w-auto'>
                                <p className=' flex items-center gap-1 text-xl md:text-2xl font-semibold text-yellow-50'><PiCurrencyInrBold></PiCurrencyInrBold> {course?.price}</p>
                                <button className=' cursor-pointer flex gap-1 items-center justify-center text-sm md:text-base lg:text-lg p-2 px-3 md:px-4 bg-yellow-100 text-richblack-900 font-semibold rounded-md hover:bg-yellow-200 transition-colors' onClick={()=>{dispatch(removeFromCart(course._id))}}>
                                    <FaTrashAlt className="text-sm md:text-base"></FaTrashAlt>
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
};

export default RenderCartCourse;