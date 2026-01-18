import React, { useEffect } from 'react'
import Footer from '../components/core/Homepage/Footer'
import { getAverageRating } from '../services/operations/courseDetailsAPI';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getCourseDetails } from '../services/operations/courseDetailsAPI';
import RatingStars from '../components/common/RatingStars';
import { FaCaretRight } from "react-icons/fa";
import { setLoading } from '../slices/authSlice';
import { addToCart } from '../slices/cartSlice';
import { payment } from '../services/operations/Payment';

function CourseDetailsPage() {
    const [avgRating,setAvgRating]=useState(0);
    const [courseDetails,setCourseDetails]=useState(null);
    const {courseId}=useParams();
    const {user}=useSelector((state)=> state.profile);
    const [visible,setVisible]=useState(false);
    const {loading}=useSelector((state)=>(state.auth));
    const [enrolled,setEnrolled]=useState(false);
    const {token} = useSelector((state)=>(state.auth));
    const {cart} =useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    useEffect(()=>{
        getRating();
        getCDetails();
    },[courseId]);

    useEffect(()=>{
        if(courseDetails){
            const enrolled = courseDetails?.studentsEnrolled.find((student) => student === user?._id);
            if(enrolled){
                setEnrolled(true);
            }
        }
    },[courseDetails,user?._id]);

    console.log("Enrolled :",courseDetails?.studentsEnrolled.find((student) => student === user?._id));
    const getRating = async()=>{
        dispatch(setLoading(true));
        const result = await getAverageRating(courseId);
        // console.log("Average Rating :",result);
        setAvgRating(result);
        dispatch(setLoading(false))

    };
    const getCDetails = async()=>{
        dispatch(setLoading(true));
        const result = await getCourseDetails(courseId,token,navigate,dispatch);
        setCourseDetails(result.courseDetails);
        dispatch(setLoading(false));
    };
    const handleAddToCart = () =>{
        if(!token){
            navigate('/login');
            return;
        }   
        dispatch(addToCart(courseDetails));

    };
    async function handleBuyCourses(){
            const courses=[courseId];
            if(token){
                console.log(courses);
                console.log("user email :",user?.email);
                const result = await payment({courses,userEmail:user?.email,userId:user?._id},token,dispatch);
            }
            else{
                navigate("/login");
            }
        }
  return (
    <div className=''>
        {/* section -1 */}
        <div className='bg-richblack-800 relative'>
            <div className='w-full lg:w-[68%] p-6 md:p-12 lg:p-20 text-white text-base md:text-lg lg:text-xl flex flex-col gap-3 md:gap-4 '>
                <h1 className='text-2xl md:text-3xl lg:text-5xl text-white font-bold'>{courseDetails?.courseName}</h1>
                <p className='text-richblack-500 text-base md:text-lg lg:text-xl'>{courseDetails?.courseDescription}</p>
                <div className='flex flex-wrap items-center text-base md:text-lg lg:text-xl gap-3 md:gap-5 text-white'>
                    <div className='flex items-center gap-2 md:gap-3'>
                        <p className=' transform translate-y-1 text-yellow-100'>{avgRating}</p>
                        <RatingStars rating={avgRating}></RatingStars>
                    </div>
                    <p className='transform translate-y-1 text-sm md:text-base lg:text-xl'>({courseDetails?.ratingAndReviwes.length} Reviwes)</p>

                    
                </div>
                <p className="text-sm md:text-base lg:text-lg">{courseDetails?.studentsEnrolled.length} students Enrolled</p>
                <p className="text-sm md:text-base lg:text-lg">Created By : <span className=' italic '>{courseDetails?.instructor.firstName} {courseDetails?.instructor.lastName}</span></p>

            </div>
            {/* side Card */}
            <div className=' transform duration-200 hover:scale-105 static lg:absolute -bottom-75 lg:right-40 bg-richblack-900 border border-richblack-300 w-full lg:w-[400px] p-4 md:p-6 lg:p-7 flex flex-col gap-4 md:gap-5 lg:gap-6 rounded-md mx-auto lg:mx-0 mt-4 lg:mt-0'>
                
                <div className=' '><img className='rounded-md w-full h-auto' src={courseDetails?.thumbnail} alt="" /></div>
                <p className=' text-2xl md:text-3xl text-white font-semibold'>Rs. {courseDetails?.price}</p>
                <div className=' flex flex-col gap-3 w-full'>
                    {
                        ("Instructor"!==user?.accountType) && (<div className=' flex flex-col gap-2'>
                            {
                                !enrolled ? (<button onClick={handleBuyCourses} className='p-2 px-4 bg-yellow-50 text-richblack-900 cursor-pointer font-semibold rounded-md text-sm md:text-base hover:bg-yellow-100 transition-colors'>Buy Now</button>
                                ) :(<button onClick={()=>{navigate("/dashboard/enrolled-courses")}} className='p-2 px-4 bg-yellow-50 text-richblack-900 cursor-pointer font-semibold rounded-md text-sm md:text-base hover:bg-yellow-100 transition-colors'>Go to Course</button>)
                            }
                            {
                                enrolled ?(<div></div>):(
                                    cart?.find((item)=> item?._id === courseDetails?._id)?
                                    (<button onClick={()=>navigate("/dashboard/cart")} className='p-2 px-4 bg-richblack-800 font-semibold cursor-pointer text-white rounded-md text-sm md:text-base hover:bg-richblack-700 transition-colors'>Go to Cart</button>):
                                    (<button onClick={handleAddToCart} className='p-2 px-4 bg-richblack-800 font-semibold cursor-pointer text-white rounded-md text-sm md:text-base hover:bg-richblack-700 transition-colors'>Add to Cart</button>)
                                )
                            }
                        </div>)
                    }
                </div>
                <p className='text-xs md:text-sm text-richblack-100 text-center'>30-Day Money-Back Guarantee</p>
                <p className=' text-lg md:text-xl font-semibold text-richblack-5'>This Course Includes :</p>
                <ul className=' text-xs md:text-sm text-green-400'>
                    {
                        courseDetails?.tag.map((tag,index)=>(
                            <div key={index} className=' flex items-center'>
                                <FaCaretRight></FaCaretRight>
                                <li>{tag}</li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
        {/* section-2 */}
        <div className='bg-richblack-900 w-full lg:w-[60%] p-4 md:p-6 lg:p-10 flex flex-col gap-5 md:gap-6 lg:gap-7 ml-0 lg:ml-10 mt-6 md:mt-8 lg:mt-10'>
            <div className=' border border-richblack-300 p-4 md:p-6 lg:p-10 flex flex-col gap-4 md:gap-5'>
                <p className='text-white text-xl md:text-2xl lg:text-3xl font-semibold'>What you'll learn</p>
                <p className=' text-richblack-100 ml-0 md:ml-4 text-sm md:text-base'>{courseDetails?.whatYouWillLearn}</p>
            </div>
            <div>
                <p className=' text-xl md:text-2xl lg:text-3xl text-white font-semibold'>Course Content</p>
                <div>
            {courseDetails?.courseContent.map((content, index1) => (
                <div key={index1} className="w-full lg:w-[70%]">
                {/* Section Header */}
                <div
                    onClick={() => setVisible(visible === index1 ? null : index1)}
                    className="text-white transition-all duration-500 bg-richblack-700 h-10 flex items-center pl-3 md:pl-5 text-base md:text-lg lg:text-xl font-semibold cursor-pointer"
                >
                    {index1 + 1}. {content.sectionName}
                </div>

                {/* Subsections */}
                <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        visible === index1 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        {content?.subSection.map((sub, index2) => (
                        <div
                            key={index2}
                            className="text-white bg-richblack-900 border border-richblack-500 px-3 md:px-5 py-2 text-sm md:text-base lg:text-lg font-semibold"
                        >
                            <p>
                            {index1 + 1}.{index2 + 1} {sub.title}
                            </p>
                            <p className="text-xs md:text-sm text-richblack-300">
                            {}
                            </p>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>

            </div>
            <div className=' flex flex-col gap-2 md:gap-3 mt-6 md:mt-8 lg:mt-10 text-white'>
                <p className=' text-xl md:text-2xl lg:text-3xl font-semibold'>Author</p>
                <div className='flex gap-2 items-center'>
                    <div><img width={25} className=' rounded-full' src={courseDetails?.instructor?.image} alt="" /></div>
                    <span className="text-sm md:text-base">{courseDetails?.instructor.firstName} {courseDetails?.instructor.lastName}</span>
                </div>
            </div>
        </div>
        <div>
        <div className=' h-[1px] w-full bg-richblack-600'></div>
        <Footer></Footer>
        </div>
    </div>
  )
}

export default CourseDetailsPage;