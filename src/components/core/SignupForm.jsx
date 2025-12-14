import React from 'react'
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../../slices/authSlice';
import { sentOtp } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [role,setRole]=useState("Student");
    const [formData,setFormData]=useState({firstName:"",lastName:"",email:"",password:"",cPassword:""});
    const [showpass,setShowPass]=useState(false);
    const [showcpass,setShowcPass]=useState(false);

      function changeHandler(event){
          setFormData((prev)=>{
            return({...prev,[event.target.name]:event.target.value});
          })
      };
      const {email}=formData;
      function submitHandler(event){
        event.preventDefault();
        //navigate to dashboard
        const sData={...formData,accountType:role};
        console.log(sData);
        dispatch(sentOtp(email,navigate));
        dispatch(setSignUpData(sData));
        props.setIsLogedIn(true);
      };
  
      
    return (
      <div className=' flex flex-col gap-7'>
            <div className=' flex w-[50%] bg-richblack-700 px-2 py-1 rounded-full justify-between'>
                <div className={`${(role==="Student")?'bg-richblack-900':'bg-richblack-700'} rounded-full p-2 px-4 cursor-pointer`} onClick={()=>{setRole("Student")}}>Student</div>
                <div className={`${(role==="Instructor")?'bg-richblack-900':'bg-richblack-700'} rounded-full p-2 px-4 cursor-pointer`} onClick={()=>setRole("Instructor")}>Instructor</div>
            </div>
          <form action="post" className=' flex flex-col gap-5' onSubmit={submitHandler}>
                    
                    <div className=' flex gap-5'>
                        <div className=' flex flex-col'>
                            <label htmlFor="text">Enter First Name <span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-3 rounded-md' type="text" name="firstName" id="firstName" placeholder='Enter first name' required value={formData.firstName} onChange={changeHandler} />
                        </div>

                        <div className=' flex flex-col'>
                            <label htmlFor="text">Enter Last Name<span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-3 rounded-md' type="text" name="lastName" id="lastName" placeholder='Enter last name' required value={formData.lastName} onChange={changeHandler} />
                        </div>

                    </div>

                     <div className=' flex flex-col'>
                      <label htmlFor="email">Email Address <span className=' text-red-600'>*</span></label>
                      <input className=' bg-richblack-700 p-3 rounded-md' type="email" name="email" id="email" placeholder='Enter email address' required value={formData.email} onChange={changeHandler} />
                     </div>
  
                     
                    <div className=' flex gap-5'>
                        <div className=' flex flex-col relative'>
                            <label htmlFor="password" >Create Password <span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-3 rounded-md' type={showpass?"text":"password"} name="password" id="password" placeholder='Enter Password' required value={formData.password} onChange={changeHandler}/>
                            <div className='absolute right-4 bottom-4 cursor-pointer  text-richblack-300' onClick={()=>{setShowPass(!showpass)}}>
                            {
                            showpass?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                            } 
                            </div>
                         </div>

                        <div className=' flex flex-col relative'>
                            <label htmlFor="password" >Confirm Password <span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-3 rounded-md' type={showcpass?"text":"password"} name="cPassword" id="cPassword" placeholder='Confirm Password' required value={formData.cPassword} onChange={changeHandler}/>
                            <div className='absolute right-4 bottom-4 cursor-pointer text-richblack-300' onClick={()=>{setShowcPass(!showcpass)}}>
                            {
                            showcpass?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                            } 
                            </div>
                        </div>
                    </div>
  
                     <div>
                      <button  className=' bg-yellow-200 w-full rounded-md p-2 text-richblack-900 text-lg cursor-pointer' type="submit">Sign In</button>
                     </div>
                  </form>
      </div>
    )
  }

export default SignupForm