import React from 'react'
import { FaQuoteLeft,FaQuoteRight  } from "react-icons/fa";
import HighlightText from '../Homepage/HighlightText';


function Quote() {
  return (
    <div className='p-6 md:p-12 lg:p-20 text-xl md:text-2xl lg:text-4xl font-bold mt-10 md:mt-16 lg:mt-20 text-white text-center border-b-[1px] border-richblack-800 px-4 md:px-6'>
        <p className="leading-relaxed"> <sup><FaQuoteLeft className="inline-block text-sm md:text-base lg:text-xl"></FaQuoteLeft></sup>  We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}></HighlightText> , <span className=' bg-clip-text text-transparent bg-gradient-to-b from-[#fd4925] to-[#F09819]'>expertise</span>, and community to create an <span className=' bg-clip-text text-transparent bg-gradient-to-b from-[#ff6142] to-[#F09819]'> unparalleled educational experience. </span><sup><FaQuoteRight className="inline-block text-sm md:text-base lg:text-xl"></FaQuoteRight></sup></p>
        
    </div>
  )
};

export default Quote;