import React from 'react'
import { Link } from 'react-router-dom';
import HighlightText from '../Homepage/HighlightText';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Eduverse partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];


function GridItem() {
  return (
    <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-white p-4 md:p-6 lg:p-10 w-full lg:w-[90%] mx-auto gap-4 md:gap-6'>
      {
        LearningGridArray.map((card,index) =>{
            return (
              <div key={index} className={`${card.order ===-1 &&" sm:col-span-2 lg:col-span-2"} ${card.order===3 && " sm:col-start-1 lg:col-start-2"}`}>
                {
                  (card.order<0)?
                  <div className=' flex flex-col gap-4 md:gap-5 px-4 md:px-6 lg:px-10 h-auto md:h-[250px] lg:h-[300px] justify-center'>
                    <h1 className=' text-2xl md:text-3xl lg:text-4xl'>{card.heading} <HighlightText text={"Anyone, Anywhere"}></HighlightText></h1>
                    <p className=' font-semibold text-sm md:text-base text-richblack-600'>{card.description}</p>
                    <Link to={"/login"}><button className=' p-2 md:p-3 px-3 md:px-4 bg-yellow-50 rounded-md text-richblack-900 font-inter font-semibold cursor-pointer text-sm md:text-base hover:bg-yellow-100 transition-colors w-fit'>Learn More</button></Link>
                  </div>
                  :
                  <div className={` h-auto md:h-[250px] lg:h-[300px] flex flex-col gap-3 md:gap-5 p-4 md:p-6 lg:p-8 ${card.order%2==1?" bg-richblack-700" :"bg-richblack-800"}`}>
                    <h1 className=' text-richblack-5 text-base md:text-lg'>{card.heading}</h1>
                    <p className=' text-richblack-500 font-semibold text-sm md:text-base'>{card.description}</p>
                  </div>
                }
              </div>
            ) 
        })
      }
    </div>
  )
}

export default GridItem