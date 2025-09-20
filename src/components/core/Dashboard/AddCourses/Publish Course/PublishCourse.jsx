import React from 'react'
import { useForm } from 'react-hook-form';
import { setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
function PublishCourse() {
  const {register,handleSubmit,formState:{errors},watch,getValues,setValue}=useForm();
  const {token} =useSelector((state) => state.auth);
  const {course} =useSelector((state) => state.course);
  const dispatch =useDispatch();
  const navigate =useNavigate();
  
  const handlePublish = async(data) => {
    if((course.status === "Published" && getValues("public") === true ) || (course.status === "Draft" && getValues("public") === false)){
      navigate("/dashboard/my-profile");
      dispatch(setStep(1));
      dispatch(setEditCourse(false));
      return;
    }

    const formData=new FormData();
    formData.append("courseID",course._id);
    formData.append("status",getValues("public") ? "Published" : "Draft");
    const result = await editCourseDetails(formData,token);
    if(result){
      navigate("/dashboard/my-profile");
      dispatch(setStep(1));
      dispatch(setEditCourse(false));
    }else{
      console.log("Error in publishing the course");
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
          <input type="checkbox" name="public" id="public" className=' w-5 h-5' {...register("public",{required:true})} />
          <label htmlFor="public">Make this course as public</label>
        </div>
        <div className=' flex gap-5 justify-end'>
          <button type='button' onClick={()=> dispatch(setStep(2))} className='p-2 px-5 bg-richblack-400 text-richblack-900 rounded-md font-semibold'>Back</button>
          <button type='submit' className='p-2 px-4 bg-yellow-50 text-richblack-900 rounded-md font-semibold '>Save changes</button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse