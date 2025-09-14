import React from 'react'
import { FaQuoteLeft,FaQuoteRight  } from "react-icons/fa";
import HighlightText from '../Homepage/HighlightText';


function Quote() {
  return (
    <div className='p-20 text-4xl font-bold mt-20 text-white text-center border-b-[1px] border-richblack-800'>
        <p> <sup><FaQuoteLeft className="inline-block text-xl"></FaQuoteLeft></sup>  We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}></HighlightText> , <span className=' bg-clip-text text-transparent bg-gradient-to-b from-[#fd4925] to-[#F09819]'>expertise</span>, and community to create an <span className=' bg-clip-text text-transparent bg-gradient-to-b from-[#ff6142] to-[#F09819]'> unparalleled educational experience. </span><sup><FaQuoteRight className="inline-block text-xl"></FaQuoteRight></sup></p>
        
    </div>
  )
};

export default Quote;