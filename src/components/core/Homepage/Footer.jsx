import React from 'react'
import download from "../../../assets/Logo/download.webp"
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
   <div className=''>
     <div className=' text-richblack-500 flex  px-10 py-10 w-full'>
      <div className=' flex gap-8 justify-evenly w-[50%]'>
        <div className=' flex flex-col gap-4'>
          <img width={"100px"} height={"50px"} src={download} alt="logo" />
          <div className=' flex flex-col gap-3'>
            <h1>Company</h1>
            <a href=""> About</a>
            <a href="">Careers</a>
            <a href="">Affiliates</a>
          </div>
          <div className=' flex text-richblack-600 gap-3'> 
            <AiFillGoogleCircle></AiFillGoogleCircle>
            <FaFacebook></FaFacebook>
            <AiFillTwitterCircle></AiFillTwitterCircle>
            <FaYoutube></FaYoutube>
          </div>
        </div>

        <div className=' flex flex-col gap-3'>
            
            <div className=' flex flex-col gap-3'>
              <h1 className=' text-richblack-100 font-bold'>Resources</h1>
              <div className='flex flex-col gap-2'>
                <a href="">Articles</a>
                <a href="">Blog</a>
                <a href="">Chart Sheet</a>
                <a href="">Code Challenges</a>
                <a href="">Docs</a>
                <a href="">Projects</a>
                <a href="">Videos</a>
                <a href=""> workspaces</a>
              </div>
            </div>

            <div className=' flex flex-col gap-3'>
              <h1 className=' text-richblack-100 font-bold'>Support</h1>
              <a href="">Help Center</a>
            </div>
        </div>

        <div className='flex flex-col gap-3'>
            <div className=' flex flex-col gap-3'>
              <h1 className='text-richblack-100 font-bold'>Plans</h1>
              <div className='flex flex-col gap-2'>
                <a href="">Paid Memberships</a>
                <a href="">For Students</a>
                <a href="">Business Soltions</a>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <h1 className='text-richblack-100 font-bold'>Comumunity</h1>
              <div className=' flex flex-col gap-2'>
                <a href="">Forums</a>
                <a href="">Chapters</a>
                <a href="">Events</a>
              </div>
            </div>
        </div>

      </div>

      <div className='w-[1px] bg-richblack-700'></div>
      
      <div className=' flex gap-8 w-[50%] justify-evenly '>
        <div className=' flex flex-col gap-3'>
          <h1 className='text-richblack-100 font-bold'>Subjects</h1>
          <div className=' flex flex-col gap-2'>
            <a href="">Al</a>
            <a href="">Cloud Computing</a>
            <a href="">Code Foundations</a>
            <a href="">Computer Science</a>
            <a href="">CyberSecurity</a>
            <a href="">Data Analytics</a>
            <a href="">Data Science</a>
            <a href="">Data Visualization</a>
            <a href="">Developer Tools</a>
            <a href="">Devops</a>
            <a href="">Game Devlopment</a>
            <a href="">IT</a>
            <a href="">Machine Learning</a>
            <a href="">Math</a>
            <a href="">Mobile Devlopment</a>
            <a href="">Web Design</a>
            <a href="">Web Devlopment</a>
          </div>
        </div>

        <div className=' flex flex-col gap-3'>
          <h1 className='text-richblack-100 font-bold'>Languages</h1>
          <div className=' flex flex-col gap-2'>
            <a href="">Bash</a>
            <a href="">C</a>
            <a href="">C++</a>
            <a href="">C#</a>
            <a href="">Go</a>
            <a href="">HTML & CSS</a>
            <a href="">Java</a>
            <a href="">JavaScript</a>
            <a href="">Kotlin</a>
            <a href="">PHP</a>
            <a href="">Python</a>
            <a href="">Ruby</a>
            <a href="">R</a>
            <a href="">SQL</a>
           
          </div>
        </div>

        <div className=' flex flex-col gap-3'>
          <h1 className='text-richblack-100 font-bold'>Career Building</h1>
          <div className=' flex flex-col gap-2'>
            <a href="">Career path</a>
            <a href="">Career services</a>
            <a href="">Intervew preparation</a>
            <a href="">Profesional Certification</a>
            <a href="">-</a>
            <a href=""> Full catelog</a>
            
          </div>
        </div>

      </div>
    </div>

    <div className=' bg-richblack-600 h-[1px] w-[90%] mx-auto'> </div>

    <div className=' flex justify-between text-richblack-500 p-5 w-[90%] mx-auto'>

      <div className=' flex gap-3 items-center'>
        <div>Privacy Policy</div>
        <div className='w-[1px] bg-richblack-500 h-[60%]'></div>
        <div>Cookie Policy</div>
        <div className='w-[2px] bg-richblack-500 h-[60%]'></div>
        <div>Terms</div>
      </div>

      <div>
        <div>Made By Manish @ 2025</div>
      </div>
    </div>

   </div>
  )
}
export default Footer;