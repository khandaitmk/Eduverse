import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { deletSection } from '../../../../../services/operations/courseDetailsAPI';
// import { updateSection } from '../../../../../services/operations/courseDetailsAPI';
import SubSectionalModal from './SubSectionalModal';

function NestedView(props) {
    const {setSectionId,setEditSectionName,setValue}=props;
    const {course} =useSelector((state)=>state.course);
    const {token} =useSelector((state)=>state.auth);
    const [addSubSection,setAddSubSection]=useState(null);
    const [editSubSection,setEditSubSection] =useState(null);
    const [viewSubSection,setViewSubSection] =useState(null);
    const dispatch=useDispatch();

    const handleUpdateSection = async(section)=>{
        // e.preventDefault();
        // console.log("+++",section._id)
        setEditSectionName(true);
        setSectionId(section._id);
        console.log("this is the data to update the section",section);
        setValue("sectionName",section.sectionName);
        // const result = await updateSection({sectionName:section.sectionName,sectionId:section._id},token,dispatch);
        // console.log("response after update the section : ",result);
    };
    
    const handleDeleteSection = async (section) =>{
        const result = await deletSection({sectionId:section._id},token,dispatch);
        setValue("sectionName","")
    };

    
  return (
    <div>
        <div className=' flex flex-col gap-5'>
        {
            course.courseContent.map((section)=>{
                return(
                    <div key={section._id} className=' flex flex-col gap-2'>
                        <div>
                            <div  className=' flex justify-between text-richblack-300'>
                            <div className=' flex items-center gap-3'>
                            <button type='button' className=' cursor-pointer'><RxDropdownMenu size={30}></RxDropdownMenu></button>
                            <p className=' font-bold text-lg'>{section.sectionName}</p>
                            </div>     
                            <div className=' flex items-center gap-2'>
                            <button type='button' className=' cursor-pointer' onClick={()=>handleUpdateSection(section)}>
                                <MdEdit size={25}></MdEdit>
                            </button>

                            <button onClick={()=> handleDeleteSection(section)} type='button' className=' cursor-pointer'>
                                <MdDeleteOutline size={25}></MdDeleteOutline>
                            </button>
                            <div className='w-[1px] bg-richblack-300 h-[23px]'></div>
                            <button type='button' className=' cursor-pointer'>
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
                            <button type='button' onClick={()=> setAddSubSection(section._id)} className=' cursor-pointer flex items-center gap-2 text-yellow-50 font-semibold'>
                                <IoAdd size={25} ></IoAdd>
                                <p>Add Lecture</p>
                            </button>
                        </div>

                    </div>
                );
            })
        }
        </div>
        
            {
                addSubSection ?<SubSectionalModal modalData={addSubSection} setModalData={setAddSubSection} add={true} edit={false} view={false}></SubSectionalModal>:
                editSubSection ?<SubSectionalModal  modalData={editSubSection} setModalData={setEditSectionName} add={false} edit={true} view={false}></SubSectionalModal>:
                viewSubSection ?<SubSectionalModal  modalData={viewSubSection} setModalData={setViewSubSection} add={false} edit={false} view={true}></SubSectionalModal>:null
            }
    </div>
  )
}

export default NestedView