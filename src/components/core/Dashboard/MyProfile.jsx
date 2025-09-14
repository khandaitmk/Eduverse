import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {FiEdit} from "react-icons/fi"
import { Link } from 'react-router-dom';


function MyProfile() {
    const {user} = useSelector((state)=>(state.profile));
    const navigate=useNavigate();
  return (
    <div className='w-[80%] mx-auto p-10 pb-20'>
       <div className=' flex flex-col w-full gap-10'>
            <h1 className=' text-3xl text-white font-inter font-semibold'> My Profile</h1>

            <section className=' flex flex-col gap-10'>
                <div className='flex bg-richblack-800 rounded-md items-center justify-between text-white p-8 border-1    border-richblack-600'>
                    <div className=' flex items-center gap-5'>
                        <div>
                            <img className=' rounded-full' width={"80px"} src={user.image} alt="profile picture" />
                        </div>
                        <div>
                            <h1 className=' font-semibold text-richblack-50 uppercase'>{user.firstName} {user.lastName}</h1>
                            <p className=' text-sm text-richblack-500'>{user.email}</p>
                        </div>
                    </div>
                    <Link to={"/dashboard/settings"}>
                        <button className=' p-2 flex items-center gap-2 bg-yellow-200 text-richblack-900 font-semibold rounded-md px-4 cursor-pointer'><p>Edit</p><FiEdit></FiEdit> </button>
                    </Link>
                </div>

                <div className='flex bg-richblack-800 rounded-md items-center justify-between text-white p-8 border-1    border-richblack-600'>
                    <div className=' flex flex-col justify-between gap-10'>
                        <h1 className='font-bold text-lg'>About</h1>
                        <p className=' text-richblack-500'>{ (user?.additionalDetails?.about) ?? "Write Something About Yourself"}</p>
                    </div>
                    <Link to={"/dashboard/settings"}>
                        <button className=' p-2 flex items-center gap-2 bg-yellow-200 text-richblack-900 font-semibold rounded-md px-4 cursor-pointer'><p>Edit</p><FiEdit></FiEdit> </button>
                    </Link>
                </div>

                <div className='flex bg-richblack-800 rounded-md items-center justify-between text-white p-8 border-1    border-richblack-600'>
                    
                    <div className='w-full flex flex-col gap-5'>
                        <h1>Personal Details</h1>
                        <div className=' w-[100%] flex flex-col gap-3'>
                            <div className=' flex  '>
                                <div className=' flex flex-col gap-1 w-[50%]'>
                                    <p className='text-richblack-500 text-sm'>First Name</p>
                                    <p className=' text-white font-semibold'>{user.firstName}</p>
                                </div>

                                <div className=' flex flex-col gap-1 w-[50%]'>
                                    <p className='text-richblack-500 text-sm'>Last Name</p>
                                    <p className=' text-white font-semibold'>{user.lastName}</p>
                                </div>
                            </div>
                            
                            <div className=' flex justify-between'>
                                <div className=' flex flex-col gap-1 w-[50%]'>
                                    <p className='text-richblack-500 text-sm'>Email</p>
                                    <p className=' text-white font-semibold'>{user.email}</p>
                                </div>

                                <div className=' flex flex-col gap-1 w-[50%]'>
                                    <p className='text-richblack-500 text-sm'>Phone Number</p>
                                    <p className=' text-white font-semibold'>{user?.additionalDetails?.contact ?? "Add contact Number"}</p>
                                </div>
                            </div>

                            <div className=' flex justify-between'>
                                <div className=' flex flex-col gap-1 w-[50%]'>
                                    <p className='text-richblack-500 text-sm'>Gender</p>
                                    <p className=' text-white font-semibold'>{user?.additionalDetails?.gender}</p>
                                </div>

                                <div className=' flex flex-col gap-1 w-[50%]'>
                                    <p className='text-richblack-500 text-sm'>Date Of Birth</p>
                                    <p className=' text-white font-semibold'>{(user?.additionalDetails?.dateOfBirth) ?? "Add date of birth"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to={"/dashboard/settings"}>
                        <button className=' p-2 flex items-center gap-2 bg-yellow-200 text-richblack-900 font-semibold rounded-md px-4 cursor-pointer'><p>Edit</p><FiEdit></FiEdit> </button>
                    </Link>
                </div>
            </section>
        </div> 
    </div>
  )
}

export default MyProfile