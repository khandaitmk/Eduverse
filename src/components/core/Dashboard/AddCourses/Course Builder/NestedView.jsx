import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { deleteSubSection, deletSection } from '../../../../../services/operations/courseDetailsAPI';
// import { updateSection } from '../../../../../services/operations/courseDetailsAPI';
import SubSectionalModal from './SubSectionalModal';
import ConfirmationModel from '../../../../common/ConfirmationModel';

function NestedView(props) {
    const {setSectionId,setEditSectionName,setValue}=props;
    const {course} =useSelector((state)=>state.course);
    const {token} =useSelector((state)=>state.auth);
    const [addSubSection,setAddSubSection]=useState(null);
    const [editSubSection,setEditSubSection] =useState(null);
    const [viewSubSection,setViewSubSection] =useState(null);
    const [confirmationModel,setConfirmationModel]=useState(null);
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
        setConfirmationModel(null);

    };
    const handleDeleteSubSection = async (subSection) =>{
        const result = await deleteSubSection({subSectionId:subSection._id},token,dispatch);
        setConfirmationModel(null);
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

                            <button 
                            onClick={()=> setConfirmationModel(
                                {
                                    text1:"Are you sure?",
                                    text2:"You won't be able to revert this!",
                                    btnText1:"Cancel",
                                    btnText2:"Delete",
                                    btn1Handler:() => setConfirmationModel(null),
                                    btn2Handler:() => handleDeleteSection(section)
                                }
                            )} type='button' className=' cursor-pointer'>
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
                        <div className=' flex flex-col gap-3'>
                            {
                                section.subSection.map((sub)=>{
                                    return(
                                        <div key={sub._id} className='w-11/12 mx-auto'>
                                            <div>
                                                <div  className=' flex justify-between text-richblack-300'>
                                                <div className=' flex items-center gap-3'>
                                                <button type='button' className=' cursor-pointer'><RxDropdownMenu size={30}></RxDropdownMenu></button>
                                                <p className=' font-bold text-lg'>{sub.title}</p>
                                                </div>     
                                                <div className=' flex items-center gap-2'>
                                                <button type='button' className=' cursor-pointer'>
                                                    <MdEdit size={25}></MdEdit>
                                                </button>

                                                <button 
                                                onClick={()=> setConfirmationModel(
                                                    {
                                                        text1:"Are you sure?",
                                                        text2:"You won't be able to revert this!",
                                                        btnText1:"Cancel",
                                                        btnText2:"Delete",
                                                        btn1Handler:() => setConfirmationModel(null),
                                                        btn2Handler:() => handleDeleteSubSection(sub)
                                                    })}
                                                      type='button' className=' cursor-pointer'>
                                                    <MdDeleteOutline size={25}></MdDeleteOutline>
                                                </button>
                                                
                                                </div>                    
                                                </div>
                                                <div className=' bg-richblack-300 w-full h-[0.5px]'></div>
                                            </div>
                                        </div>
                                    );
                                })
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
            {
                confirmationModel && <ConfirmationModel data={confirmationModel}></ConfirmationModel>
            }
    </div>
  )
}

export default NestedView