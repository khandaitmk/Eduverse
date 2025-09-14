import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/images/know_your_progress.png"
import compare_with_others from "../../../assets/images/compare_with_others.png"
import plan_your_lessons from "../../../assets/images/plan_your_lessons.png"
import CTAButton from './CTAButton'

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-10 pb-20'>
        <div className=" flex flex-col gap-4 justify-center items-center w-[56%] mx-auto text-center">
                    <p className=" text-4xl font-bold">
                        Your swiss knife for <HighlightText text={"learning any language"}></HighlightText>
                    </p>
                    <p className="text-lg px-5">
                        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </p>
                </div>

                <div className=' flex relative justify-center'>
                    <div className=' translate-x-[120px] z-0  '>
                        <img  src={know_your_progress} alt="" />
                    </div>

                    <div className=' z-10'>
                        <img src={compare_with_others} alt="" />
                    </div>

                    <div className=' translate-x-[-140px] z-20'>
                        <img src={plan_your_lessons} alt="" />
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