import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { resetPassword } from '../../../services/operations/authAPI';


function UpdatePassword() {
  const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const token=location.pathname.split("/").at(-1);
  const [showPassword,setShowPassword]=useState(false);
  const [showcPassword,setShowcPassword]=useState(false);

  const [resetComplet,setResetComplet]=useState(false);
  const [formData,setFormData] =useState({
    password:"",
    confirmPassword:""
  });

  function changeHandler(event){
    setFormData((prev)=>{
      return({...prev,[event.target.name]:event.target.value});
    })
  };

  function submitHandler(e){
    e.preventDefault();
    const {password,confirmPassword}=formData;
    if(!resetComplet){
      dispatch(resetPassword(password,confirmPassword,token,setResetComplet,navigate));
    }else{
      navigate("/login");
    }
  }
  return (
    <div className='w-11/12 mx-auto  text-white px-4'>
        <div className='h-[calc(100vh-4rem)] flex flex-col gap-4 md:gap-6 justify-center font-inter w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto'>
        <div className=' flex flex-col gap-2 md:gap-3 justify-center items-center w-full'>
                <h1 className=' text-2xl md:text-3xl font-inter text-center'>
                    {
                        !resetComplet?"Choose new password":"Reset Complete!"
                    }
                </h1>
                <p className='text-richblack-500 w-full md:w-[90%] mx-auto text-center text-sm md:text-base'>
                    {
                        !resetComplet?"Almost done, Enter your new password and your all set":`All done We have sent an email to confirm`
                    }
                </p>
            </div>
        <div className='w-full md:w-[90%] lg:w-[70%] mx-auto'>
          <form action="" method="post" className=' flex flex-col gap-4 md:gap-6' onSubmit={submitHandler}>
            {
              !resetComplet &&(
                <div className=' flex flex-col gap-4 md:gap-5'>
                  <div className='relative flex flex-col w-full gap-1 md:gap-2'>
                    <label className='text-richblack-400 text-sm md:text-base' htmlFor="">New password <span className='text-red-500'>*</span></label>
                    <input onChange={changeHandler} className='bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-400 w-[100%] text-sm md:text-base' type={showPassword?"text":"password"} name="password" id="password" placeholder='Enter new password' />
                    <div className='text-richblack-500 absolute bottom-2 md:bottom-3 right-3 md:right-4 cursor-pointer text-sm md:text-base' onClick={()=>{setShowPassword(!showPassword)}}>
                      {
                        showPassword?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                      }
                    </div>
                    </div>
                  <div className='relative flex flex-col w-full gap-1 md:gap-2'>
                    <label className='text-richblack-400 text-sm md:text-base' htmlFor="">Confirm Password<span className='text-red-500'>*</span></label>
                    <input onChange={changeHandler} className='bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-400 w-[100%] text-sm md:text-base' type={showcPassword?"text":"password"} name="confirmPassword" id="confirmPassword" placeholder='Confirm new password' />
                    <div className='text-richblack-500 absolute bottom-2 md:bottom-3 right-3 md:right-4 cursor-pointer text-sm md:text-base' onClick={()=>{setShowcPassword(!showcPassword)}}>
                      {
                        showcPassword?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                      }
                    </div>
                  </div>
            </div>
              )
            }
            <div>
              <button type="submit" className=' bg-yellow-100 rounded-md py-2 md:py-2.5 text-richblack-900 font-semibold cursor-pointer w-full text-sm md:text-base hover:bg-yellow-200 transition-colors'>
              {
                !resetComplet?"Reset Password":"Return to login"
              }
              </button>
            </div>
          </form>
        </div>
        <div className='mt-2 md:mt-4'>
          <Link to={"/login"} className=' flex items-center gap-2 text-sm md:text-base hover:text-yellow-50 transition-colors'>
                <FaArrowLeftLong></FaArrowLeftLong>
                <p>Back to Login</p>
            </Link>
        </div>

        </div>
    </div>
  )
}

export default UpdatePassword