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
    <div className='w-[60%] flex flex-col gap-5 overflow-auto'>
        {
            cart.map((course,index) =>{
                const result =getAverageRating(course._id);
                
                return (
                    <div key={index} className=' flex border border-richblack-400 rounded-md p-5 w-full'>
                        <div className=' flex gap-10 items-center '>
                            <div className=' w-[205px]'><img width={"250px"} className=' rounded-md' src={course?.thumbnail} alt="Thumbnail of the course" /></div>
                            <div className=' flex flex-col gap-2'>
                                <h1 className=' text-lg font-semibold'>{course.courseName}</h1>
                                <p className=' text-richblack-500'>Category : {course?.category?.name || ''}</p>
                                <div className=' flex gap-2'>
                                    <span className=' translate-y-0.5 text-yellow-50'>{avgRating}</span>
                                    <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<i className="far fa-star"></i>}
                                    fullIcon={<i className="fas fa-star"></i>}
                                    ></ReactStars>
                                    <span className=' translate-y-0.5'>{course?.ratingAndReviwes?.length || 0} Ratings</span>
                                </div>
                            </div>
                            <div className=' flex flex-col gap-5'>
                                <p className=' flex items-center gap-1 text-2xl font-semibold text-yellow-50'><PiCurrencyInrBold></PiCurrencyInrBold> {course?.price}</p>
                                <button className=' cursor-pointer flex gap-1 items-center text-lg p-2 px-4 bg-yellow-100 text-richblack-900 font-semibold rounded-md' onClick={()=>{dispatch(removeFromCart(course._id))}}>
                                    <FaTrashAlt></FaTrashAlt>
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