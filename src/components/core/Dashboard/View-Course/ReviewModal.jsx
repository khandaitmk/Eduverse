import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import ReactStars from 'react-stars';
import { useEffect } from 'react';
import { createRatingAndReview } from '../../../../services/operations/courseDetailsAPI';

function ReviewModal({setReviewModal}) {
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const {courseId} = useParams();

  const {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();
    useEffect(()=>{
        setValue("userExperience","");
        setValue("userRating",undefined);
      }
      ,[]);

  const ratingChanged = (newRating)=>{
    setValue("userRating",newRating)
  };

  const onSubmit = async(data)=>{
    console.log("data of the rating :",data);
    const result = await createRatingAndReview({courseId:courseId,rating:data.userRating,review:data.userExperience},token);
    setReviewModal(false);
    console.log(result);
  };

  return (
    <div className='fixed inset-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm'>
      <div className='bg-richblack-800 h-fit w-[30rem] flex flex-col gap-5 rounded-md'>
        <div className=' bg-richblack-600 flex justify-between px-3 rounded-t-md py-2 text-white items-center'>
          <p>Add Review</p>
          <RxCross2 onClick={()=>{setReviewModal(false)}}></RxCross2>
        </div>

        <div className=' flex flex-col gap-1 px-5 '>
          <div className=' flex justify-center items-center gap-3'>
              <div className=' w-[3rem]'><img width={""} className='w-[3rem] rounded-full' src={user?.image} alt="profile picture" /></div>
              <div>
                <p className=' text-richblack-5 '>{user?.firstName} {user?.lastName}</p>
                <p className='text-richblack-500'>Posting Publicly</p>
              </div>
          </div>
          <div className=''>
              <form onSubmit={handleSubmit(onSubmit)} action="" method="post" className=' flex flex-col gap-5 py-5'>
                <ReactStars className='flex justify-center'
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
              <input  value={getValues("userRating")} {...register("userRating",{required:true})} type='hidden'/>
              {errors.userRating && <span className='text-pink-200 text-[11px]'>* Please provide your rating</span>}

              <div className=' flex flex-col text-sm gap-2'>
                <label htmlFor="userExperience" className='text-richblack-400'>Add Your Experience <sup className=' text-red-500'>*</sup></label>
                <textarea className=' bg-richblack-600 rounded-md text-richblack-100 px-2 py-4' name="userExperience" id="userExperience"  rows="5" placeholder='Share Details of your own experience for this course' {...register("userExperience",{required:true})}></textarea>
                {
                  errors.userExperiece && <span className='text-pink-200 text-[12px]'>* Please provide your expirence</span>
                }
              </div>
              <div className=' flex gap-3 justify-end'>
                <button className=' px-4 py-2 text-richblack-50 bg-richblack-700 rounded-md font-semibold shadow-richblack-300 shadow-[1px_1px_0.5px_1px]' onClick={()=>{
                  setReviewModal(false);
                }}>Cancel</button>
                <button className=' px-4 py-2 bg-yellow-100 text-richblack-900 font-semibold rounded-md shadow-richblack-300 shadow-[1px_1px_0.5px_1px]' type="submit">Submit</button>
              </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal