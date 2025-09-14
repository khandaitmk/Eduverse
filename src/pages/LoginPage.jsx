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
               <div className='w-11/12 mx-auto text-white flex justify-evenly items-center pt-20 gap-9'>

              <div className=' flex flex-col gap-5 w-[35%] p-5 mx-auto'>
              <div>
                <h1 className=' text-3xl font-bold'>Welcome Back</h1>
                <p className=' text-richblack-500 text-xl font-bold'>Discover your passions,<HighlightText  text={"Be Unstoppable"}></HighlightText></p>
              </div>
              <LoginForm setIsLogedIn={props.setIsLogedIn}></LoginForm>
            </div>

            <div className=' relative w-[40%] mx-auto'>
             <div className='z-10 relative'>
               <img  src={login} alt="loging page" />
             </div>
              <div className=' absolute z-0 bottom-[-20px] right-[-20px]'>
                <img  src={frame} alt=" frame" />
              </div>
            </div>
                </div>

            )
          
            
  )
}

export default LoginPage