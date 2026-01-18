import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {FiEdit} from "react-icons/fi"
import { Link } from 'react-router-dom';


function MyProfile() {
    const {user} = useSelector((state)=>(state.profile));
    const navigate=useNavigate();
  return (
    <div className='w-full lg:w-[80%] mx-auto p-4 md:p-6 lg:p-10 pb-10 md:pb-16 lg:pb-20'>
       <div className=' flex flex-col w-full gap-6 md:gap-8 lg:gap-10'>
            <h1 className=' text-2xl md:text-3xl text-white font-inter font-semibold'> My Profile</h1>

            <section className=' flex flex-col gap-6 md:gap-8 lg:gap-10'>
                <div className='flex flex-col sm:flex-row bg-richblack-800 rounded-md items-center justify-between text-white p-4 md:p-6 lg:p-8 border-1 border-richblack-600 gap-4'>
                    <div className=' flex items-center gap-3 md:gap-5'>
                        <div>
                            <img className=' rounded-full w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]' src={user.image} alt="profile picture" />
                        </div>
                        <div>
                            <h1 className=' font-semibold text-sm md:text-base lg:text-lg text-richblack-50 uppercase'>{user.firstName} {user.lastName}</h1>
                            <p className=' text-xs md:text-sm text-richblack-500'>{user.email}</p>
                        </div>
                    </div>
                    <Link to={"/dashboard/settings"}>
                        <button className=' p-2 flex items-center gap-2 bg-yellow-200 text-richblack-900 font-semibold rounded-md px-3 md:px-4 cursor-pointer text-sm md:text-base hover:bg-yellow-300 transition-colors'><p>Edit</p><FiEdit></FiEdit> </button>
                    </Link>
                </div>

                <div className='flex flex-col sm:flex-row bg-richblack-800 rounded-md items-start sm:items-center justify-between text-white p-4 md:p-6 lg:p-8 border-1 border-richblack-600 gap-4'>
                    <div className=' flex flex-col justify-between gap-4 md:gap-6 lg:gap-10 flex-1'>
                        <h1 className='font-bold text-base md:text-lg'>About</h1>
                        <p className=' text-sm md:text-base text-richblack-500'>{ (user?.additionalDetails?.about) ?? "Write Something About Yourself"}</p>
                    </div>
                    <Link to={"/dashboard/settings"}>
                        <button className=' p-2 flex items-center gap-2 bg-yellow-200 text-richblack-900 font-semibold rounded-md px-3 md:px-4 cursor-pointer text-sm md:text-base hover:bg-yellow-300 transition-colors'><p>Edit</p><FiEdit></FiEdit> </button>
                    </Link>
                </div>

                <div className='flex flex-col lg:flex-row bg-richblack-800 rounded-md items-start lg:items-center justify-between text-white p-4 md:p-6 lg:p-8 border-1 border-richblack-600 gap-4'>
                    
                    <div className='w-full flex flex-col gap-4 md:gap-5'>
                        <h1 className="text-base md:text-lg font-semibold">Personal Details</h1>
                        <div className=' w-[100%] flex flex-col gap-3 md:gap-4'>
                            <div className=' flex flex-col sm:flex-row gap-3 sm:gap-0'>
                                <div className=' flex flex-col gap-1 w-full sm:w-[50%]'>
                                    <p className='text-richblack-500 text-xs md:text-sm'>First Name</p>
                                    <p className=' text-white font-semibold text-sm md:text-base'>{user.firstName}</p>
                                </div>

                                <div className=' flex flex-col gap-1 w-full sm:w-[50%]'>
                                    <p className='text-richblack-500 text-xs md:text-sm'>Last Name</p>
                                    <p className=' text-white font-semibold text-sm md:text-base'>{user.lastName}</p>
                                </div>
                            </div>
                            
                            <div className=' flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
                                <div className=' flex flex-col gap-1 w-full sm:w-[50%]'>
                                    <p className='text-richblack-500 text-xs md:text-sm'>Email</p>
                                    <p className=' text-white font-semibold text-sm md:text-base break-words'>{user.email}</p>
                                </div>

                                <div className=' flex flex-col gap-1 w-full sm:w-[50%]'>
                                    <p className='text-richblack-500 text-xs md:text-sm'>Phone Number</p>
                                    <p className=' text-white font-semibold text-sm md:text-base'>{user?.additionalDetails?.contact ?? "Add contact Number"}</p>
                                </div>
                            </div>

                            <div className=' flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
                                <div className=' flex flex-col gap-1 w-full sm:w-[50%]'>
                                    <p className='text-richblack-500 text-xs md:text-sm'>Gender</p>
                                    <p className=' text-white font-semibold text-sm md:text-base'>{user?.additionalDetails?.gender}</p>
                                </div>

                                <div className=' flex flex-col gap-1 w-full sm:w-[50%]'>
                                    <p className='text-richblack-500 text-xs md:text-sm'>Date Of Birth</p>
                                    <p className=' text-white font-semibold text-sm md:text-base'>{(user?.additionalDetails?.dateOfBirth) ?? "Add date of birth"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to={"/dashboard/settings"} className="lg:ml-4">
                        <button className=' p-2 flex items-center gap-2 bg-yellow-200 text-richblack-900 font-semibold rounded-md px-3 md:px-4 cursor-pointer text-sm md:text-base hover:bg-yellow-300 transition-colors'><p>Edit</p><FiEdit></FiEdit> </button>
                    </Link>
                </div>
            </section>
        </div> 
    </div>
  )
}

export default MyProfile