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
      <div className='w-11/12 mx-auto text-white flex justify-evenly items-center pt-20 gap-9'>
            <div className=' flex flex-col gap-5 w-[35%] p-5 mx-auto'>
              <div className=' flex flex-col gap-3'>
                <h1 className=' text-3xl font-bold'>Join the millions learning to code with StudyNotion for free</h1>
                <p className=' text-richblack-500 text-xl font-bold'>Build skills for today, tomorrow, and beyond.<HighlightText  text={" Education to future-proof your career."}></HighlightText></p>
              </div>
              <SignupForm setIsLogedIn={props.setIsLogedIn}></SignupForm>
            </div>

            <div className=' relative w-[40%] mx-auto'>
             <div className='z-10 relative'>
               <img  src={signup} alt="loging page" />
             </div>
              <div className=' absolute z-0 bottom-[-20px] right-[-20px]'>
                <img  src={frame} alt=" frame" />
              </div>
            </div>
            
    </div>
    )
  )
}

export default SignupPage