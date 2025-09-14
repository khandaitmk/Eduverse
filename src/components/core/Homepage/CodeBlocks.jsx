import React from 'react'
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


export const CodeBlocks = ({
    position,heading,subHeading,background,codeblock,blurr
}) => {
  return (
    <div className={` flex ${position} my-20 mt-30 justify-evenly gap-20 mx-auto px-20 w-[90%] `}>

        <div className=' flex flex-col w-[50%] gap-8 box-border'>
        <div className=' font-bold text-3xl'>
            {heading}
        </div>

        <div className=' text-richblack-300 font-bold'>
            {subHeading}
        </div>

        <div className=' flex gap-4 mt-7 w-full'>
            <CTAButton linkTo={"/signup"} active={true} >
            <div className=' flex items-center justify-center'>
                <p className='p-0 m-0'>Try it Yourself</p>
                <FaArrowRight></FaArrowRight>
            </div>
            </CTAButton>

            <CTAButton linkTo={"/login"} active={false}>
                <div className=' flex items-center justify-center gap-2'>
                <p className='p-0 m-0'>Continue Lesson</p>
                <FaArrowRight></FaArrowRight>
                </div>
            </CTAButton>
        </div>

        </div>

<div className='relative flex gap-2 h-fit text-[15px] w-[50%] box-border border-richblack-200 rounded-md p-2 bg-[linear-gradient(111.93deg,_rgba(14,26,45,0.24)_-1.4%,_rgba(17,30,50,0.38)_104.96%)] border-[2px] border-solid border-image-slice-[1] [border-image-source:linear-gradient(to_right_bottom,_#ffffff38,_#ffffff00)] z-20'>
    <div className={` absolute h-[55%] w-[70%]  top-[20px] left-[20px] bottom-0 z-0 opacity-70 blur-3xl ${blurr}`}>

    </div>
            <div className=' text-center flex flex-col text-richblack-400 font-inter z-20'>
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
            
           <div className=' text-zinc-200 z-20'>
                <TypeAnimation 
                    sequence={[codeblock,10000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={{whiteSpace:'pre-line', display:"inline-block",maxWidth:"100%",wordSpacing:"5px",letterSpacing:"2px"}}
                    
                    ></TypeAnimation>
           </div>
           
        </div>

    </div>
  )
}

export default CodeBlocks;