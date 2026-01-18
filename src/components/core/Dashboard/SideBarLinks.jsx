import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';

function SideBarLinks(props) {
  const Icon = Icons[props.icon] || (() => <span className="text-red-500">?</span>);
    const location=useLocation();
    const dispatch=useDispatch();

    const matchRoute =(route) =>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <Link to={props.link.path} >
        <div className={`relative text-sm lg:text-sm p-2 lg:p-1 pl-6 lg:pl-8 font-medium transition-all duration-300 ${matchRoute(props.link.path)?"bg-yellow-700 text-yellow-50":""} hover:bg-richblack-700`}>
            <div className=' flex items-center gap-x-2'>
                <Icon className="text-base lg:text-lg"></Icon>
                <span className=''>{props.link.name}</span>
            </div>
        </div>
    </Link>
  )
}

export default SideBarLinks