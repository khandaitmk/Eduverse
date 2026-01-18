import React, { useEffect, useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import HomeCard from './HomeCard';
const CourseFilter = () => {
        const [tag,setTag]=useState("Free");
        const [courses,setCourses]=useState([]);
        useEffect(()=>{
            const filtered= HomePageExplore.filter((obj)=>(obj.tag===tag));
            setCourses(filtered[0].courses);
        },[tag]);

        


  return (
    <div className='w-full flex flex-col items-center h-auto md:h-[400px] mb-20 md:mb-0'>
       <div className=' flex flex-col items-center justify-center gap-4 md:gap-5 mb-10 md:mb-20 px-4'>
            <div className=' items-center flex flex-col gap-2'>
                <h1 className=' text-2xl md:text-3xl lg:text-4xl text-center'>Unlock the <HighlightText text={"Power of Code"}></HighlightText> </h1>
                <p className=' text-center text-richblack-500 text-sm md:text-base'> Learn to Build Anything You Can Imagine</p>
            </div>
            <div className=' flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-10 bg-richblack-800 px-2 md:px-4 rounded-full text-richblack-200 font-bold py-2 text-xs md:text-sm lg:text-base'>
                <div className=' cursor-pointer px-2 md:px-4 py-1 hover:bg-richblack-900 rounded-full ' onClick={()=>{setTag("Free")}}>Free</div>
                <div className=' cursor-pointer px-2 md:px-4 py-1 hover:bg-richblack-900 rounded-full ' onClick={()=>{setTag("New to coding")}}>New to coding</div>
                <div className=' cursor-pointer px-2 md:px-4 py-1 hover:bg-richblack-900 rounded-full '  onClick={()=>{setTag("Most popular")}}>Most Popular</div>
                <div className=' cursor-pointer px-2 md:px-4 py-1 hover:bg-richblack-900 rounded-full '  onClick={()=>{setTag("Skills paths")}}>Skills Paths</div>
                <div className=' cursor-pointer px-2 md:px-4 py-1 hover:bg-richblack-900 rounded-full '  onClick={()=>{setTag("Career paths")}}>Career Paths</div>
            </div>
       </div>
        
        <div className=" relative md:absolute bottom-[-50px] md:bottom-[-100px] px-4 md:px-15 w-full">
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-8 lg:gap-15 w-full md:w-[95%] lg:w-[90%] justify-center mx-auto">
                        {
                            courses.map((course,index)=>
                                    <HomeCard key={index} heading={course.heading} subHeading={course.description}></HomeCard>

                            )
                        }
                    </div>
        </div>

    </div>
  )
}

export default CourseFilter