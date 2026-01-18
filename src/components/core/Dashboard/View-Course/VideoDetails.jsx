import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from "react-player";
import { markLectureAsCompleted } from '../../../../services/operations/courseDetailsAPI';
import { BiSkipPreviousCircle, BiSkipNextCircle } from 'react-icons/bi';
import { MdOutlineReplayCircleFilled, MdCheckCircle } from 'react-icons/md';

import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { courseSectionData, courseEntireData, completedLectures, totlaNoOfLectures } = useSelector((state) => state.viewCourse);
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const [videoEnd, setVideoEnd] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (!courseSectionData || courseSectionData.length === 0) {
      return;
    }

    const currentSection = courseSectionData.find((section) => section._id === sectionId) || courseSectionData[0];
    if (!sectionId || !courseSectionData.find((s) => s._id === sectionId)) {
      const firstSectionId = currentSection?._id;
      const firstSubId = currentSection?.subSection?.[0]?._id;
      if (firstSectionId && firstSubId) {
        navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${firstSectionId}/sub-section/${firstSubId}`);
        return;
      }
    }

    const currentSub = currentSection?.subSection?.find((sub) => sub._id === subSectionId) || currentSection?.subSection?.[0];
    if ((!subSectionId || !currentSection?.subSection?.some((ss) => ss._id === subSectionId)) && currentSub?._id) {
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${currentSection?._id}/sub-section/${currentSub?._id}`);
      return;
    }

    if (currentSub) {
      setVideoData(currentSub);
      setVideoEnd(false);
    }
  }, [sectionId, subSectionId, courseSectionData]);

  const isFirstLecture = () => {
    const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const isLastLecture = () => {
    const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    return currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection.length - 1 && currentSectionIndex === courseSectionData?.length - 1;
  };

  const nextLecture = () => {
    if (isLastLecture()) return;
    
    const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    
    if (currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
      const nextSubsectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex]._id;
      const nextSubsectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`);
    }
  };

  const previousLecture = () => {
    if (isFirstLecture()) return;
    
    const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    
    if (currentSubsectionIndex === 0) {
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const previousSubsectionId = courseSectionData[currentSectionIndex - 1]?.subSection[courseSectionData[currentSectionIndex - 1].subSection.length - 1]._id;
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`);
    } else {
      const previousSectionId = courseSectionData[currentSectionIndex]?._id;
      const previousSubsectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubsectionIndex - 1]._id;
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`);
    }
  }

  const handleLectureComplition = async () => {
    setIsCompleting(true);
    await markLectureAsCompleted({ courseId: courseId, subSectionId: subSectionId }, token, dispatch);
    setIsCompleting(false);
  };

  const isCompleted = Array.isArray(completedLectures) && completedLectures.includes(videoData?._id);

  return (
    <div className='w-full h-full bg-black relative overflow-hidden'>
      {!videoData ? (
        <div className='flex items-center justify-center h-full'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-16 h-16 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin'></div>
            <p className='text-richblack-100 text-lg'>Loading video...</p>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          {/* Floating Title Section - Top */}
          <div className='absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-richblack-900/95 via-richblack-900/90 to-transparent backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4'>
            <div className='flex items-start justify-between gap-2 md:gap-4'>
              <div className='flex-1 min-w-0'>
                <h2 className='text-richblack-5 font-semibold text-sm md:text-base lg:text-xl mb-0.5 md:mb-1 line-clamp-2 md:line-clamp-1'>{videoData?.title}</h2>
                {/* <p className='text-richblack-300 text-xs md:text-sm line-clamp-1'>{videoData?.description}</p> */}
              </div>
              {isCompleted && (
                <div className='flex items-center gap-1 md:gap-2 bg-green-900/30 border border-green-700 px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex-shrink-0'>
                  <MdCheckCircle className='text-green-500 text-sm md:text-base lg:text-lg' />
                  <span className='text-green-500 font-medium text-[10px] md:text-xs lg:text-sm'>Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Player Section */}
          <div className='w-full h-full flex items-center justify-center px-2 md:px-4 pt-12 md:pt-16 lg:pt-0'>
            <div className='w-full max-w-7xl'>
              <MediaController
                className='relative rounded-lg overflow-hidden shadow-2xl'
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                }}>
                <ReactPlayer
                  slot="media"
                  onEnded={() => setVideoEnd(true)}
                  src={videoData?.videoUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <MediaControlBar className='bg-gradient-to-t from-black/90 to-transparent'>
                  <MediaPlayButton />
                  <MediaSeekBackwardButton seekOffset={10} />
                  <MediaSeekForwardButton seekOffset={10} />
                  <MediaTimeRange />
                  <MediaTimeDisplay showDuration />
                  <MediaMuteButton />
                  <MediaVolumeRange />
                  <MediaPlaybackRateButton />
                  <MediaFullscreenButton />
                </MediaControlBar>

                {videoEnd && (
                  <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90 backdrop-blur-sm z-10'>
                    <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 px-4'>
                      {/* Completion Message */}
                      <div className='text-center mb-2 md:mb-4'>
                        <MdOutlineReplayCircleFilled className='text-yellow-50 text-4xl md:text-5xl lg:text-6xl mx-auto mb-2 md:mb-4 animate-pulse' />
                        <h3 className='text-richblack-5 text-xl md:text-2xl font-bold mb-1 md:mb-2'>Lecture Complete!</h3>
                        <p className='text-richblack-300 text-sm md:text-base'>Great job on completing this lesson</p>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto'>
                        {!isCompleted && (
                          <button
                            onClick={handleLectureComplition}
                            disabled={isCompleting}
                            className='px-4 md:px-6 py-2 md:py-3 bg-yellow-50 hover:bg-yellow-25 text-richblack-900 font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm md:text-base w-full sm:w-auto justify-center'
                          >
                            {isCompleting ? (
                              <>
                                <div className='w-4 h-4 md:w-5 md:h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin'></div>
                                <span>Marking...</span>
                              </>
                            ) : (
                              <>
                                <MdCheckCircle className='text-lg md:text-xl' />
                                <span>Mark as Completed</span>
                              </>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => setVideoEnd(false)}
                          className='px-4 md:px-6 py-2 md:py-3 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm md:text-base w-full sm:w-auto justify-center'
                        >
                          <MdOutlineReplayCircleFilled className='text-lg md:text-xl' />
                          <span>Rewatch</span>
                        </button>
                      </div>

                      {/* Navigation Controls */}
                      <div className='flex items-center gap-4 md:gap-8 mt-4 md:mt-6'>
                        {!isFirstLecture() && (
                          <button
                            onClick={previousLecture}
                            className='group flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-richblack-800 hover:bg-richblack-700 text-richblack-100 rounded-lg transition-all duration-200 border border-richblack-600 text-sm md:text-base'
                          >
                            <BiSkipPreviousCircle className='text-xl md:text-2xl group-hover:scale-110 transition-transform' />
                            <span className='font-medium'>Previous</span>
                          </button>
                        )}
                        {!isLastLecture() && (
                          <button
                            onClick={nextLecture}
                            className='group flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-richblack-800 hover:bg-richblack-700 text-richblack-100 rounded-lg transition-all duration-200 border border-richblack-600 text-sm md:text-base'
                          >
                            <span className='font-medium'>Next</span>
                            <BiSkipNextCircle className='text-xl md:text-2xl group-hover:scale-110 transition-transform' />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Quick Navigation Buttons (Always Visible) */}
                    {!isFirstLecture() && (
                      <button
                        onClick={previousLecture}
                        className='absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-richblack-800/90 hover:bg-richblack-700 rounded-full transition-all duration-200 hover:scale-110 border border-richblack-600'
                      >
                        <BiSkipPreviousCircle className='text-2xl md:text-3xl lg:text-4xl text-richblack-100' />
                      </button>
                    )}
                    {!isLastLecture() && (
                      <button
                        onClick={nextLecture}
                        className='absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-richblack-800/90 hover:bg-richblack-700 rounded-full transition-all duration-200 hover:scale-110 border border-richblack-600'
                      >
                        <BiSkipNextCircle className='text-2xl md:text-3xl lg:text-4xl text-richblack-100' />
                      </button>
                    )}
                  </div>
                )}
              </MediaController>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoDetails
