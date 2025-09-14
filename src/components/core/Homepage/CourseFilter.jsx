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
    <div className='w-full flex flex-col items-center h-[400px]'>
       <div className=' flex flex-col items-center justify-center gap-5 mb-20'>
            <div className=' items-center flex flex-col gap-2'>
                <h1 className=' text-4xl'>Unlock the <HighlightText text={"Power of Code"}></HighlightText> </h1>
                <p className=' text-center text-richblack-500'> Learn to Build Anything You Can Imagine</p>
            </div>
            <div className=' flex gap-10 bg-richblack-800 px-4 rounded-full text-richblack-200 font-bold py-2'>
                <div className=' cursor-pointer px-4 py-1 hover:bg-richblack-900 rounded-full ' onClick={()=>{setTag("Free")}}>Free</div>
                <div className=' cursor-pointer px-4 py-1 hover:bg-richblack-900 rounded-full ' onClick={()=>{setTag("New to coding")}}>New to coding</div>
                <div className=' cursor-pointer px-4 py-1 hover:bg-richblack-900 rounded-full '  onClick={()=>{setTag("Most popular")}}>Most Popular</div>
                <div className=' cursor-pointer px-4 py-1 hover:bg-richblack-900 rounded-full '  onClick={()=>{setTag("Skills paths")}}>Skills Paths</div>
                <div className=' cursor-pointer px-4 py-1 hover:bg-richblack-900 rounded-full '  onClick={()=>{setTag("Career paths")}}>Career Paths</div>
            </div>
       </div>
        
        <div className="  absolute bottom-[-100px] px-15">
                    <div className="flex gap-15 w-[90%] justify-center mx-auto  ">
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