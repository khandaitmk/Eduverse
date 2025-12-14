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
        <form action="post" className=' flex flex-col gap-3' onSubmit={submitHandler}>
                   <div className=' flex flex-col'>
                    <label htmlFor="email">Email Address <span className=' text-red-600'>*</span></label>
                    <input className=' bg-richblack-700 p-3 rounded-md' type="email" name="email" id="email" placeholder='Enter email address' required value={form.email} onChange={changeHandler} />
                   </div>

                   <div className=' flex flex-col relative'>
                      <label htmlFor="password" >Password <span className=' text-red-600'>*</span></label>
                      <input className=' bg-richblack-700 p-3 rounded-md' type={showpass?"text":"password"} name="password" id="password" placeholder='Enter Password' required value={form.password} onChange={changeHandler}/>
                      <div className='absolute right-4 bottom-10 cursor-pointer ' onClick={()=>{setShowPass(!showpass)}}>
                       {
                        showpass?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                       } 
                      </div>
                      <div className='text-right'>
                        <Link to={"/forgot-password"} className='text-[12px] text-right text-blue-300 cursor-pointer'>Forgot Password</Link>
                      </div>
                   </div>


                   <div>
                    <button  className=' bg-yellow-100 w-full rounded-md p-2 text-richblack-900 text-lg cursor-pointer' type="submit">Log In</button>
                   </div>
                </form>
    </div>
  )
}

export default LoginForm;