import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Loader from './Loader'
import countryCode from '../../data/countrycodes.json'
import { useEffect } from 'react';
import { contactUS } from '../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
function ContactForm() {
    const [loading,setLoading]=useState(false);
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}}=useForm();
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                countryCode:"",
                contact:""
            })
        }
    },[reset,isSubmitSuccessful]);

    const onSubmit = async (data)=>{
        
        await contactUS({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNo: `${data.countryCode}${data.contact}`,
            message: data.message,
        },token);
    }
  return (
   loading?(<Loader></Loader>):(
    <div className=' text-white'>
        <form action="get" onSubmit={handleSubmit(onSubmit)} className=' felx flex-col'>
            <div className=' flex flex-col gap-5'>
                <div className=' flex justify-between gap-10'>
                <div className=' flex flex-col w-full gap-1'>
                    <label htmlFor="firstName">First Name</label>
                    <input className=' bg-richblack-700 rounded-md p-3 border-b-2 border-richblack-300' type="text" name="firstName" id="firstName" placeholder='Enter first name' {...register("firstName",{required:true , message:"first name is required"})} />
                    {
                        errors.firstName && ("Enter First Name")
                    }
                </div>

                <div className=' flex flex-col w-full gap-1'>
                    <label htmlFor="lastName">Last Name</label>
                    <input className=' bg-richblack-700 rounded-md p-3 border-b-2 border-richblack-300' type="text" name="lastName" id="lastName" placeholder='Enter last name' {...register("lastName",{required:true , message:"last name is required"})} />
                    {
                        errors.lastName && ("Enter Last Name")
                    }
                </div>
            </div>

                <div className=' flex flex-col gap-1'>
                    <label htmlFor="email">Email Address</label>
                    <input className=' bg-richblack-700 rounded-md p-3 border-b-2 border-richblack-300' type="email" name="email" id="email" placeholder='Enter your Email Address' {...register("email",{required:true , message:"Email is Required"})} />
                    {
                        errors.email && ("Enter Email Address")
                    }
                </div>

                <div>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="">Phone Number</label>
                        <div className=' flex justify-between'>
                            <select className=' w-[30%] bg-richblack-700 rounded-md p-3.5 border-b-2 border-richblack-300' name="countryCode" id="countryCode" {...register("countryCode",{required:true})}>
                            {
                                countryCode.map((item,index) => {
                                    return (
                                        <option key={index} value={item.code} className=''>
                                           {item.country} : {item.code}
                                        </option>
                                    );
                                })
                            }
                            </select>   
                            <input className='w-[65%] bg-richblack-700 rounded-md p-3 border-b-2 border-richblack-300' type="tel" name="contact" id="contact" placeholder='Enter your contact number' {...register("contact",{required:true,maxLength:{value:10,message:"Please Enter Valid Contact Number"}})} />
                        </div>
                    </div>
                    
                </div>

                <div className=' flex flex-col gap-1'>
                    <label htmlFor="">Message</label>
                    <textarea className=' bg-richblack-700 rounded-md p-3 border-b-2 border-richblack-300' name="message" id="message" rows="5" placeholder='Enter your message here' {...register("message",{required:true,message:"enter the message here"})}></textarea>
                    {
                        errors.message &&("please enter message")
                    }
                </div>
                <div>
                    <button className='p-3 bg-yellow-50 w-full rounded-md text-richblack-900 font-semibold cursor-pointer' type="submit">Send Message</button>
                </div>
            </div>

        </form>
    </div>
   )
  )
};

export default ContactForm;