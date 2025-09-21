import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
function PublishCourse() {
  const {register,handleSubmit,formState:{errors},watch,getValues,setValue}=useForm();
  const {token} =useSelector((state) => state.auth);
  const {course} =useSelector((state) => state.course);
  const dispatch =useDispatch();
  const navigate =useNavigate();
  
  useEffect(() => {
    if(course.status === "Published"){
      setValue("public", true);
    } else {
      setValue("public", false);
    }
  }, [course.status, setValue]);
  const handlePublish = async(data) => {
    try {
      const isPublic = getValues("public");
      
      // If no changes needed (already in desired state)
      if((course.status === "Published" && isPublic === true) || (course.status === "Draft" && isPublic === false)){
        navigate("/dashboard/my-courses");
        dispatch(setStep(1));
        dispatch(setEditCourse(false));
        toast.success("No changes needed");
        return;
      }
       // Update course status
      const formData = new FormData();
      formData.append("courseID", course._id);
      formData.append("status", isPublic ? "Published" : "Draft");
      
      const result = await editCourseDetails(formData, token, dispatch);
      if(result){
        navigate("/dashboard/my-courses");
        dispatch(setStep(1));
        dispatch(setEditCourse(false));
        toast.success(isPublic ? "Course published successfully" : "Course saved as draft successfully");
      } else {
        console.log("Error in updating the course");
        toast.error("Failed to update course status");
      }
    } catch (error) {
      console.error("Error in handlePublish:", error);
      toast.error("An error occurred while updating the course");
    }
  };

  const submitHandler=(data)=>{
    handlePublish(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)} className=' flex flex-col gap-10 '>
        <p className=' text-white text-2xl font-semibold'>Publish Settings</p>
        <div className=' text-lg flex items-center gap-4'>
          <input 
            type="checkbox" 
            name="public" 
            id="public" 
            className=' w-5 h-5' 
            {...register("public")} 
          />
          <label htmlFor="public">Make this course as public</label>
        </div>
        <div className=' flex gap-5 justify-end '>
          <button type='button' onClick={()=> dispatch(setStep(2))} className='p-2 px-5 bg-richblack-400 text-richblack-900 cursor-pointer rounded-md font-semibold'>Back</button>
          <button type='submit' className='p-2 px-4 bg-yellow-50 text-richblack-900 rounded-md font-semibold cursor-pointer'>Save changes</button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse