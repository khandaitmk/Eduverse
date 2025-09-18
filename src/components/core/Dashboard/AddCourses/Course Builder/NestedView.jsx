import React from 'react'
import { useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";


function NestedView(props) {
    const {course} =useSelector((state)=>state.course);
    const {token} =useSelector((state)=>state.auth);

    
  return (
    <div className=' flex flex-col gap-5'>
        {
            course?.courseContent.map((section)=>{
                return(
                    <div key={section._id} className=' flex flex-col gap-2'>
                        <div>
                            <div  className=' flex justify-between text-richblack-300'>
                            <div className=' flex items-center gap-3'>
                            <button className=' cursor-pointer'><RxDropdownMenu size={30}></RxDropdownMenu></button>
                            <p className=' font-bold text-lg'>{section.sectionName}</p>
                            </div>     
                            <div className=' flex items-center gap-2'>
                            <button className=' cursor-pointer'>
                                <MdEdit size={25}></MdEdit>
                            </button>

                            <button className=' cursor-pointer'>
                                <MdDeleteOutline size={25}></MdDeleteOutline>
                            </button>
                            <div className='w-[1px] bg-richblack-300 h-[23px]'></div>
                            <button className=' cursor-pointer'>
                                <IoMdArrowDropdown size={25}></IoMdArrowDropdown>
                            </button>
                            </div>                    
                            </div>
                            <div className=' bg-richblack-300 w-full h-[0.5px]'></div>
                        </div>
                        <div>
                            {
                                console.log("subsection",section.subSection)
                            }
                        </div>
                        <div>
                            <button className=' cursor-pointer flex items-center gap-2 text-yellow-50 font-semibold'>
                                <IoAdd size={25} ></IoAdd>
                                <p>Add Lecture</p>
                            </button>
                        </div>

                    </div>
                );
            })
        }
    </div>
  )
}

export default NestedView