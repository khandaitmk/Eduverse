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
    <div className='w-full text-richblack-300 overflow-x-auto'>
        <table className="rounded-xl border border-richblack-800 w-full min-w-[600px]">
            <thead className=''>
                <tr className=' border-b-[1px] border-richblack-700 px-2 md:px-4'>
                    <th className='text-left p-2 text-xs md:text-sm'>COURSES</th>
                    <th className=' p-2 text-xs md:text-sm hidden md:table-cell'>DURATION</th>
                    <th className=' p-2 text-xs md:text-sm'>PRICE</th>
                    <th className=' p-2 text-xs md:text-sm'>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {
                    courses?.length === 0 ? (
                <tr>
                    <td colSpan="4" className="py-10 text-center text-lg md:text-2xl font-medium text-richblack-100">
                    No courses found
                    {/* TODO: Need to change this state */}
                    </td>
                </tr>
                ) :
                ( 
                        courses?.map((item)=>(
                            <tr key={item._id} className='border-b border-richblack-800'>
                                <td className=' p-4 md:p-6 lg:p-8'>
                                    <div className='flex flex-col sm:flex-row gap-3 md:gap-5'>
                                        <div>
                                            <div className='w-32 md:w-40 lg:w-50'><img className=' rounded-md w-full h-auto' src={item.thumbnail} alt="" /></div>
                                        </div>
                                        <div className='flex flex-col justify-between gap-2'>
                                            <p className=' text-white text-base md:text-lg font-semibold'>{item.courseName}</p>
                                            <p className='text-xs md:text-sm line-clamp-2'>{item.courseDescription}</p>
                                            <p className='text-[10px] md:text-[11px] w-fit '>{(item.status ==="Published")?(
                                            <div className='flex items-center gap-1 p-1 bg-richblack-800 rounded-full px-2 text-yellow-50'>
                                                <FaCircleCheck className="text-xs"></FaCircleCheck>
                                                <p className="text-xs">{item.status}</p>
                                            </div>
                                            ):(
                                            <div className='flex items-center gap-1 p-1 bg-richblack-800 rounded-full px-2 text-red-500'>
                                                <AiFillClockCircle className="text-xs"></AiFillClockCircle>
                                                <p className="text-xs">{item.status}</p>
                                            </div>
                                            )}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center text-sm md:text-base hidden md:table-cell'>
                                    {/* {
                                        item.courseContent.map((i)=>{
                                            return(
                                                i.subSection.map((k)=>{
                                                return(<div>{k.timeDuration}</div>)
                                            })
                                            )})
                                    } */}
                                    baki hai
                                </td>
                                <td className='text-center text-sm md:text-base'>
                                    <p>Rs. {item.price}</p>
                                </td>
                                <td className='text-center'>
                                    <div className=' flex gap-2 md:gap-3 justify-center'>
                                        <button className=' cursor-pointer hover:text-yellow-50 transition-colors' onClick={()=>editHandler(item)}><MdModeEdit size={20} className="md:w-6 md:h-6"></MdModeEdit> </button>
                                        <button className=' cursor-pointer hover:text-red-500 transition-colors' onClick={deleteHandler}><MdDelete size={20} className="md:w-6 md:h-6"></MdDelete> </button>
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