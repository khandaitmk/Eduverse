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
import { current } from '@reduxjs/toolkit';
import { setCourse, setEditCourse,setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';  
import { addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

function CourseInformationForm() {
  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
  const dispatch=useDispatch();
  const [preview,setPreview]=useState(null);

  const {course,editCourse}=useSelector((state) => state.course);
  const [loading,setLoading]= useState(false);
  const [courseCategories,setCourseCategories]=useState([]);
  const {token} = useSelector((state)=> state.auth);

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

    // if edit course is true then we set the previous values to the form

    if(editCourse){
      
      console.log("course tags :",course.tags);
      setValue("courseTitle",course.courseName);
      setValue("shortDesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseCategory",course.category);
      setValue("courseTag",course.tags);
      setValue("thumbnail",course.thumbnail);
      setPreview(course.thumbnail);
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("requirement",course.requirements);
    }

  },[]);

  // now checking whether form is updated or not i.e the course values and the current values are differen like wise
  const formUpdated =() =>{
    const currentValues = getValues();
          
    if(currentValues.courseTitle !== course.courseName ||
      currentValues.shortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      (currentValues.courseCategory?._id || currentValues.courseCategory) !== (course.category?._id || course.category) ||
      JSON.stringify(currentValues.courseTag) !== JSON.stringify(course.tags) ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      JSON.stringify(currentValues.requirement) !== JSON.stringify(course.requirements)      
    )
      return true;
    else
      return false;
  };


  async function submitHandler(data){
    if(editCourse){
      if(formUpdated()){
        const currentValues = getValues();
          console.log("current course :",course);
          console.log("current values :",currentValues);
        const formData = new FormData();
        formData.append("courseID",course._id);
        if(currentValues.courseTitle !== course.courseName){
          formData.append("courseName",currentValues.courseTitle);
        }
        if(currentValues.shortDesc !== course.courseDescription){
          formData.append("courseDescription",currentValues.shortDesc);
        }
        if(currentValues.coursePrice !== course.price){
          formData.append("price",currentValues.coursePrice);
        }
        if((currentValues.courseCategory?._id || currentValues.courseCategory) !== (course.category?._id || course.category)){
          formData.append("category",currentValues.courseCategory._id || currentValues.courseCategory);
        }
        if(JSON.stringify(currentValues.courseTag) !== JSON.stringify(course.tags)){
          formData.append("tags",JSON.stringify(currentValues.courseTag));
        }
        if(currentValues.courseBenefits !== course.whatYouWillLearn){
          formData.append("whatYouWillLearn",currentValues.courseBenefits);
        }
        if(JSON.stringify(currentValues.requirement) !== JSON.stringify(course.requirements)){
          formData.append("requirements",JSON.stringify(currentValues.requirement));
        }
        if(currentValues.thumbnail !== course.thumbnail){
          formData.append("thumbnail",currentValues.thumbnail);
        }

        const result = await editCourseDetails(formData,token,dispatch);
        if(result){
          dispatch(setEditCourse(false));
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        console.log("result :",result);

      }
      else{
        toast.error("No changes made to the form");
      }
      return
    }
    else{
      const formData = new FormData();
      formData.append("courseName",data.courseTitle);
      formData.append("courseDescription",data.shortDesc);
      formData.append("price",data.coursePrice);
      formData.append("category",data.courseCategory);
      formData.append("tag",JSON.stringify(data.courseTag));
      formData.append("thumbnail",data.thumbnail);
      formData.append("whatYouWillLearn",data.courseBenefits);
      formData.append("instructions",JSON.stringify(data.requirement));
      console.log("data:",data)
      console.log("thumbnail",data.thumbnail);
      const result = await addCourseDetails(formData,token);
      if(result){
        dispatch(setCourse(result));
        dispatch(setStep(2));
        // console.log("courseId :",course);
      }
      console.log("result",result);
    }

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
          <label htmlFor="shortDesc" className='text-sm'>Coures Short Description <sup className='text-red-500'>*</sup></label>
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
          <select name="courseCategory" id="courseCategory" className='bg-richblack-700 p-2 py-4 rounded-md border-b-1 border-richblack-300' {...register("courseCategory",{required:true})}>
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
            <Upload name={"thumbnail"} register={register} setValue={setValue} getValues={getValues} label={"Course Thumbnail"} preview={preview} setPreview={setPreview}></Upload>
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