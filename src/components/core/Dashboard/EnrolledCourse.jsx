import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiconnector';
import { getAllEnrolledCourses } from '../../../services/operations/profileAPI';

function EnrolledCourse() {
  const {token} =useSelector((state) => state.auth);

  const [enrolledCourses,setEnrolledCourses]=useState(undefined);
  const [progressData,setProgressData] = useState(undefined);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const getEnrolledCourses=async ()=>{
    const response = await getAllEnrolledCourses(token,dispatch);
    console.log("Enrolled courses :",response?.courses);
    setEnrolledCourses(response?.courses);
    setProgressData(response?.courseProgress);
  };

  useEffect(()=>{
    getEnrolledCourses();
  },[]);

  // function totalNoOfLectures(course){
  //           let total = 0;
  //       course.courseContent.forEach((section) => {
  //           total += section.subSection.length;
  //       });
  //       return total;

  // }
  return (
    <div className=' text-white w-11/12 max-w-[80%] py-10 mx-auto'>
      <div>
        <h1 className=' text-3xl text-richblack-50'>Enrolled Courses</h1>
        { 
          
          (enrolledCourses || enrolledCourses?.length === 0) ? (<div> <p>You have not enrolled in any courses yet</p>  </div>) : 
          (<div>
            <div className=' flex'>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>
            <div>
              <div>
                {
                  (enrolledCourses>0) && enrolledCourses.map((course,index) => (
                    <div key={index}>

                      <div>
                        <img src={course.thumbnail} alt="" />
                        <div>
                          <p>{course.courseName}</p>
                          <p>{course.courseDescription}</p>
                        </div>
                      </div>

                      <div>
                    
                      </div>

                      <div>
                        {
                          progressData?.map((progress,index) =>{
                            if(progress.courseId === course?._id){
                              return (
                                <div>
                                    {/* <p>Completed </p>
                                    <ProgressBar
                                    completed={progress?.completedVideos?.length/totalNoOfLectures(course)*100}
                                    total={progress?.total}
                                      height='8px'
                                      isLabelVisible={false}
                                      /> */}
                                    </div>

                                
                              )
                            }
                          })
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default EnrolledCourse