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
    <div className=' flex justify-center items-center h-[calc(100vh-4rem)]'>
        <div className='w-40% bg-richblack-900 rounded-md border-[1px] border-richblack-700 flex  flex-col gap-8 p-5' >
            <div className=' flex flex-col gap-1'>
                <h1 className=' text-3xl text-white font-inter text-center'>Verify Email</h1>
                <p className=' text-xl w-[85%] mx-auto text-richblack-500 text-center'>A verification code has been sent to you . Enter the code below</p>
            </div>
            <div className=' flex flex-row gap-7 mx-auto'>
                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} inputClassName="bg-richblack-800   rounded-md text-center text-2xl" inputStyles={{
                color: "#FFFFFF", // ✅ force white text
                 width:"50px",
                height:"50px"
                }}
                />

                
            </div>
            <div className=' w-[88%] mx-auto'>
                <button onClick={handleSubmit} className='p-3 bg-yellow-50 w-full rounded-md cursor-pointer font-semibold'>Verify Email</button>
            </div>
            <div className=' text-white flex justify-between mx-5'>
                <Link to={"/signup"} className=' flex gap-3 items-center'>
                <FaArrowLeftLong></FaArrowLeftLong>
                <p>Back To Signup</p>
                </Link>
                <Link onClick={resendHandler} className=' flex items-center text-blue-200 gap-2'>
                <MdOutlineReplay10></MdOutlineReplay10>
                <p>Resend It</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail