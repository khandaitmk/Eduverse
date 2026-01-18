import React from 'react'
import download from "../../../assets/Logo/download.webp"
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
   <div className=''>
     <div className=' text-richblack-500 flex flex-col lg:flex-row px-4 md:px-6 lg:px-10 py-6 md:py-10 w-full gap-8 lg:gap-0'>
      <div className=' flex flex-col sm:flex-row gap-6 md:gap-8 justify-evenly w-full lg:w-[50%]'>
        <div className=' flex flex-col gap-3 md:gap-4'>
          <img className="w-[80px] md:w-[100px] h-auto" width={"100px"} height={"50px"} src={download} alt="logo" />
          <div className=' flex flex-col gap-2 md:gap-3'>
            <h1 className="text-sm md:text-base font-bold">Company</h1>
            <a href="" className="text-xs md:text-sm"> About</a>
            <a href="" className="text-xs md:text-sm">Careers</a>
            <a href="" className="text-xs md:text-sm">Affiliates</a>
          </div>
          <div className=' flex text-richblack-600 gap-2 md:gap-3 text-lg md:text-xl'> 
            <AiFillGoogleCircle></AiFillGoogleCircle>
            <FaFacebook></FaFacebook>
            <AiFillTwitterCircle></AiFillTwitterCircle>
            <FaYoutube></FaYoutube>
          </div>
        </div>

        <div className=' flex flex-col gap-3'>
            
            <div className=' flex flex-col gap-2 md:gap-3'>
              <h1 className=' text-richblack-100 font-bold text-sm md:text-base'>Resources</h1>
              <div className='flex flex-col gap-1 md:gap-2'>
                <a href="" className="text-xs md:text-sm">Articles</a>
                <a href="" className="text-xs md:text-sm">Blog</a>
                <a href="" className="text-xs md:text-sm">Chart Sheet</a>
                <a href="" className="text-xs md:text-sm">Code Challenges</a>
                <a href="" className="text-xs md:text-sm">Docs</a>
                <a href="" className="text-xs md:text-sm">Projects</a>
                <a href="" className="text-xs md:text-sm">Videos</a>
                <a href="" className="text-xs md:text-sm"> workspaces</a>
              </div>
            </div>

            <div className=' flex flex-col gap-2 md:gap-3'>
              <h1 className=' text-richblack-100 font-bold text-sm md:text-base'>Support</h1>
              <a href="" className="text-xs md:text-sm">Help Center</a>
            </div>
        </div>

        <div className='flex flex-col gap-3'>
            <div className=' flex flex-col gap-2 md:gap-3'>
              <h1 className='text-richblack-100 font-bold text-sm md:text-base'>Plans</h1>
              <div className='flex flex-col gap-1 md:gap-2'>
                <a href="" className="text-xs md:text-sm">Paid Memberships</a>
                <a href="" className="text-xs md:text-sm">For Students</a>
                <a href="" className="text-xs md:text-sm">Business Soltions</a>
              </div>
            </div>

            <div className='flex flex-col gap-2 md:gap-3'>
              <h1 className='text-richblack-100 font-bold text-sm md:text-base'>Comumunity</h1>
              <div className=' flex flex-col gap-1 md:gap-2'>
                <a href="" className="text-xs md:text-sm">Forums</a>
                <a href="" className="text-xs md:text-sm">Chapters</a>
                <a href="" className="text-xs md:text-sm">Events</a>
              </div>
            </div>
        </div>

      </div>

      <div className='w-full lg:w-[1px] h-[1px] lg:h-auto bg-richblack-700'></div>
      
      <div className=' flex flex-col sm:flex-row gap-6 md:gap-8 w-full lg:w-[50%] justify-evenly '>
        <div className=' flex flex-col gap-2 md:gap-3'>
          <h1 className='text-richblack-100 font-bold text-sm md:text-base'>Subjects</h1>
          <div className=' flex flex-col gap-1 md:gap-2'>
            <a href="" className="text-xs md:text-sm">Al</a>
            <a href="" className="text-xs md:text-sm">Cloud Computing</a>
            <a href="" className="text-xs md:text-sm">Code Foundations</a>
            <a href="" className="text-xs md:text-sm">Computer Science</a>
            <a href="" className="text-xs md:text-sm">CyberSecurity</a>
            <a href="" className="text-xs md:text-sm">Data Analytics</a>
            <a href="" className="text-xs md:text-sm">Data Science</a>
            <a href="" className="text-xs md:text-sm">Data Visualization</a>
            <a href="" className="text-xs md:text-sm">Developer Tools</a>
            <a href="" className="text-xs md:text-sm">Devops</a>
            <a href="" className="text-xs md:text-sm">Game Devlopment</a>
            <a href="" className="text-xs md:text-sm">IT</a>
            <a href="" className="text-xs md:text-sm">Machine Learning</a>
            <a href="" className="text-xs md:text-sm">Math</a>
            <a href="" className="text-xs md:text-sm">Mobile Devlopment</a>
            <a href="" className="text-xs md:text-sm">Web Design</a>
            <a href="" className="text-xs md:text-sm">Web Devlopment</a>
          </div>
        </div>

        <div className=' flex flex-col gap-2 md:gap-3'>
          <h1 className='text-richblack-100 font-bold text-sm md:text-base'>Languages</h1>
          <div className=' flex flex-col gap-1 md:gap-2'>
            <a href="" className="text-xs md:text-sm">Bash</a>
            <a href="" className="text-xs md:text-sm">C</a>
            <a href="" className="text-xs md:text-sm">C++</a>
            <a href="" className="text-xs md:text-sm">C#</a>
            <a href="" className="text-xs md:text-sm">Go</a>
            <a href="" className="text-xs md:text-sm">HTML & CSS</a>
            <a href="" className="text-xs md:text-sm">Java</a>
            <a href="" className="text-xs md:text-sm">JavaScript</a>
            <a href="" className="text-xs md:text-sm">Kotlin</a>
            <a href="" className="text-xs md:text-sm">PHP</a>
            <a href="" className="text-xs md:text-sm">Python</a>
            <a href="" className="text-xs md:text-sm">Ruby</a>
            <a href="" className="text-xs md:text-sm">R</a>
            <a href="" className="text-xs md:text-sm">SQL</a>
           
          </div>
        </div>

        <div className=' flex flex-col gap-2 md:gap-3'>
          <h1 className='text-richblack-100 font-bold text-sm md:text-base'>Career Building</h1>
          <div className=' flex flex-col gap-1 md:gap-2'>
            <a href="" className="text-xs md:text-sm">Career path</a>
            <a href="" className="text-xs md:text-sm">Career services</a>
            <a href="" className="text-xs md:text-sm">Intervew preparation</a>
            <a href="" className="text-xs md:text-sm">Profesional Certification</a>
            <a href="" className="text-xs md:text-sm">-</a>
            <a href="" className="text-xs md:text-sm"> Full catelog</a>
            
          </div>
        </div>

      </div>
    </div>

    <div className=' bg-richblack-600 h-[1px] w-[90%] mx-auto'> </div>

    <div className=' flex flex-col sm:flex-row justify-between text-richblack-500 p-4 md:p-5 w-[90%] mx-auto gap-3 sm:gap-0 text-xs md:text-sm'>

      <div className=' flex flex-wrap gap-2 md:gap-3 items-center'>
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