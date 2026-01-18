import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/images/know_your_progress.png"
import compare_with_others from "../../../assets/images/compare_with_others.png"
import plan_your_lessons from "../../../assets/images/plan_your_lessons.png"
import CTAButton from './CTAButton'

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-6 md:gap-10 pb-10 md:pb-20 px-4'>
        <div className=" flex flex-col gap-3 md:gap-4 justify-center items-center w-full md:w-[90%] lg:w-[56%] mx-auto text-center">
                    <p className=" text-2xl md:text-3xl lg:text-4xl font-bold">
                        Your swiss knife for <HighlightText text={"learning any language"}></HighlightText>
                    </p>
                    <p className="text-sm md:text-base lg:text-lg px-2 md:px-5">
                        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </p>
                </div>

                <div className=' flex relative justify-center items-center overflow-x-auto md:overflow-visible'>
                    <div className=' translate-x-0 md:translate-x-[60px] lg:translate-x-[120px] z-0 scale-75 md:scale-100'>
                        <img className="w-full h-auto max-w-[200px] md:max-w-none" src={know_your_progress} alt="" />
                    </div>

                    <div className=' z-10 scale-75 md:scale-100'>
                        <img className="w-full h-auto max-w-[200px] md:max-w-none" src={compare_with_others} alt="" />
                    </div>

                    <div className=' translate-x-0 md:translate-x-[-70px] lg:translate-x-[-140px] z-20 scale-75 md:scale-100'>
                        <img className="w-full h-auto max-w-[200px] md:max-w-none" src={plan_your_lessons} alt="" />
                    </div>
                </div>


                <div className=' flex justify-center items-center'>
                    <CTAButton active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>
    </div>
  )
}
 export default LearningLanguageSection