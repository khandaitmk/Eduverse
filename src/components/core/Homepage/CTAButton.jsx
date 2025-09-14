import React from 'react'
import { Link } from 'react-router-dom';
export const CTAButton = ({children,linkTo,active}) => {
  return (
    
    <Link to={linkTo}>
        <div className={` text-center font-inter text-[15px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 shadow-[1.5px_1.5px_0px_1px] shadow-richblack-700 ${active?" bg-yellow-50 text-richblack-900":" bg-richblack-800"} `}>
            {children}
        </div>
    </Link>
  )
};

export default CTAButton;