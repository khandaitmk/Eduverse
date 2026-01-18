import React from 'react'
import instructor from "../../../assets/images/Instructor.png"
import CTAButton from './CTAButton';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from './HighlightText';

export const BecomeAnInstructor = () => {
  return (
    <div className=' flex flex-col lg:flex-row w-full justify-evenly items-center gap-5 md:gap-5 pb-10 px-4'>
        <div className='w-full lg:w-auto flex justify-center'>
            <img className='w-full max-w-[300px] md:max-w-[400px] lg:max-w-none h-auto shadow-[-10px_-10px_0px_1px] md:shadow-[-15px_-15px_0px_1px] shadow-white' src={instructor} alt="basic image" />
        </div>
        <div className=' flex  flex-col items-start w-full lg:w-[40%] gap-4 md:gap-5'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-white w-full lg:w-[50%] font-bold'> Become an <HighlightText text={"Instructor"}></HighlightText></h2>
            <p className=' text-richblack-500 w-full lg:w-[90%] text-sm md:text-base'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className='mt-5 md:mt-10'>
                <CTAButton active={true} linkTo={"/signup"}>
                   <div className=' flex items-center gap-2'>
                        <p className="text-xs md:text-sm lg:text-base">Start Teaching Today</p>
                        <FaArrowRight className="text-xs md:text-sm"></FaArrowRight>
                   </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default BecomeAnInstructor;