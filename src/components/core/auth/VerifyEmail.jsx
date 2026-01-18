import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineReplay10 } from "react-icons/md";
import OTPInput ,{ResendOTP} from 'otp-input-react'
import { sentOtp, signUp } from '../../../services/operations/authAPI';
import { setSignUpData } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const VerifyEmail = () => {
    const dispatch=useDispatch();
    const [OTP,setOTP]=useState("");
    const {signUpData}=useSelector(state => state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!signUpData){
            navigate("/signup");
        }
    },[]);
        const {accountType,firstName,lastName,email,password,cPassword}=signUpData;

    function handleSubmit(event){
        event.preventDefault();
        console.log(signUpData);
        // console.log(c);

        dispatch(signUp(accountType,firstName,lastName,email,password,cPassword,OTP,navigate));
        toast.success("signup completed");


    };

    function resendHandler(event){
        event.preventDefault();
        dispatch(sentOtp(email,navigate));
        toast.success("Otp send successfully");
    }   

  return (
    <div className=' flex justify-center items-center h-[calc(100vh-4rem)] px-4'>
        <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] bg-richblack-900 rounded-md border-[1px] border-richblack-700 flex  flex-col gap-6 md:gap-8 p-4 md:p-5 lg:p-6' >
            <div className=' flex flex-col gap-2 md:gap-3'>
                <h1 className=' text-2xl md:text-3xl text-white font-inter text-center'>Verify Email</h1>
                <p className=' text-sm md:text-base lg:text-xl w-full md:w-[85%] mx-auto text-richblack-500 text-center'>A verification code has been sent to you . Enter the code below</p>
            </div>
            <div className=' flex flex-row gap-3 md:gap-5 lg:gap-7 mx-auto justify-center'>
                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} inputClassName="bg-richblack-800 rounded-md text-center text-lg md:text-xl lg:text-2xl" inputStyles={{
                color: "#FFFFFF",
                 width:"40px",
                 height:"40px"
                }}
                containerStyle="gap-2 md:gap-3 lg:gap-4"
                />

                
            </div>
            <div className=' w-full md:w-[88%] mx-auto'>
                <button onClick={handleSubmit} className='p-2.5 md:p-3 bg-yellow-50 w-full rounded-md cursor-pointer font-semibold text-sm md:text-base hover:bg-yellow-100 transition-colors'>Verify Email</button>
            </div>
            <div className=' text-white flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mx-2 md:mx-5 text-sm md:text-base'>
                <Link to={"/signup"} className=' flex gap-2 md:gap-3 items-center hover:text-yellow-50 transition-colors'>
                <FaArrowLeftLong></FaArrowLeftLong>
                <p>Back To Signup</p>
                </Link>
                <button onClick={resendHandler} className=' flex items-center text-blue-200 gap-2 hover:text-blue-300 transition-colors'>
                <MdOutlineReplay10></MdOutlineReplay10>
                <p>Resend It</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail