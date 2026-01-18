import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaCaretLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { BiPlayCircle } from "react-icons/bi";

function VideoDetailsSidebar(props) {
  const { setReviewModal } = props;
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const { courseId, sectionId, subSectionId } = useParams();
  const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);
  const navigate = useNavigate();
  const location = useLocation();
  const [courseCompletedLectures, setCourseCompletedLectures] = useState([]);

  useEffect(() => {
    (() => {
      if (!courseSectionData) {
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
      const safeCompleted = Array.isArray(completedLectures)
        ? completedLectures
        : completedLectures
          ? [completedLectures]
          : [];
      const thisCourseCompleted = safeCompleted.filter((id) =>
        allSubSectionIds.includes(id)
      );
      setCourseCompletedLectures(thisCourseCompleted);
    })()
  }, [location.pathname, courseSectionData, completedLectures]);

  const progressPercentage = totalNoOfLectures > 0 
    ? Math.round((courseCompletedLectures?.length / totalNoOfLectures) * 100) 
    : 0;

  return (
    <div className='h-full bg-richblack-900 flex flex-col border-r border-richblack-700'>
      {/* Header Section */}
      <div className='bg-richblack-800 px-3 md:px-4 lg:px-5 py-4 md:py-5 lg:py-6 border-b border-richblack-700'>
        <div className='flex justify-between items-center mb-3 md:mb-4 gap-2'>
          <button 
            onClick={() => navigate("/dashboard/enrolled-courses")} 
            className='flex items-center gap-1 md:gap-2 text-richblack-300 hover:text-richblack-5 transition-colors group'
          >
            <div className='bg-richblack-700 group-hover:bg-richblack-600 w-7 h-7 md:w-8 md:h-8 rounded-full flex justify-center items-center transition-colors'>
              <FaCaretLeft className='text-base md:text-lg' />
            </div>
            <span className='text-xs md:text-sm font-medium'>Back</span>
          </button>
          <button 
            onClick={() => setReviewModal(true)} 
            className='px-2 md:px-3 lg:px-4 py-1.5 md:py-2 bg-yellow-50 hover:bg-yellow-25 rounded-md text-richblack-900 font-semibold text-xs md:text-sm transition-colors shadow-sm'
          >
            Add Review
          </button>
        </div>

        {/* Course Info */}
        <div className='space-y-2 md:space-y-3'>
          <h3 className='text-richblack-5 font-bold text-sm md:text-base lg:text-lg line-clamp-2'>
            {courseEntireData?.courseName}
          </h3>
          
          {/* Progress Bar */}
          <div className='space-y-1 md:space-y-2'>
            <div className='flex justify-between items-center text-xs md:text-sm'>
              <span className='text-richblack-300'>Progress</span>
              <span className='text-richblack-100 font-semibold'>
                {courseCompletedLectures?.length} / {totalNoOfLectures}
              </span>
            </div>
            <div className='w-full bg-richblack-700 rounded-full h-1.5 md:h-2 overflow-hidden'>
              <div 
                className='bg-gradient-to-r from-yellow-100 to-yellow-50 h-full rounded-full transition-all duration-500 ease-out'
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className='text-[10px] md:text-xs text-richblack-400 text-right'>{progressPercentage}% Complete</p>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        {courseSectionData?.map((section, sectionIndex) => {
          const isActive = activeStatus === section._id;
          const sectionCompletedCount = section?.subSection?.filter(sub => 
            Array.isArray(completedLectures) && completedLectures.includes(sub._id)
          ).length || 0;
          const sectionTotalCount = section?.subSection?.length || 0;

          return (
            <div key={sectionIndex} className='border-b border-richblack-700'>
              {/* Section Header */}
              <button
                onClick={() => setActiveStatus(isActive ? "" : section._id)}
                className={`w-full px-3 md:px-4 lg:px-5 py-3 md:py-4 flex items-center justify-between hover:bg-richblack-800 transition-colors ${
                  isActive ? 'bg-richblack-800' : ''
                }`}
              >
                <div className='flex-1 text-left min-w-0'>
                  <h4 className='text-richblack-25 font-semibold mb-1 text-xs md:text-sm lg:text-base line-clamp-2'>
                    {section?.sectionName}
                  </h4>
                  <p className='text-[10px] md:text-xs text-richblack-400'>
                    {sectionCompletedCount} / {sectionTotalCount} lessons
                  </p>
                </div>
                {isActive ? (
                  <FaChevronUp className='text-richblack-300 text-xs md:text-sm flex-shrink-0 ml-2' />
                ) : (
                  <FaChevronDown className='text-richblack-300 text-xs md:text-sm flex-shrink-0 ml-2' />
                )}
              </button>

              {/* Subsections */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {section?.subSection?.map((subSection, subIndex) => {
                  const isSubActive = videoBarActive === subSection._id;
                  const isSubCompleted = Array.isArray(completedLectures) && completedLectures.includes(subSection._id);

                  return (
                    <button
                      key={subIndex}
                      onClick={() => {
                        setVideoBarActive(subSection._id);
                        navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${section._id}/sub-section/${subSection._id}`)
                      }}
                      className={`w-full px-3 md:px-4 lg:px-5 py-2 md:py-3 flex items-center gap-2 md:gap-3 hover:bg-richblack-700 transition-colors border-l-4 ${
                        isSubActive 
                          ? 'bg-richblack-700 border-yellow-50' 
                          : 'border-transparent'
                      }`}
                    >
                      {/* Checkbox/Icon */}
                      <div className='flex-shrink-0'>
                        {isSubCompleted ? (
                          <MdCheckCircle className='text-green-500 text-base md:text-lg lg:text-xl' />
                        ) : isSubActive ? (
                          <BiPlayCircle className='text-yellow-50 text-base md:text-lg lg:text-xl' />
                        ) : (
                          <MdRadioButtonUnchecked className='text-richblack-400 text-base md:text-lg lg:text-xl' />
                        )}
                      </div>

                      {/* Lesson Title */}
                      <div className='flex-1 text-left min-w-0'>
                        <p className={`text-xs md:text-sm font-medium line-clamp-2 ${
                          isSubActive 
                            ? 'text-yellow-50' 
                            : isSubCompleted 
                              ? 'text-richblack-100' 
                              : 'text-richblack-300'
                        }`}>
                          {subSection?.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #161D29;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2C333F;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #424854;
        }
      `}</style>
    </div>
  )
}


export default VideoDetailsSidebar