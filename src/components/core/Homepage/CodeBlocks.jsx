import React from 'react'
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


export const CodeBlocks = ({
    position,heading,subHeading,background,codeblock,blurr
}) => {
  return (
    <div className={` flex flex-col lg:flex-row ${position} my-10 md:my-20 md:mt-30 justify-evenly gap-8 md:gap-20 mx-auto px-4 md:px-10 lg:px-20 w-full md:w-[95%] lg:w-[90%] `}>

        <div className=' flex flex-col w-full lg:w-[50%] gap-4 md:gap-8 box-border'>
        <div className=' font-bold text-xl md:text-2xl lg:text-3xl'>
            {heading}
        </div>

        <div className=' text-richblack-300 font-bold text-sm md:text-base'>
            {subHeading}
        </div>

        <div className=' flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-7 w-full'>
            <CTAButton linkTo={"/signup"} active={true} >
            <div className=' flex items-center justify-center gap-1 md:gap-2'>
                <p className='p-0 m-0 text-xs md:text-sm lg:text-base'>Try it Yourself</p>
                <FaArrowRight className="text-xs md:text-sm"></FaArrowRight>
            </div>
            </CTAButton>

            <CTAButton linkTo={"/login"} active={false}>
                <div className=' flex items-center justify-center gap-2'>
                <p className='p-0 m-0 text-xs md:text-sm lg:text-base'>Continue Lesson</p>
                <FaArrowRight className="text-xs md:text-sm"></FaArrowRight>
                </div>
            </CTAButton>
        </div>

        </div>

<div className='relative flex gap-1 md:gap-2 h-fit text-xs md:text-sm lg:text-[15px] w-full lg:w-[50%] box-border border-richblack-200 rounded-md p-2 md:p-3 bg-[linear-gradient(111.93deg,_rgba(14,26,45,0.24)_-1.4%,_rgba(17,30,50,0.38)_104.96%)] border-[2px] border-solid border-image-slice-[1] [border-image-source:linear-gradient(to_right_bottom,_#ffffff38,_#ffffff00)] z-20 overflow-x-auto'>
    <div className={` absolute h-[55%] w-[70%]  top-[20px] left-[20px] bottom-0 z-0 opacity-70 blur-3xl ${blurr}`}>

    </div>
            <div className=' text-center flex flex-col text-richblack-400 font-inter z-20 text-xs md:text-sm flex-shrink-0'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            
           <div className=' text-zinc-200 z-20 overflow-x-auto'>
                <TypeAnimation 
                    sequence={[codeblock,10000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={{whiteSpace:'pre-line', display:"inline-block",maxWidth:"100%",wordSpacing:"2px",letterSpacing:"1px",fontSize:"inherit"}}
                    
                    ></TypeAnimation>
           </div>
           
        </div>

    </div>
  )
}

export default CodeBlocks;