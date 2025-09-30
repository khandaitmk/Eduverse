import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaCaretLeft } from "react-icons/fa6";


function VideoDetailsSidebar(props) {
  const {setReviewModal} = props;
  const [activeStatus,setActiveStatus]=useState("");
  const [videoBarActive,setVideoBarActive]=useState("");

  const {courseId,sectionId,subSectionId}= useParams();
  // console.log("course ids :",courseId,sectionId,subSectionId);
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures}=useSelector((state)=> state.viewCourse);
  // console.log("courseSectionData :",courseSectionData);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar,setShowSidebar] = useState(false);
  const  [courseCompletedLectures,setCourseCompletedLectures]=useState([]);
  useEffect(()=>{
    ;(()=>{
        if(!courseSectionData){
          return;
        }
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
        const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
        const allSubSectionIds = courseSectionData.flatMap((section) =>
        section.subSection.map((sub) => sub._id)
        );
        console.log("Completed Lectures :",completedLectures);
         const safeCompleted = Array.isArray(completedLectures)
          ? completedLectures
          : completedLectures
            ? [completedLectures]
            : [];
         const thisCourseCompleted = safeCompleted.filter((id) =>
          allSubSectionIds.includes(id)
        );    
        setCourseCompletedLectures(thisCourseCompleted);
            // console.log("Completed lectures for this course:", thisCourseCompleted.length);

      })() // this is the another method to call the function

  },[location.pathname,courseSectionData,completedLectures]);

  return (
    <div className=' py-5 px-5 text-sm'>
      {/* Buttons and heading part */}
        <div className=' flex flex-col gap-4 px-3'>
          {/* for buttons */}
          
          <div className=' flex justify-between items-center'>
            <div className=' bg-richblack-500 w-5 h-5 rounded-full p-3 cursor-pointer flex justify-center items-center'>
              <button onClick={()=> navigate("/dashboard/enrolled-courses") } className='cursor-pointer'><FaCaretLeft></FaCaretLeft> </button>
            </div>
            <div>
              <button onClick={()=>setReviewModal(true)} className='px-4 py-2 bg-yellow-50 rounded-md text-richblack-900 font-semibold'> Add Review </button>
            </div>
          </div>
          {/* for headings */}
          <div className=' flex flex-col'>
            <p className=' text-richblack-5 font-bold text-lg'>{courseEntireData.courseName}</p>
            <p className=' text-richblack-500'>{courseCompletedLectures?.length} / {totalNoOfLectures}</p>
          </div>
        </div>

        {/* for the course drop-dwon */}
        <div className=' flex flex-col'>
          {
            courseSectionData?.map((section,index) => (
              <div key={index}>
                <div onClick={()=>{
                  setActiveStatus(section?._id)
                }} className={` bg-richblack-800 border text-lg px-3 text-richblack-25 font-semibold ${activeStatus === section._id && ("bg-yellow-100 text-richblack-900")}`}>
                  {section?.sectionName}
                </div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeStatus === section._id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  {
                    section?.subSection?.map((subSection,index) => (
                      <div onClick={() =>{
                        setVideoBarActive(subSection?._id);
                       navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${section._id}/sub-section/${subSection._id}`)
                      } 
                        } key={index}  className={` px-6  text-richblack-25 bg-richblack-800 font-semibold flex gap-1 ${videoBarActive === subSection?._id && (" bg-yellow-100 text-richblack-900 ") }`}>
                        <input defaultValue={false} type="checkbox" className=' w-[17px]' readOnly checked={Array.isArray(completedLectures) ? completedLectures.includes(subSection._id) : false} name="markAsCompleted" id="markAsCompleted" />
                        <span>{subSection?.title}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>

    </div>
  )
}

export default VideoDetailsSidebar