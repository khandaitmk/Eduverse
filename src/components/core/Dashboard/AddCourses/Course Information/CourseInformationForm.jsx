import React, { use, useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import ChipInputComponent from './ChipInputComponent';
import Requirements from './Requirements';
import Upload from './Upload';
import { FaArrowRight } from "react-icons/fa";


function CourseInformationForm() {
  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
  const dispatch=useDispatch();
  const {course,editCourse}=useSelector((state) => state.course);
  const [loading,setLoading]= useState(false);
  const [courseCategories,setCourseCategories]=useState([]);

  useEffect(() =>{
    const getCategories = async() =>{
      setLoading(true);
      const categories = await fetchCourseCategories();
      const result= categories || [];
      if(result.length > 0){
          setCourseCategories(result);
    }
    }
    getCategories();
    console.log("categories in course info form",courseCategories);
    setLoading(false);
  },[]);

  function submitHandler(data){

    console.log("data in course info form",data);
  }

  
    

  return (
    <div className='w-full '>
      <form action="" method="post" onSubmit={handleSubmit(submitHandler)}
      className='w-full flex flex-col gap-5'>
        <div className=' text-white flex flex-col w-full gap-3'>
          <label htmlFor="courseTitle" className='text-sm'>Coures Title <sup className='text-red-500'>*</sup></label>
          <input type="text" name="courseTitle" id="courseTitle" placeholder='Enter Course Title' {...register("courseTitle" ,{required:true})}
          className=' bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300'/>
           {
           errors.courseTitle && (<span> Course Title is required </span>)            
           }
        </div>

        <div className=' text-white flex flex-col w-full  gap-3'>
          <label htmlFor="courseTitle" className='text-sm'>Coures Short Description <sup className='text-red-500'>*</sup></label>
          <textarea name="shortDesc" id="shortDesc" cols="5" rows="5" placeholder='Enter Description' {...register("shortDesc" ,{required:true})} 
          className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300'></textarea>
           {
           errors.courseTitle && (<span> Course Title is required </span>)            
           }
        </div>

        <div className=' text-white flex flex-col w-full gap-3'>
          <label htmlFor="coursePrice" className='text-sm'>Coures Price <sup className='text-red-500'>*</sup></label>
          <div className=' flex items-center px-2 bg-richblack-700 rounded-md border-b-1 border-richblack-300 text-richblack-300'>
            <RiMoneyRupeeCircleLine size={25}></RiMoneyRupeeCircleLine>
            <input type="text" inputMode='numeric' pattern='[0-9]*' name="coursePrice" id="coursePrice" placeholder={`Enter Course Price`} {...register("coursePrice" ,{required:true})}
          className='bg-richblack-700 p-2 py-4'/>
           {
           errors.courseTitle && (<span> Course Title is required </span>)            
           }
          </div>
        </div>

        <div className=' text-white flex flex-col w-full gap-3 '>
          <label htmlFor="courseCategory" className='text-sm'>Coures Category <sup className='text-red-500'>*</sup></label>
          <select name="category" id="category" className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300' {...register("courseCategories",{required:true})}>
            {
              errors.courseCategories && ("Course Category is required")
            }
            <option value="" disabled>choose a category</option>
            {
              courseCategories.map((category,index) => {
                return(
                  <option key={index} value={category.name} className='  bg-richblack-500 p-2 py-4 rounded-md border-b-1 border-richblack-300'>
                    {category.name}
                  </option>
                );
              })
            }
          </select>
        </div>

            {/* taggs with chip */}
        <ChipInputComponent name={"courseTag"} register={register} errors={errors} setValue={setValue} getValues={getValues} label={"Tags"} placeholder={"Enter Tag and Press Enter"} />
        
        {/* course Thumbnail */}
            <Upload name={"thumbnail"} register={register} setValue={setValue} getValues={getValues} label={"Course Thumbnail"}></Upload>
        {/* Benifits of course */}
        <div className=' text-white flex flex-col w-full  gap-3'>
          <label htmlFor="courseBenefits" className='text-sm'>Benifits of the course <sup className='text-red-500'>*</sup></label>
          <textarea name="courseBenefits" id="courseBenefits" cols="5" rows="5" placeholder='Enter benefits of the course' {...register("courseBenefits" ,{required:true})} 
          className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300'></textarea>
           {
           errors.courseTitle && (" course benefits are required to enter ")            
           }
        </div>

        {/* requirements */}
        <Requirements name={"requirement"} register={register} setValue={setValue} getValues={getValues}></Requirements>
        <div className='flex justify-end'>
           <button type='submit' className=' cursor-pointer text-richblack-900 font-bold text-lg bg-yellow-100 rounded-md p-2 px-8 flex items-center gap-2'>Next <FaArrowRight></FaArrowRight> </button>
        </div>
      </form>
    </div>
  )
}

export default CourseInformationForm