import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from "react-player";
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

  useEffect(()=>{
    if(!courseSectionData || courseSectionData.length === 0){
      return;
    }

    const filteredSection = courseSectionData?.filter((section)=> section._id ===sectionId);
    console.log("filtered section :",filteredSection);
    const filteredSubSection = filteredSection[0]?.subSection?.filter((subsection)=>subsection._id === subSectionId);

    setVideoData(filteredSubSection[0]);
  },[sectionId,subSectionId,courseSectionData]);
  console.log("Video data :",videoData);
  return (
    <div className='w-full mx-auto'>
        {
          !videoData ?<h1>Loading...</h1> :
          (
            <div className=' h-fit overflow-hidden mx-auto'>
              <MediaController
              style={{
                      width: "97%",
                      aspectRatio: "16/9",
                    }}>
                <ReactPlayer
                  slot="media"
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
              </MediaController>
            </div>
          )
        }
    </div>
  )
}

export default VideoDetails