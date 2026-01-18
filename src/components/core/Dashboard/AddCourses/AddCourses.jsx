import React from 'react'
import RenderSteps from './RenderSteps'

function AddCourses() {

  return (
    <div className='relative text-white w-full lg:w-[85%] p-4 md:p-6 lg:p-10 mx-auto'>
        <div className='relative w-full flex flex-col lg:flex-row gap-4 md:gap-5'>
          <div className=' flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:w-[80%]'>
            <h1 className=' text-2xl md:text-3xl font-semibold'>Add Course</h1>
            <RenderSteps></RenderSteps>
          </div>
          <div className='bg-richblack-800 w-full lg:max-w-[450px] p-4 md:p-5 rounded-md text-xs md:text-sm flex flex-col gap-4 md:gap-5 text-richblack-50 h-fit lg:sticky lg:top-10'>
            <p className=' text-base md:text-lg text-start '>⚡Course Upload Tips</p>
            <ul className='list-disc flex flex-col gap-2 pl-4 md:pl-5'>
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
              <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
              <li>Information from the Additional Data section shows up on the course single page.</li>
              <li>Make Announcements to notify any important</li>
              <li>Notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default AddCourses