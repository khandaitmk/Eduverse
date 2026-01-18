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
    <div className=' text-white border-1 border-gray-500 rounded-md p-5'>
        <form action="get" onSubmit={handleSubmit(onSubmit)} className=' flex flex-col'>
            <div className=' flex flex-col gap-4 md:gap-5'>
                <div className=' flex flex-col sm:flex-row justify-between gap-4 md:gap-6 lg:gap-10'>
                <div className=' flex flex-col w-full gap-1 md:gap-2'>
                    <label htmlFor="firstName" className="text-sm md:text-base">First Name</label>
                    <input className=' bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-300 text-sm md:text-base' type="text" name="firstName" id="firstName" placeholder='Enter first name' {...register("firstName",{required:true , message:"first name is required"})} />
                    {
                        errors.firstName && <span className="text-red-500 text-xs md:text-sm">Enter First Name</span>
                    }
                </div>

                <div className=' flex flex-col w-full gap-1 md:gap-2'>
                    <label htmlFor="lastName" className="text-sm md:text-base">Last Name</label>
                    <input className=' bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-300 text-sm md:text-base' type="text" name="lastName" id="lastName" placeholder='Enter last name' {...register("lastName",{required:true , message:"last name is required"})} />
                    {
                        errors.lastName && <span className="text-red-500 text-xs md:text-sm">Enter Last Name</span>
                    }
                </div>
            </div>

                <div className=' flex flex-col gap-1 md:gap-2'>
                    <label htmlFor="email" className="text-sm md:text-base">Email Address</label>
                    <input className=' bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-300 text-sm md:text-base' type="email" name="email" id="email" placeholder='Enter your Email Address' {...register("email",{required:true , message:"Email is Required"})} />
                    {
                        errors.email && <span className="text-red-500 text-xs md:text-sm">Enter Email Address</span>
                    }
                </div>

                <div>
                    <div className=' flex flex-col gap-1 md:gap-2'>
                        <label htmlFor="phone" className="text-sm md:text-base">Phone Number</label>
                        <div className=' flex justify-between gap-2 md:gap-3'>
                            <select className=' w-[35%] md:w-[30%] bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-300 text-xs md:text-sm' name="countryCode" id="countryCode" {...register("countryCode",{required:true})}>
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
                            <input className='w-[62%] md:w-[65%] bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-300 text-sm md:text-base' type="tel" name="contact" id="contact" placeholder='Enter your contact number' {...register("contact",{required:true,maxLength:{value:10,message:"Please Enter Valid Contact Number"}})} />
                        </div>
                    </div>
                    
                </div>

                <div className=' flex flex-col gap-1 md:gap-2'>
                    <label htmlFor="message" className="text-sm md:text-base">Message</label>
                    <textarea className=' bg-richblack-700 rounded-md p-2 md:p-3 border-b-2 border-richblack-300 text-sm md:text-base' name="message" id="message" rows={5} placeholder='Enter your message here' {...register("message",{required:true,message:"enter the message here"})}></textarea>
                    {
                        errors.message && <span className="text-red-500 text-xs md:text-sm">please enter message</span>
                    }
                </div>
                <div>
                    <button className='p-2.5 md:p-3 bg-yellow-50 w-full rounded-md text-richblack-900 font-semibold cursor-pointer text-sm md:text-base hover:bg-yellow-100 transition-colors' type="submit">Send Message</button>
                </div>
            </div>

        </form>
    </div>
   )
  )
};

export default ContactForm;