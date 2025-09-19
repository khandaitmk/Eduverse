import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { setCourse,setEditCourse,setStep } from '../../../../../slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import { createSection } from '../../../../../services/operations/courseDetailsAPI';
import { editSection } from '../../../../../services/operations/courseDetailsAPI';

function CourseBuilderForm() {
  const {register, handleSubmit ,setValue,getValues , formState :{errors}} =useForm();
  const [editSectionName,setEditSectionName]=useState(false);
  const {token} = useSelector((state)=> state.auth);
  const {course} = useSelector((state)=>state.course);
  const [sectionId,setSectionId]= useState(null);
  const dispatch=useDispatch();
  
  const goNext = () => {
    if(course.courseContent.length >0){
      if(course.courseContent.some((section)=> section.subSection.length > 0)){
        dispatch(setStep(3));
      } else{
        toast.error("please add atleast one lecture in each section")
      }
    } else{
      toast.error("Please create atleast one section");
    }
  };

   async function submitHandler(){
    const data=getValues();
    console.log("cata :",data);
    let result=null;
    console.log("====",sectionId)
    if(editSectionName){
      result = await editSection({
        sectionName:data.sectionName,
        sectionId:sectionId
      },token,dispatch);

      setEditSectionName(false);
      setValue("sectionName","")
      // setSectionId(null);
    }
    else{
      // console.log("section Name :",data.sectionName)
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id
      },token,dispatch);
      setSectionId(result);
      setValue("sectionName","")

    }
  };

  const HandleEditSectionName = () => {

  };

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-white font-semibold text-2xl'>Course Builder</h1>
      <form className='flex flex-col gap-5' action="" >
        <div className='text-white flex flex-col gap-3'>
          <label className='text-sm' htmlFor="sectionName">Section Name <sup className='text-red-500'>*</sup></label>
          <input className='bg-richblack-700 p-2 py-3 rounded-md border-b-1 border-richblack-300' type="text" name="sectionName" id="sectionName" placeholder='Add a section to build your course' {...register("sectionName",{required:true})}/>
          {
            errors.sectionName && (<p className="ml-2 text-xs tracking-wide text-pink-200">This field is required</p>)
          }
        </div>
        <div>
          <button type='button' onClick={()=>submitHandler()} className='flex items-center gap-3 text-yellow-50 font-semibold border-[1px] p-2 rounded-md cursor-pointer'>
            <span>
              {
                editSectionName ?"Edit Section Name" :"Create Section"
              }
            </span>
            <IoAddCircleOutline></IoAddCircleOutline>
          </button>
        </div>
        {/* for showing the sections */}

        <div>
          {(course.courseContent.length > 0) && <NestedView setEditSectionName={setEditSectionName} setSectionId={setSectionId} setValue={setValue}></NestedView>}
        </div>

        
      </form>
      {/* back and next buttons */}
      <div className='flex gap-3 justify-end'>
        <button className='text-richblack-900 bg-richblack-400 p-2 px-4 rounded-md font-semibold cursor-pointer' onClick={()=>{
          dispatch(setEditCourse(true));
          dispatch(setStep(1));
        }}>
          Back
        </button>
        <button className='text-richblack-900 bg-yellow-50 p-2 px-4 rounded-md font-semibold flex items-center gap-2 cursor-pointer' onClick={goNext}>
          <span>Next</span>
          <FaAngleRight></FaAngleRight>
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm