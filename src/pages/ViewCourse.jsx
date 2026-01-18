import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import ReviewModal from '../components/core/Dashboard/View-Course/ReviewModal'
import VideoDetailsSidebar from '../components/core/Dashboard/View-Course/VideoDetailsSidebar'
import { getCourseDetails } from '../services/operations/courseDetailsAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'

function ViewCourse() {
  const [reviewModal,setReviewModal] = useState(false);
  const {courseId}=useParams();
  const {courseEntireData} = useSelector((state)=>state.viewCourse);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    const setCourseSpecifics = async() =>{
      const courseData = await getCourseDetails(courseId,token,navigate,dispatch);
      console.log("Course details in the View-course Section :",courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      const completed = Array.isArray(courseData?.completedVideos)
        ? courseData.completedVideos
        : courseData?.completedVideos
          ? [courseData.completedVideos]
          : [];
      dispatch(setCompletedLectures(completed));
      var lecture = 0;
      courseData?.courseDetails?.courseContent?.forEach((section)=>{
        lecture += section?.subSection?.length;
      });

      dispatch(setTotalNoOfLectures(lecture));


    }
    setCourseSpecifics();
  },[courseId,token,dispatch]);


  return (
    <div className='flex flex-col lg:flex-row w-screen h-[calc(100vh-3.5rem)]'>
      <div className=' w-full lg:w-[20%] bg-richblack-800 h-auto lg:h-full overflow-y-auto'>
        <VideoDetailsSidebar setReviewModal={setReviewModal}></VideoDetailsSidebar>
      </div>
      <div className='w-full lg:w-[80%] h-full overflow-y-auto'>
        <Outlet></Outlet>
      </div>
      {
        reviewModal && (<ReviewModal setReviewModal={setReviewModal}></ReviewModal>)
      }
    </div>
  )
}

export default ViewCourse