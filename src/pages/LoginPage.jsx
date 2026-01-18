import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import LoginForm from '../components/core/LoginForm'
import login from "../assets/images/login.webp"
import frame from "../assets/images/frame.png"
import { useSelector } from 'react-redux'
import Loader from '../components/common/Loader'

const LoginPage = (props) => {

  const loading=useSelector((state)=>state.auth.loading);
  return (
          
            loading ? <Loader></Loader>:
            (
               <div className='w-11/12 mx-auto text-white flex flex-col lg:flex-row justify-evenly items-center pt-10 md:pt-16 lg:pt-20 gap-6 md:gap-9 px-4'>

              <div className=' flex flex-col gap-4 md:gap-5 w-full lg:w-[35%] p-4 md:p-5 mx-auto'>
              <div>
                <h1 className=' text-2xl md:text-3xl font-bold'>Welcome Back</h1>
                <p className=' text-richblack-500 text-base md:text-lg lg:text-xl font-bold mt-2'>Discover your passions,<HighlightText  text={"Be Unstoppable"}></HighlightText></p>
              </div>
              <LoginForm setIsLogedIn={props.setIsLogedIn}></LoginForm>
            </div>

            <div className=' relative w-full lg:w-[40%] mx-auto hidden lg:block'>
             <div className='z-10 relative'>
               <img className="w-full h-auto" src={login} alt="loging page" />
             </div>
              <div className=' absolute z-0 bottom-[-20px] right-[-20px] hidden xl:block'>
                <img className="w-full h-auto" src={frame} alt=" frame" />
              </div>
            </div>
                </div>

            )
          
            
  )
}

export default LoginPage