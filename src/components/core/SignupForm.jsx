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
      <div className=' flex flex-col gap-5 md:gap-7'>
            <div className=' flex w-full sm:w-[70%] md:w-[60%] lg:w-[50%] bg-richblack-700 px-2 py-1 rounded-full justify-between'>
                <div className={`${(role==="Student")?'bg-richblack-900':'bg-richblack-700'} rounded-full p-1.5 md:p-2 px-3 md:px-4 cursor-pointer text-sm md:text-base transition-colors`} onClick={()=>{setRole("Student")}}>Student</div>
                <div className={`${(role==="Instructor")?'bg-richblack-900':'bg-richblack-700'} rounded-full p-1.5 md:p-2 px-3 md:px-4 cursor-pointer text-sm md:text-base transition-colors`} onClick={()=>setRole("Instructor")}>Instructor</div>
            </div>
          <form action="post" className=' flex flex-col gap-4 md:gap-5' onSubmit={submitHandler}>
                    
                    <div className=' flex flex-col sm:flex-row gap-3 md:gap-5'>
                        <div className=' flex flex-col gap-1 md:gap-2 flex-1'>
                            <label htmlFor="text" className="text-sm md:text-base">Enter First Name <span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type="text" name="firstName" id="firstName" placeholder='Enter first name' required value={formData.firstName} onChange={changeHandler} />
                        </div>

                        <div className=' flex flex-col gap-1 md:gap-2 flex-1'>
                            <label htmlFor="text" className="text-sm md:text-base">Enter Last Name<span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type="text" name="lastName" id="lastName" placeholder='Enter last name' required value={formData.lastName} onChange={changeHandler} />
                        </div>

                    </div>

                     <div className=' flex flex-col gap-1 md:gap-2'>
                      <label htmlFor="email" className="text-sm md:text-base">Email Address <span className=' text-red-600'>*</span></label>
                      <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type="email" name="email" id="email" placeholder='Enter email address' required value={formData.email} onChange={changeHandler} />
                     </div>
  
                     
                    <div className=' flex flex-col sm:flex-row gap-3 md:gap-5'>
                        <div className=' flex flex-col relative gap-1 md:gap-2 flex-1'>
                            <label htmlFor="password" className="text-sm md:text-base">Create Password <span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type={showpass?"text":"password"} name="password" id="password" placeholder='Enter Password' required value={formData.password} onChange={changeHandler}/>
                            <div className='absolute right-3 md:right-4 bottom-3 md:bottom-4 cursor-pointer text-sm md:text-base text-richblack-300' onClick={()=>{setShowPass(!showpass)}}>
                            {
                            showpass?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                            } 
                            </div>
                         </div>

                        <div className=' flex flex-col relative gap-1 md:gap-2 flex-1'>
                            <label htmlFor="password" className="text-sm md:text-base">Confirm Password <span className=' text-red-600'>*</span></label>
                            <input className=' bg-richblack-700 p-2 md:p-3 rounded-md text-sm md:text-base' type={showcpass?"text":"password"} name="cPassword" id="cPassword" placeholder='Confirm Password' required value={formData.cPassword} onChange={changeHandler}/>
                            <div className='absolute right-3 md:right-4 bottom-3 md:bottom-4 cursor-pointer text-sm md:text-base text-richblack-300' onClick={()=>{setShowcPass(!showcpass)}}>
                            {
                            showcpass?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>
                            } 
                            </div>
                        </div>
                    </div>
  
                     <div>
                      <button  className=' bg-yellow-200 w-full rounded-md p-2 md:p-2.5 text-richblack-900 text-base md:text-lg cursor-pointer font-semibold hover:bg-yellow-300 transition-colors' type="submit">Sign Up</button>
                     </div>
                  </form>
      </div>
    )
  }

export default SignupForm