import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiconnector';
import { getAllEnrolledCourses } from '../../../services/operations/profileAPI';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


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
          
          ( enrolledCourses?.length === 0) ? (<div> <p>You have not enrolled in any courses yet</p>  </div>) : 
          (<Table className=' mt-10 border border-richblack-500'>
            <Thead className='border-b border-richblack-500 '>
              <Tr className=''>
                <Th className=' text-left p-2 w-[50%]'>Course Name</Th>
                <Th className=' text-left p-2'>Duration</Th>
                <Th className=' text-left p-2'>Progress</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              
                {
                  enrolledCourses?.map((course,index) => (
                    <Tr key={index} className=' border-b border-richblack-500'>
                      <Td className=' flex  gap-10 p-3 w-[50%]'>
                        <div className='w-[150px] rounded-md'><img width={"150px"} className=' rounded-md' src={course.thumbnail} alt="" /></div>
                        <div className=' flex flex-col gap-3 items-center justify-center'>
                          <p className=' text-white text-lg font-semibold'>{course.courseName}</p>
                          <p className=' text-richblack-400' >{course.courseDescription}</p>
                        </div>
                      </Td>

                      <Td>
                        {'duration dalna hai'}
                      </Td>

                      <Td>
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
                      </Td>
                      <Td></Td>
                    </Tr>
                  ))
                }
              
            </Tbody>
          </Table>)
        }
      </div>
    </div>
  )
}

export default EnrolledCourse