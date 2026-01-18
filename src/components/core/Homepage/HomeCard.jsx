import React from 'react'
import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";
import { HomePageExplore } from '../../../data/homepage-explore';
export const HomeCard = ({heading,subHeading}) => {
  return (
    <div className=' group bg-richblack-800 w-full flex flex-col hover:shadow-[10px_10px_#E7C009] hover:bg-white transition-all duration-200 hover:scale-[105%] hover:rotate-2 cursor-pointer'>
        <div className=' flex flex-col gap-3 md:gap-4 mb-10 md:mb-15 p-4 md:p-6'>
            <p className=' text-richblack-50 text-base md:text-lg font-bold group-hover:text-richblack-700'>{heading}</p>
            <p className=' text-richblack-500 text-sm md:text-base'>{subHeading}</p>
        </div>

        <div className=' flex justify-between gap-3 md:gap-5 text-richblack-50  border-t-2 border-richblack-50 border-dashed p-3 md:p-4 group-hover:text-richblue-300 text-xs md:text-sm'>
            <div className='flex items-center gap-1 md:gap-2'>
                <HiMiniUsers className="text-sm md:text-base"></HiMiniUsers>
                <p>Beginner</p>
            </div>
            <div className=' flex gap-1 md:gap-2 items-center'>
                <ImTree className="text-sm md:text-base"></ImTree>
                <p>6 Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default HomeCard;