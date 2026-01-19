import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Homepage/HighlightText";
import { useState } from "react";
import CTAButton from "../components/core/Homepage/CTAButton";
import Banner from "../assets/images/banner.mp4"
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import HomeCard from "../components/core/Homepage/HomeCard";
import Logo1 from "../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../assets/TimeLineLogo/Logo4.svg"
import Timelineimage from "../../assets/images/Timelineimage.png"
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import BecomeAnInstructor from "../components/core/Homepage/BecomeAnInstructor";
import Footer from "../components/core/Homepage/Footer";
import CourseFilter from "../components/core/Homepage/CourseFilter";

function Home(){
return (
    <div>
        {/* section 1 */}
        <div className=" font-inter relative mx-auto flex flex-col w-11/12 items-center justify-between text-white mt-[50px] md:mt-[100px]">
           
            <Link to={"/signup"}>
            
            <div className="group flex justify-center items-center gap-2.5  mx-auto rounded-full bg-[#161D29]  font-bold text-[#999DAA] hover:scale-95 transition-all duration-300 p-1 shadow:[0px -1px 0px 0px #FFFFFF2E inset]">
                
                <div className=" flex gap-2 md:gap-3 items-center justify-center group-hover:bg-[#000814] rounded-full p-2 px-4 md:px-6 transition-all duration-300">
                    <p className="text-xs md:text-base">Become An Instructor</p>
                    <FaArrowRight className="text-xs md:text-base"></FaArrowRight>
                </div>
           
            </div>

            </Link>

            <div className=" font-inter text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 md:mt-6 px-4 text-center">
                Empower Your Future Growth <HighlightText text={"Coding Skills"}></HighlightText>
            </div>

            <div className=" text-richblack-300 mx-auto text-center w-full md:w-[90%] lg:w-[80%] font-semibold text-sm md:text-base lg:text-lg mt-4 px-4">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className=" flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 px-4 w-full sm:w-auto">
            <CTAButton active={true} linkTo={"/signup"}>
            Learn more
            </CTAButton>

            <CTAButton active={false} linkTo={"/login"}>
            Book a Demo
            </CTAButton>
            </div>

            <div className="w-full md:w-[90%] lg:w-[70%] h-fit mt-10 md:mt-20 shadow-[10px_10px_0px_0px_rgba(245,245,245,1)] md:shadow-[20px_20px_0px_0px_rgba(245,245,245,1)] px-4 md:px-0">
                <video muted loop autoPlay className="w-full shadow-blue-100 shadow-[0px_-10px_500px_-100px]">
                    
                    <source src={Banner}  type="video/mp4"/>
                </video>
            </div>

                
            <div className=" mt-10 md:mt-10 flex flex-col px-4 md:px-0">
                    {/* code section 1 */}
                    <div className=" ">
                             <CodeBlocks position={" "} heading={<div className="">Unlock your <HighlightText text={"coding potential"}></HighlightText> with our online courses.</div>} subHeading={<div> Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>} codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title> Example </title>\n<linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1> <a href="/"> Header </a> </h1>\n<nav> <a href="one/"> One </a> \n<a href="two/"> Two </a>\n<a href="three/"> Three </a> \n</nav>`} blurr={"bg-[linear-gradient(123.77deg,_#8a2be2_-6.46%,_#866A04_59.04%,_#f8f8f8_124.53%)]"} ></CodeBlocks>
                    </div>

                    {/* code section 2 */}
                    <div className=" relative">
                        <CodeBlocks position={" flex-row-reverse"} heading={<div>Start <HighlightText text={"coding in seconds"}></HighlightText></div>} subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} codeblock={`<!DOCTYPE html> \n <html>\n<head>\n<title>   Example </title>\n<linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1> <a href="/"> Header </a> </h1>\n<nav> <a href="one/"> One </a> \n<a href="two/"> Two </a>\n<a href="three/"> Three </a> \n</nav>`} blurr={"bg-[linear-gradient(123.77deg,_#118AB2_-6.46%,_#866A04_59.04%,_#05BF8E_124.53%)]"}></CodeBlocks>
                    </div>
            </div>


            <CourseFilter></CourseFilter>

            {/* <div className=" flex flex-col gap-4 mt-30 h-[400px] w-full relative">
                <p className=" text-4xl text-center">Unlock the <HighlightText text={"Power of the Code"}></HighlightText></p>
                <p className=" font-semibold text-richblack-300 text-center"> Learn to Build Anything You Can Imagine</p>
                <div className=" flex gap-15 w-full justify-center absolute bottom-[-70px]">
                    <div className=" w-[25%]"><HomeCard heading={"Learn HTML"} subHeading={"This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."}></HomeCard></div>

                    <div className=" w-[25%]"><HomeCard heading={"Learn HTML"} subHeading={"This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."}></HomeCard></div>


                    <div className=" w-[25%]"><HomeCard heading={"Learn HTML"} subHeading={"This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."}></HomeCard></div>

                </div>
            </div> */}
        </div>

        {/* section 2 */}
        <div className=" bg-pure-greys-5 text-richblack-700 ">
           <div className=" w-11/12 mx-auto">
                 <div className="bg-[url(.\assets\images\bghome.svg)] h-auto min-h-[250px] md:h-[333px] pt-10 pb-10 md:pb-0">
                <div className=" mx-auto flex flex-col sm:flex-row justify-center gap-3 md:gap-4 text-white items-center h-full px-4">
                        <CTAButton linkTo={"/signup"} active={true}>
                            <div className=" flex gap-2 items-center">
                                <p className="text-sm md:text-base">Explore Full Catelog </p>
                                <FaArrowRight></FaArrowRight>
                            </div>
                        </CTAButton>

                        <CTAButton linkTo={"/signup"} active={false}>
                            <div className=" flex gap-2 items-center">
                                <p className="text-sm md:text-base">Learn More</p>
                            
                            </div>
                        </CTAButton>
                     </div>
            </div> 

            <div>
                <div className=" w-11/12 mx-auto px-4 md:px-10">

                <div className=" flex flex-col lg:flex-row mt-10 md:mt-15 mx-auto gap-5 md:gap-5">
                    <div className=" text-2xl md:text-3xl lg:text-4xl px-2 w-full lg:w-[50%]">
                        Get the skills you need for a <HighlightText text={"job that is in demand."}></HighlightText>
                    </div>
                    <div className=" flex flex-col items-start gap-6 md:gap-12 px-2 md:px-5 w-full lg:w-[50%]">
                        <p className="text-richblack-900 text-sm md:text-base lg:text-[17px]">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAButton linkTo={"/signup"} active={true}> Learn More</CTAButton>
                    </div>
                </div>


                <div></div>
                </div>
            </div>

            <div className=" flex flex-col lg:flex-row justify-evenly w-full md:w-[90%] lg:w-[85%] mx-auto mt-10 md:mt-20 items-center gap-10 md:gap-20 px-4">

                <div className=" flex flex-col gap-3 w-full lg:w-auto">


                    <div className="">
                            <div className=" flex items-center gap-4 md:gap-8">
                                <div className=" bg-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-blue-200 shadow-[0px_0px_100px_1px] flex-shrink-0"> 
                                        <img src={Logo1} className="w-4 h-4 md:w-5 md:h-5"></img> 
                                </div>
                                <div className=" flex flex-col gap-1">
                                    <p className=" font-bold text-base md:text-[18px]">Leadership</p>
                                    <p className="text-sm md:text-[15px]">Fully committed to the success company</p>
                                </div>
                            </div>
                            <div className="h-8 md:h-10 border-l-2 border-dashed border-richblack-200 ml-4 md:ml-5"></div>
                    </div>


                    <div>
                            <div  className=" flex items-center gap-4 md:gap-8">
                                <div  className=" bg-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-blue-200 shadow-[0px_0px_100px_1px] flex-shrink-0">
                                    <img src={Logo2} className="w-4 h-4 md:w-5 md:h-5"></img> 
                                </div>
                                <div> 
                                    <p className=" font-bold text-base md:text-[18px]">Responsibility</p>
                                    <p className="text-sm md:text-[15px]">Students will always be our top priority</p>
                                </div>
                            </div>
                            <div className="h-8 md:h-10 border-l-2 border-dashed border-richblack-200 ml-4 md:ml-5"></div>

                    </div>

                    <div>
                            <div className=" flex items-center gap-4 md:gap-8">
                                <div className=" bg-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-blue-200 shadow-[0px_0px_100px_1px] flex-shrink-0">
                                     <img src={Logo3} className="w-4 h-4 md:w-5 md:h-5"></img>
                                    </div>
                             <div>
                                    <p className=" font-bold text-base md:text-[18px]">Flexibility</p>
                                    <p className="text-sm md:text-[15px]">The ability to switch is an important skills</p>
                                </div>
                            </div>
                            <div className="h-8 md:h-10 border-l-2 border-dashed border-richblack-200 ml-4 md:ml-5"></div>

                    </div>

                    <div>
                            <div className=" flex items-center gap-4 md:gap-8">
                                <div className=" bg-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-blue-200 shadow-[0px_0px_100px_1px] flex-shrink-0">
                                     <img src={Logo4} className="w-4 h-4 md:w-5 md:h-5"></img>
                                    </div>
                             <div>
                                    <p className=" font-bold text-base md:text-[18px]">Solve the problem</p>
                                    <p className="text-sm md:text-[15px]">Code your way to a solution</p>
                                </div>
                            </div>

                    </div>
                </div>

                <div className=" relative w-full lg:w-auto">
                    <div className="mx-auto w-full md:w-[90%] absolute bottom-[-20px] md:bottom-[-40px] right-0 left-0 bg-caribbeangreen-700 z-50 text-white flex flex-col sm:flex-row justify-evenly items-center p-4 md:p-8 gap-4 md:gap-0">
                        <div className=" flex gap-4 md:gap-10 box-border items-center">
                            <p className=" text-2xl md:text-3xl font-bold">10</p>
                            <p  className=" text-xs md:text-sm text-caribbeangreen-300"> YEARS EXPERIENCES</p>
                        </div>
                        <div className=" w-full sm:w-[2px] h-[2px] sm:h-10 bg-caribbeangreen-500"></div>
                        <div className=" flex gap-2 md:gap-4 items-center">
                            <p className=" text-2xl md:text-3xl font-bold">250</p>
                            <p className=" text-xs md:text-sm text-caribbeangreen-300">TYPES OF COURSES</p>
                        </div>
                    </div>
                    
                    <div className=" z-10 relative w-full">
                        <img  className="w-full h-auto" width={"600px"} src={Timelineimage}></img>
                        <div className="  z-0 absolute top-0 left-0 bottom-0 right-0 shadow-[10px_10px_100px_1px] shadow-blue-5"></div>
                    </div>
                </div>
            </div>

            <div className=" mt-10 md:mt-30">
                <LearningLanguageSection></LearningLanguageSection>
                
            </div>
           </div>
        </div>

        {/* section 3 */}
        <div className=" mt-10 md:mt-20">
            <div className=" w-11/12 mx-auto">
                <BecomeAnInstructor></BecomeAnInstructor>
                {/* <ReviewSection></ReviewSection> */}
            </div>
        </div>
        {/* Footer */}
        <div className=" bg-richblack-800">
            <div className="w-11/12 mx-auto pt-6 md:pt-10">
            <Footer></Footer>
            </div>
        </div>
    </div>
)
};

export default Home;