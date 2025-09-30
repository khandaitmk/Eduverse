import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import { getAllEnrolledCourses } from '../../../services/operations/profileAPI';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { setLoading } from '../../../slices/authSlice';
// import { setLoading } from '../../../slices/authSlice';

function EnrolledCourse() {
  console.log("✅ EnrolledCourse component rendered");
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getEnrolledCoursesData = async () => {
    try{
      dispatch(setLoading(true));
      const response = await getAllEnrolledCourses(token, dispatch);
      // API returns { success, message, data: isUser }
      const userData = response; // response is already response.data from API
      const courses = userData?.data?.courses || [];
      const courseProgress = userData?.data?.courseProgress;
      console.log("Enrolled courses :", userData);
      setEnrolledCourses(courses);
      setProgressData(courseProgress);
      dispatch(setLoading(false));

    } catch(error){
      console.log("error in enrolled courses :",error);
    }
  };

  useEffect(() => {
    
    getEnrolledCoursesData();
    
  }, []);

  function totalNoOfLectures(course) {
    let total = 0;
    course.courseContent?.forEach((section) => {
      total += section.subSection?.length || 0;
    });
    return total;
  }

  const handleNavigate = (course) => {
      navigate(`view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent[0]?.subSection[0]?._id}`);
    };

  // function calculateDuration(course) {
  //   let totalSeconds = 0;
  //   course.courseContent?.forEach(section => {
  //     section.subSection?.forEach(sub => {
  //       if (!sub.timeDuration) return;
  //       const parts = sub.timeDuration.split(":").map(Number);
  //       let seconds = 0;
  //       if (parts.length === 3) {
  //         seconds = parts[0]*3600 + parts[1]*60 + parts[2];
  //       } else if (parts.length === 2) {
  //         seconds = parts[0]*60 + parts[1];
  //       } else {
  //         seconds = parts[0];
  //       }
  //       totalSeconds += seconds;
  //     });
  //   });
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   return `${hours}h ${minutes}m`;
  // }

  return (
    <div className='text-white w-11/12 max-w-[80%] py-10 mx-auto'>
      <div>
        <h1 className='text-3xl text-richblack-50'>Enrolled Courses</h1>
        {
          (enrolledCourses.length === 0) ? (
            <div><p>You have not enrolled in any courses yet</p></div>
          ) : (
            <Table className='mt-10 border border-richblack-500'>
              <Thead className='border-b border-richblack-500 '>
                <Tr>
                  <Th className='text-left p-2 w-[50%]'>Course Name</Th>
                  <Th className='text-left p-2'>Duration</Th>
                  <Th className='text-left p-2'>Progress</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {enrolledCourses.map((course, index) => {
                  const courseProgress = progressData.find(
                    (p) => p.courseId === course?._id
                  );
                  const completedPercentage =
                    totalNoOfLectures(course) > 0
                      ? (courseProgress?.completedVideos?.length / totalNoOfLectures(course)) * 100
                      : 0;
                  // console.log("Completed percentage :",course);
                  return (
                    <Tr onClick={()=>handleNavigate(course)}
                     key={index} className='border-b border-richblack-500'>
                      <Td  onClick={()=>handleNavigate(course)} className='flex gap-10 p-3 w-full items-center'>
                        <div className='w-[150px] h-[100px] rounded-md flex-shrink-0'>
                          <img className='rounded-md w-full h-full object-contain' src={course.thumbnail} alt="" />
                        </div>
                        <div className='flex flex-col gap-3 justify-center w-full'>
                          <p className='text-white text-lg font-semibold'>{course.courseName}</p>
                          <p className='text-richblack-400'>{(course.courseDescription.length > 50) 
                              ? course.courseDescription.slice(0, 50) + '....' 
                              : course.courseDescription}
                          </p>
                        </div>
                      </Td>

                      <Td onClick={()=>handleNavigate(course)}>baki hai</Td>

                      <Td onClick={()=>handleNavigate(course)}>
                        {courseProgress ? (
                          <div className=' flex flex-col text-yellow-100'>
                            <p>{completedPercentage}% Completed</p>
                            <ProgressBar
                              completed={completedPercentage}
                              height='8px'
                              isLabelVisible={false}
                            />
                          </div>
                        ) : (
                          <p>No progress yet</p>
                        )}
                      </Td>
                      <Td></Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          )
        }
      </div>
    </div>
  )
}

export default EnrolledCourse
