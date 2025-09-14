import React from 'react'
import RenderSteps from './RenderSteps'

function AddCourses() {

  return (
    <div className=' text-white w-[85%] p-10 mx-auto'>
        <div className='relative w-full flex gap-5'>
          <div className=' flex flex-col gap-10 w-[80%]'>
            <h1 className=' text-3xl font-semibold'>Add Courses</h1>
            <RenderSteps></RenderSteps>
          </div>
          <div className='bg-richblack-800 max-w-[450px] p-4 rounded-md text-sm flex flex-col gap-5 text-richblack-50'>
            <p className=' text-lg text-start '>⚡Course Upload Tips</p>
            <ul className='list-disc flex flex-col gap-2 pl-5'>
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