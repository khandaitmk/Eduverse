import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { AiFillClockCircle } from "react-icons/ai";
import { editCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';


function CourseList(props) {
    const {courses}=props;
    console.log("courses in the course list",courses);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const editHandler = (course) =>{
        dispatch(setCourse(course));
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
        navigate("/dashboard/add-course");
    };
    const deleteHandler = () =>{
        
    };
  return (
    <div className='w-11/12 text-richblack-300'>
        <table className="rounded-xl border border-richblack-800 w-full">
            <thead className=''>
                <tr className=' border-b-[1px] border-richblack-700 px-4'>
                    <th className='text-left p-2'>COURSES</th>
                    <th className=' p-2'>DURATION</th>
                    <th className=' p-2'>PRICE</th>
                    <th className=' p-2'>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {
                    courses?.length === 0 ? (
                <tr>
                    <td className="py-10 text-center text-2xl font-medium text-richblack-100">
                    No courses found
                    {/* TODO: Need to change this state */}
                    </td>
                </tr>
                ) :
                ( 
                        courses?.map((item)=>(
                            <tr key={item._id} className='border-b border-richblack-800'>
                                <td className=' p-8 '>
                                    <div className='flex gap-5'>
                                        <div>
                                            <div><img className=' rounded-md w-50' src={item.thumbnail} alt="" /></div>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <p className=' text-white text-lg font-semibold'>{item.courseName}</p>
                                            <p className='text-sm'>{item.courseDescription}</p>
                                            <p className='text-[11px] w-fit '>{(item.status ==="Published")?(
                                            <div className='flex items-center gap-1 p-1 bg-richblack-800 rounded-full px-2 text-yellow-50'>
                                                <FaCircleCheck></FaCircleCheck>
                                                <p>{item.status}</p>
                                            </div>
                                            ):(
                                            <div className='flex items-center gap-1 p-1 bg-richblack-800 rounded-full px-2 text-red-500'>
                                                <AiFillClockCircle></AiFillClockCircle>
                                                <p>{item.status}</p>
                                            </div>
                                            )}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center'>
                                    {
                                        item.courseContent.map((i)=>{
                                            return(
                                                i.subSection.map((k)=>{
                                                return(<div>{k.timeDuration}</div>)
                                            })
                                            )})
                                    }
                                </td>
                                <td className='text-center'>
                                    <p>{item.price}</p>
                                </td>
                                <td className='text-center'>
                                    <div className=' flex gap-3 justify-center'>
                                        <button className=' cursor-pointer' onClick={()=>editHandler(item)}><MdModeEdit size={25}></MdModeEdit> </button>
                                        <button className=' cursor-pointer' onClick={deleteHandler}><MdDelete size={25}></MdDelete> </button>
                                    </div>
                                </td>
                            </tr>
                        )) 
                )
                }
            </tbody>
        </table>
    </div>
  )
}

export default CourseList