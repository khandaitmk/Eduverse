import React, { use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { changePassword, changeProfileImage, updateProfileData } from '../../../services/operations/profileAPI';
import {useForm} from 'react-hook-form';
import CTAButton from '../Homepage/CTAButton';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteAccount } from '../../../services/operations/profileAPI';


function Settings() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>(state.profile));

    const [showPassword1,setShowPassword1]=useState(false);
    const [showPassword2,setShowPassword2]=useState(false);
    const [profilePicture,setProfilePicture]=useState(user.image);
    const [selectedFile,setSelectedFile]=useState(null);
    const {token} =useSelector((state) => (state.auth));
    const {register,handleSubmit,formState:{errors},reset }=useForm();
    function handleFileChange(event){
        const file = event.target.files[0];
        console.log(event.target.files[0]);
        if(file){
            setSelectedFile(file);
        }
        setProfilePicture(URL.createObjectURL(file));
    };

    const handleUpload= (event)=>{
        event.preventDefault();
        // console.log(event.target[0].files[0]);
        // console.log(token);
        dispatch(changeProfileImage({image:selectedFile,token}));
    };
    
    const [passData,setPassData]=useState({currentPassword:"",
        newPassword:""
    });

    function changePassHandler(event){
        setPassData((prev)=>{
            return ({...prev,[event.target.name]:event.target.value});
        })
    };

    function changePassSubmitHandler(event){
        event.preventDefault();
        console.log(passData);
        dispatch(changePassword(passData,token));
        setPassData({currentPassword:"",
        newPassword:""
    });
    }
    function submithandler(data){
        console.log(data);
        dispatch(updateProfileData(data,token,navigate));
    };
    
    function deleteHandler(event){
        dispatch(deleteAccount(token,navigate));
    }
  return (
    <div className='text-white w-[80%] mx-auto'>
        <div className=' flex flex-col p-10 gap-10'>
            <h1 className=' text-3xl font-semibold'>Edit Profile</h1>
            <div className=' flex flex-col gap-10'>
                {/* change profile section */}
                <div className=' flex items-center bg-richblack-800 rounded-md p-8 gap-5'>
                    <div>
                        <img className='rounded-full' width={"80px"} src={user.image} alt="profile image of the user" />
                    </div>
                    <div className=' flex flex-col gap-3'>
                        <p>Change Profile Picture</p>
                        <div className=' flex gap-5'>
                            <label className=' cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50' htmlFor="photo">Select
                                <input onChange={handleFileChange} className='hidden' accept='image/png image/gif , image/jpeg' type="file" name="photo" id="photo" placeholder='select'/>
                            </label>
                            
                            <button onClick={handleUpload} className=' flex items-center bg-yellow-200 rounded-md py-2 px-4 text-richblack-900 font-semibold gap-2 cursor-pointer'><p>upload</p> <FiUpload></FiUpload> </button>
                        </div>
                    </div>
                </div>
                {/* profile information section */}
                <div className=' bg-richblack-800 rounded-md p-8 flex flex-col gap-5'>
                <h1 className=' text-lg font-semibold'>Profile Information</h1>
                <div className=' flex flex-col gap-3'>
                    <div className=' text-sm flex justify-between w-full gap-5'>
                        <label className=' flex gap-2 flex-col w-full' htmlFor="firstName"><p>First Name</p>
                            <input className='bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type="text" name="firstName" id="firstName" defaultValue={user?.firstName || null} {...register("firstName",{required:"First Name is required"})} />
                        </label>

                        <label className=' flex gap-2 flex-col w-full' htmlFor="lastName"><p>Last Name</p>
                            <input className='bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type="text" name="lastName" id="lastName" defaultValue={user?.lastName || null} {...register("lastName",{required:"LAst Name is required"})}/>
                        </label>
                    </div>

                    <div className=' text-sm flex justify-between items-center w-full gap-5'>
                        <label className=' flex gap-2 flex-col w-full' htmlFor="dob"><p>Date Of Birth</p>
                            <input className='bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type='date' name="dob" id="dob" defaultValue={user?.additionalDetails.dateOfBirth || null} {...register("dateOfBirth",{required:"Date of Birth is required"})}/>
                        </label>
                        
                        
                        <label className=' flex gap-2 flex-col w-full' htmlFor="gender"><p>Gender</p>
                            <select className='bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' name="gender" id="gender" {...register("gender",{required:"please enter your gender"})}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        
                    </div>

                    <div className=' text-sm flex justify-between w-full gap-5'>
                        <label className=' flex gap-2 flex-col w-full' htmlFor="contactNumber"><p>Contact Number</p>
                            <input className='bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type="text" name="contactNumber" id="contactNumber" defaultValue={user?.additionalDetails.contact || null} {...register("contact",{required:"Enter your contact"})}/>
                        </label>

                        <label className=' flex gap-2 flex-col w-full' htmlFor="about"><p>About</p>
                            <input className='bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type="text" name="about" id="about" defaultValue={user?.additionalDetails?.about || null} {...register("about",{required:"please fill about section"})} />
                        </label>
                    </div>
                </div>
            </div>

            {/* save buttons section for the profile detailsss section */}
            <div className=' flex gap-5 justify-end'>
                    <button onClick={()=>{navigate("/dashboard/my-profile")}}  className="text-center font-inter text-[15px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 shadow-[1.5px_1.5px_0px_1px] shadow-richblack-700 bg-richblack-800 cursor-pointer">
                        Cancel
                    </button>
                    <button onClick={handleSubmit(submithandler)}  className="text-center font-inter text-[15px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 shadow-[1.5px_1.5px_0px_1px] shadow-richblack-700 bg-yellow-200 text-richblack-900 cursor-pointer">
                        Save
                    </button>
            </div>

            {/* change password section */}
            <div className='text-white bg-richblack-800 rounded-md p-8 text-sm flex flex-col gap-5'>
                <h1 className='text-lg font-semibold'>Password</h1>
                <div className=' flex gap-5'>
                    <label className='w-[50%] relative' htmlFor="newPassword"> <p>Current Password</p>
                        <input className='w-full bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type={showPassword1?"text":"password"} name="currentPassword" id="currentPassword" placeholder=' Enter Current Password' 
                        value={passData.currentPassword} onChange={changePassHandler} />
                        <div className=' absolute right-2 bottom-4 cursor-pointer ' onClick={()=>{setShowPassword1(!showPassword1)}}>
                            {
                                showPassword1?<FaEye ></FaEye>:<FaEyeSlash></FaEyeSlash>
                            }
                        </div>
                    </label>
                    <label className='w-[50%] relative' htmlFor="newPassword"> <p>New Password</p>
                        <input className='w-full bg-richblack-700 rounded-md p-2 py-3 text-white border-b-2 border-richblack-600' type={showPassword2?"text":"password"} name="newPassword" id="newPassword" placeholder='Enter New Password' value={passData.newPassword} onChange={changePassHandler} />
                        <div className=' absolute right-2 bottom-4 cursor-pointer ' onClick={()=>{setShowPassword2(!showPassword2)}}>
                            {
                                showPassword2?<FaEye ></FaEye>:<FaEyeSlash></FaEyeSlash>
                            }
                        </div>
                    </label>
                </div>
            </div>
            
            {/* buttons for the change passwords */}
            <div className=' flex gap-5 justify-end'>
                    <button onClick={()=>{navigate("/dashboard/my-profile")}}  className="text-center font-inter text-[15px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 shadow-[1.5px_1.5px_0px_1px] shadow-richblack-700 bg-richblack-800 cursor-pointer">
                        Cancel
                    </button>
                    <button onClick={changePassSubmitHandler}  className="text-center font-inter text-[15px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 shadow-[1.5px_1.5px_0px_1px] shadow-richblack-700 bg-yellow-200 text-richblack-900 cursor-pointer">
                        update
                    </button>
            </div> 
            
            {/* delete Account section */}
            <div className=' flex bg-pink-900 p-8 rounded-md  items-start gap-5'>
                <div className=' bg-pink-700 rounded-full p-5'><FaRegTrashCan></FaRegTrashCan> </div>
                <div className=' flex flex-col justify-start gap-4'>
                    <h1 className=' text-lg font-semibold font-inter'>Delete Account</h1>
                    <p className=' flex flex-col'>
                        <span>Would you like to delete account?</span>
                        <span className='w-[60%]'>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</span>

                    </p>
                    <div className=' text-pink-600 font-semibold italic'>
                        <button className=' cursor-pointer' onClick={deleteHandler}>I want to delete my account</button>
                    </div>
                </div>
            </div>


            </div>
            
            
        </div>
    </div>
  )
}

export default Settings;