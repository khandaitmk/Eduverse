import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from "react-player";
import { markLectureAsCompleted } from '../../../../services/operations/courseDetailsAPI';
import {BiSkipPreviousCircle} from 'react-icons/bi';
import {BiSkipNextCircle} from 'react-icons/bi';
import {MdOutlineReplayCircleFilled} from 'react-icons/md';


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
  const {courseId,sectionId,subSectionId} =useParams();
  const dispatch = useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {courseSectionData,courseEntireData,completedLectures,totlaNoOfLectures}=useSelector((state)=>state.viewCourse);
  const navigate = useNavigate();
  const [videoData,setVideoData]=useState(null);
  const [videoEnd,setVideoEnd]=useState(false);


  useEffect(()=>{
    if(!courseSectionData || courseSectionData.length === 0){
      return;
    }

    // Resolve current section; if invalid, navigate to first section/subsection
    const currentSection = courseSectionData.find((section)=> section._id === sectionId) || courseSectionData[0];
    if(!sectionId || !courseSectionData.find((s)=> s._id === sectionId)){
      const firstSectionId = currentSection?._id;
      const firstSubId = currentSection?.subSection?.[0]?._id;
      if(firstSectionId && firstSubId){
        navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${firstSectionId}/sub-section/${firstSubId}`);
        return;
      }
    }

    // Resolve current subsection; if invalid, navigate to first in section
    const currentSub = currentSection?.subSection?.find((sub)=> sub._id === subSectionId) || currentSection?.subSection?.[0];
    if((!subSectionId || !currentSection?.subSection?.some((ss)=> ss._id === subSectionId)) && currentSub?._id){
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${currentSection?._id}/sub-section/${currentSub?._id}`);
      return;
    }

    if(currentSub){
      setVideoData(currentSub);
      setVideoEnd(false);
    }
  },[sectionId,subSectionId,courseSectionData]);
  console.log("Video data :",videoData);

  const isFirstLecture = () =>{
    const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    if( currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }else{
      return false;
    }
  };

  const isLastLecture = () => {
        const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id ===       subSectionId);
        if( currentSectionIndex === courseSectionData[currentSectionIndex]?.subSection.length - 1 && currentSectionIndex === courseSectionData?.length - 1){
          return true;
        } else{
          return false;
        }

  };

  const nextLecture = () => {
    if(isLastLecture()){
      return;
    }else{
        const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id ===       subSectionId);
        if (currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection.length - 1) {
        const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
        const nextSubsectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
        navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`);
        }else {
          const nextSectionId = courseSectionData[currentSectionIndex]._id;
          const nextSubsectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
          navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`);
        }
    }
  };

  const previousLecture = () => {
    if (isFirstLecture()) {
      return;
    }
    const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);
    if (currentSubsectionIndex === 0) {
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const previousSubsectionId = courseSectionData[currentSectionIndex - 1]?.subSection[courseSectionData[currentSectionIndex - 1].subSection.length - 1]._id;
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`);
    }else {
      const previousSectionId = courseSectionData[currentSectionIndex]?._id;
      const previousSubsectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubsectionIndex - 1]._id;
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`);
    }
  }

  const handleLectureComplition = async () => {
    const result = await markLectureAsCompleted({courseId:courseId,subSectionId:subSectionId},token,dispatch);

  };

  return (
    <div className='w-full mx-auto'>
        {
          !videoData ?<h1>Loading...</h1> :
          (
            <div className=' h-fit overflow-hidden mx-auto'>
              <MediaController
              className='relative'
              style={{
                      width: "97%",
                      aspectRatio: "16/9",
                    }}>
                <ReactPlayer
                  slot="media"
                  onEnded={()=>setVideoEnd(true)}
                  src={videoData?.videoUrl}
                  // controls={false}
                    style={{
                            width: "100%",
                            height: "100%",
                          }}
                ></ReactPlayer>
                <MediaControlBar>
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
                {
                  videoEnd && (
                    <div>
                      <div className='absolute inset-0 z-10 flex items-center justify-center'>
                      {
                        !(Array.isArray(completedLectures) && completedLectures.includes(videoData._id)) && (
                          <button onClick={()=>handleLectureComplition()} className='px-4 py-4 bg-yellow-100 text-black rounded-md shadow'>Mark As Completed</button>
                        )
                      }
                      </div>
                      {
                    !isFirstLecture() && (
                      <div className=' z-20 left-0 top-1/2 transform -translate-y-1/2 absolute m-5'>
                        <BiSkipPreviousCircle onClick={previousLecture} className=" text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"/>
                        {/* <button onClick={previousLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Previous Lecture</button> */}
                      </div>
                    )

                  }
                  {
                    !isLastLecture() && (
                      <div className=' z-20 right-4 top-1/2 transform -translate-y-1/2 absolute m-5'>
                        <BiSkipNextCircle onClick={nextLecture} className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"/>
                        {/* <button onClick={nextLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Next Lecture</button> */}
                        </div>
                    )
                  }
                    </div>
                  )
                }
              </MediaController>
            </div>
          )
        }
    </div>
  )
}

export default VideoDetails