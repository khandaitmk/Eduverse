import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
import CourseList from './CourseList';

function MyCourses() {
  return (
    <div className='text-white w-[85%] mx-auto p-10'>
      <div>
        <div className=' flex justify-between'>
          <p className='text-3xl font-semibold'>My Courses</p>
          <button className=' flex items-center gap-1 p-2 px-4 bg-yellow-50 rounded-md text-richblack-900 font-semibold'>
            <p>Add Course </p>
            <IoMdAdd></IoMdAdd>
          </button>
        </div>
        <div>
          {
            
          }
        </div>
      </div>
    </div>
  )
}

export default MyCourses