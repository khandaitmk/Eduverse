import React from 'react'
import instructor from "../../../assets/images/Instructor.png"
import CTAButton from './CTAButton';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from './HighlightText';

export const BecomeAnInstructor = () => {
  return (
    <div className=' flex w-full justify-evenly items-center gap-5 pb-10'>
        <div>
            <img className=' shadow-[-15px_-15px_0px_1px] shadow-white' src={instructor} alt="basic image" />
        </div>
        <div className=' flex  flex-col items-start w-[40%] gap-5'>
            <h2 className='text-4xl text-white w-[50%] font-bold'> Become an <HighlightText text={"Instructor"}></HighlightText></h2>
            <p className=' text-richblack-500 w-[90%]'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className='mt-10'>
                <CTAButton active={true} linkTo={"/signup"}>
                   <div className=' flex items-center gap-2'>
                        <p>Start Teaching Today</p>
                        <FaArrowRight></FaArrowRight>
                   </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default BecomeAnInstructor;