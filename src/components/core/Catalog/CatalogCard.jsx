import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
function CatalogCard({course}) {
    const [avgReviewCount,setAvgReviewCount]=useState(0);
  return (
    <div className='h-auto md:h-[300px] lg:h-[330px] bg-richblack-800 border border-richblack-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link to={`/courses/${course._id}`}>
            <div>
                <div className='h-auto md:h-[180px] lg:h-[220px] p-2 md:p-3'>
                    <img 
                        src={course?.thumbnail}
                        alt='course thumbnail'
                        className={` object-contain w-full h-[150px] md:h-[180px] lg:h-[220px] rounded-xl `}
                    />
                </div>
                <div className='flex flex-col items-center gap-2 md:gap-3 bg-richblack-800 text-sm px-3 md:px-5 py-2 md:py-3 flex-wrap text-richblack-5 font-semibold font-inter'>
                    <p className='text-xs md:text-sm lg:text-lg text-center line-clamp-2'>{course?.courseName}</p>
                    {/* <p className='text-[12px] md:text-xl '>By <span className='text-yellow-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</span></p>
                    <div className='flex gap-x-3'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        {/* <RatingStars Review_Count={avgReviewCount} /> 
                        <span className=' md:block hidden md:text-xl '>{course?.ratingAndReviews?.length} Ratings</span>
                    </div> */}
                    <p className='text-base md:text-lg text-yellow-50'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>

    </div>
  )
}

export default CatalogCard