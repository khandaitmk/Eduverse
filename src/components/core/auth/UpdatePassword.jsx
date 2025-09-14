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
    <div className='w-11/12 mx-auto  text-white'>
        <div className='h-[calc(100vh-4rem)] flex flex-col gap-4 justify-center font-inter w-[40%] mx-auto'>
        <div className=' flex flex-col gap-2 justify-center items-center w-full'>
                <h1 className=' text-3xl font-inter'>
                    {
                        !resetComplet?"Choose new password":"Reset Complete!"
                    }
                </h1>
                <p className='text-richblack-500 w-[] mx-auto text-center'>
                    {
                        !resetComplet?"Almost done, Enter your new password and your all set":`All done We have sent an email to confirm`
                    }
                </p>
            </div>
        <div className='w-[70%] mx-auto'>
          <form action="" method="post" className=' flex flex-col gap-6' onSubmit={submitHandler}>
            {
              !resetComplet &&(
                <div className=' flex flex-col gap-5'>
                  <div className='relative flex flex-col w-full'>
                    <label className='text-richblack-400' htmlFor="">New password <span className='text-red-500'>*</span></label>
                    <input onChange={changeHandler} className='bg-richblack-700 rounded-md p-2 border-b-2 border-richblack-400 w-[100%]' type={showPassword?"text":"password"} name="password" id="password" />
                    <div className='text-richblack-500 absolute bottom-3 right-4 cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}}>
                      {
                        showPassword?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                      }
                    </div>
                    </div>
                  <div className='relative flex flex-col w-full'>
                    <label className='text-richblack-400' htmlFor="">Confirm Password<span className='text-red-500'>*</span></label>
                    <input onChange={changeHandler} className='bg-richblack-700 rounded-md p-2 border-b-2 border-richblack-400 w-[100%]' type={showcPassword?"text":"password"} name="confirmPassword" id="confirmPassword" />
                    <div className='text-richblack-500 absolute bottom-3 right-4 cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}}>
                      {
                        showcPassword?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                      }
                    </div>
                  </div>
            </div>
              )
            }
            <div>
              <button type="submit" className=' bg-yellow-100 rounded-md py-2 text-richblack-900 font-semibold cursor-pointer w-full'>
              {
                !resetComplet?"Reset Password":"Return to login"
              }
              </button>
            </div>
          </form>
        </div>
        <div className='ml-5'>
          <Link to={"/login"} className=' flex items-center gap-2 ml-18'>
                <FaArrowLeftLong></FaArrowLeftLong>
                <p>Back to Login</p>
            </Link>
        </div>

        </div>
    </div>
  )
}

export default UpdatePassword