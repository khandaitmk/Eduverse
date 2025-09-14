import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassToken } from '../../../services/operations/authAPI';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [emailSent,setEmailSent]=useState(false);


    function changeHandler(event){
        setEmail((prev)=>{
            return ({...prev,[event.target.name]:event.target.value});
        });
    };

    function submitHandler(event){
        event.preventDefault();
        if(!emailSent){
            dispatch(resetPassToken(email,setEmailSent,navigate));
        }else{
            dispatch(resetPassToken(email,setEmailSent,navigate));
        }
    }
  return (
    <div className=' w-11/12 mx-auto flex justify-center items-center h-[calc(100vh-4rem)]'>
        <div className=' flex flex-col text-white gap-5 w-[40%] mx-auto'>
            <div className=' flex flex-col gap-2 justify-center items-center'>
                <h1 className=' text-3xl font-inter'>
                    {
                        !emailSent?"Reset Your Password":"Check email"
                    }
                </h1>
                <p className='text-richblack-500 w-[] mx-auto text-center'>
                    {
                        !emailSent?"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`we have sent reset email to ${email.email} `
                    }
                </p>
            </div>
            <div className=' flex flex-col items-center w-[80%] mx-auto'>
                <form action="post" className=' flex flex-col w-full gap-5' onSubmit={submitHandler}>
                    
                    {
                        !emailSent &&(
                        <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className=' text-[17px] mx-5'>Email Address <span className='text-red-600'> *</span></label>
                        <input className='bg-richblack-700 rounded-md p-3 px-5 mx-5' type="email" name="email" id="email" onChange={changeHandler}/>
                        </div>
                        )


                    }
                    <button type="submit" className=' bg-yellow-100 mx-5 rounded-md py-2 text-richblack-900 font-semibold cursor-pointer'>
                        {
                            !emailSent ?"Reset Password":"Resend email"
                        }
                        </button>
                </form>
            </div>
            <Link to={"/login"} className=' flex items-center gap-2 ml-18'>
                <FaArrowLeftLong></FaArrowLeftLong>
                <p>Back to Login</p>
            </Link>
        </div>
    </div>
  )
}

export default ForgotPassword