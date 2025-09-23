import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
function CatalogCard({course}) {
    const [avgReviewCount,setAvgReviewCount]=useState(0);
  return (
    <div className='h-[300px] bg-richblack-800 border border-richblack-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link to={`/courses/${course._id}`}>
            <div>
                <div className='h-[220px] p-3'>
                    <img 
                        src={course?.thumbnail}
                        alt='course thumbnail'
                        className={` object-contain w-full h-[180px] md:h-[250px] rounded-xl `}
                    />
                </div>
                <div className='flex flex-col items-center gap-3 bg-richblack-800 text-sm px-5 flex-wrap text-richblack-5 font-semibold
                font-inter
                '>
                    <p className='text-sm md:text-lg'>{course?.courseName}</p>
                    {/* <p className='text-[12px] md:text-xl '>By <span className='text-yellow-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</span></p>
                    <div className='flex gap-x-3'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        {/* <RatingStars Review_Count={avgReviewCount} /> 
                        <span className=' md:block hidden md:text-xl '>{course?.ratingAndReviews?.length} Ratings</span>
                    </div> */}
                    <p className='text-lg text-yellow-50'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>

    </div>
  )
}

export default CatalogCard