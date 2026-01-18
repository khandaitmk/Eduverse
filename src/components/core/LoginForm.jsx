import React, { useState } from 'react'
import HighlightText from './Homepage/HighlightText';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { setLoading } from '../../slices/authSlice';
const LoginForm = (props) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loading=useSelector(state =>state.auth.loading);
    const [form,setForm]=useState({email:"",password:""});
    const [showpass,setShowPass]=useState(false);

    function changeHandler(event){
        setForm((prev)=>{
          return({...prev,[event.target.name]:event.target.value});
        })
    };
    const {email,password}=form;
    function submitHandler(event){
      event.preventDefault();
      console.log(form);
      dispatch(logIn(email,password,navigate));
      props.setIsLogedIn(true);
    };

    
  return (
    <div>
        <form action="post" className=' flex flex-col gap-3 md:gap-4' onSubmit={submitHandler}>
                   <div className=' flex flex-col gap-1 md:gap-2'>
                    <label htmlFor="email" className="text-sm md:text-base">Email Address <span className=' text-red-600'>*</span></label>
                    <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type="email" name="email" id="email" placeholder='Enter email address' required value={form.email} onChange={changeHandler} />
                   </div>

                   <div className=' flex flex-col relative gap-1 md:gap-2'>
                      <label htmlFor="password" className="text-sm md:text-base">Password <span className=' text-red-600'>*</span></label>
                      <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type={showpass?"text":"password"} name="password" id="password" placeholder='Enter Password' required value={form.password} onChange={changeHandler}/>
                      <div className='absolute right-3 md:right-4 bottom-8 md:bottom-10 cursor-pointer text-sm md:text-base' onClick={()=>{setShowPass(!showpass)}}>
                       {
                        showpass?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                       } 
                      </div>
                      <div className='text-right mt-1'>
                        <Link to={"/forgot-password"} className='text-xs md:text-[12px] text-right text-blue-300 cursor-pointer hover:underline'>Forgot Password</Link>
                      </div>
                   </div>


                   <div>
                    <button  className=' bg-yellow-100 w-full rounded-md p-2 md:p-2.5 text-richblack-900 text-base md:text-lg cursor-pointer font-semibold hover:bg-yellow-200 transition-colors' type="submit">Log In</button>
                   </div>
                </form>
    </div>
  )
}

export default LoginForm;