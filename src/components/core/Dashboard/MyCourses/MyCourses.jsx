import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseList from './CourseList';
import { getAllInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setEditCourse, setInstructorCourses, setStep } from '../../../../slices/courseSlice';

function MyCourses() {
  const token = useSelector((state)=>state.auth.token);
  const courses = useSelector((state)=>state.course.instructorCourses);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const fetchInstructorCourses= async()=>{
    const courses = await getAllInstructorCourses(token);
    // console.log("getted courses :",courses);
    dispatch(setInstructorCourses(courses));
  }
  
  useEffect(()=>{
    fetchInstructorCourses();
  },[]);

  // Refresh courses when navigating back to this page
  useEffect(() => {
    if (location.pathname === '/dashboard/my-courses') {
      fetchInstructorCourses();
    }
  }, [location.pathname]);
  return (
    <div className='text-white w-[85%] mx-auto p-10'>
      <div className=' flex flex-col gap-10'>
        <div className=' flex justify-between'>
          <p className='text-3xl font-semibold'>My Courses</p>
          <div className='flex gap-2'>
            <button 
              onClick={fetchInstructorCourses}
              className=' flex items-center gap-1 p-2 px-4 bg-richblack-800 rounded-md text-richblack-100 font-semibold hover:bg-richblack-700 transition-colors'
            >
              <MdRefresh size={20}></MdRefresh>
              <p>Refresh</p>
            </button>
            <button onClick={()=>
              {dispatch(setEditCourse(false))
              dispatch(setStep(1));
              navigate("/dashboard/add-course")}} className=' flex items-center gap-1 p-2 px-4 bg-yellow-50 rounded-md text-richblack-900 font-semibold'>
              <p>Add Course </p>
              <IoMdAdd></IoMdAdd>
            </button>
          </div>
        </div>
        <div>
          {
           <CourseList courses={courses}></CourseList>
          }
        </div>
      </div>
    </div>
  )
}

export default MyCourses