import React from 'react'
import SignupForm from '../components/core/SignupForm'
import HighlightText from '../components/core/Homepage/HighlightText'
import signup from "../assets/images/signup.webp"
import frame from "../assets/images/frame.png"
import { useSelector } from 'react-redux'
import Loader from '../components/common/Loader'
const SignupPage = (props) => {
  const loading = useSelector((state) => state.auth.loading);
  return (
    loading ?<Loader></Loader>:
    (
      <div className='w-11/12 mx-auto text-white flex flex-col lg:flex-row justify-evenly items-center pt-10 md:pt-16 lg:pt-20 gap-6 md:gap-9 px-4'>
            <div className=' flex flex-col gap-4 md:gap-5 w-full lg:w-[35%] p-4 md:p-5 mx-auto'>
              <div className=' flex flex-col gap-2 md:gap-3'>
                <h1 className=' text-xl md:text-2xl lg:text-3xl font-bold'>Join the millions learning to code with StudyNotion for free</h1>
                <p className=' text-richblack-500 text-base md:text-lg lg:text-xl font-bold mt-2'>Build skills for today, tomorrow, and beyond.<HighlightText  text={" Education to future-proof your career."}></HighlightText></p>
              </div>
              <SignupForm setIsLogedIn={props.setIsLogedIn}></SignupForm>
            </div>

            <div className=' relative w-full lg:w-[40%] mx-auto hidden lg:block'>
             <div className='z-10 relative'>
               <img className="w-full h-auto" src={signup} alt="loging page" />
             </div>
              <div className=' absolute z-0 bottom-[-20px] right-[-20px] hidden xl:block'>
                <img className="w-full h-auto" src={frame} alt=" frame" />
              </div>
            </div>
            
    </div>
    )
  )
}

export default SignupPage