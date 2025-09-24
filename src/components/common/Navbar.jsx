import React, { useEffect, useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import download from "../../assets/Logo/download.webp"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa";
import { logOut } from '../../services/operations/authAPI'

const Navbar = () => {
    const [subLinks,setSubLinks]=useState([]);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const user=useSelector((state) => state.profile))
    function logOutHandler(){
        dispatch(logOut(navigate));
    }
    const fetchSubLinks = async()=>{
            try{
                const res= await apiConnector("GET",categories.CATEGORIES_API);
                // console.log("Printing the res :",res);
                setSubLinks(res.data.data)
                console.log("data",setSubLinks(res.data.data))
                
            } catch(error){
                console.log("ERROR Could not fetch category List :",error);
            }
        };
        console.log(subLinks[0]);
    useEffect(()=>{
        fetchSubLinks();
    },[])

    const location = useLocation();
    function matchRoute(route){
        return (matchPath(route,location.pathname))
    };

    const token = useSelector((state) =>(state.auth.token));
    const {user} = useSelector((state) =>(state.profile));
    const {totalItems} = useSelector((state) =>(state.cart));
    // console.log(import.meta.env.VITE_BASE_URL);

  return (
    <div className='flex h-14 border-b-[1px] border-b-richblack-500 items-center '>
        <div className='w-11/12 mx-auto flex justify-between p-15 text-richblack-100 items-center gap-20'>
            <Link to={"/"}> <img width={"90px"} height={"90px"} src={download} alt="logo" /> </Link>

            <nav>
                <ul className=' flex gap-5'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {
                                    link.title==="Courses"?(<div className={`relative flex gap-1 items-center group cursor-pointer p-2`}>
                                                            <p>{link.title}</p>
                                                            <FaChevronDown></FaChevronDown>
                                                            <div className='absolute top-full left-1/2 invisible group-hover:visible bg-richblack-5  justify-center items-center text-center w-[250px] translate-x-[-40%] translate-y-[2px] rounded-md transition-all duration-200 z-20'>
                                                                <div className=' p-2'>
                                                                {
                                                                    subLinks.map((obj,index)=>(
                                                                        <Link key={index}  to={`/catalog/${encodeURIComponent(obj.name)}`}>
                                                                            <div  className=' text-richblack-500 hover:bg-richblack-100 hover:text-richblack-900 rounded-md p-2 transition-all duration-200'>
                                                                            {obj.name}
                                                                        </div>
                                                                        </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                            </div>
                                                            <div className=' w-7 h-7 bg-richblack-5 absolute top-full rounded-[2px] rotate-45 translate-x-13 invisible group-hover:visible z-10 '></div>
                                                            </div>
                                                            ):
                                    <Link to={link.path}>
                                    <p className={`${matchRoute(link.path)?"text-yellow-25":"text-richblack-100"} p-2`}>
                                        {link.title}
                                    </p>
                                    </Link>
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* login button / signup button / dashboard button */}
            <div className=' flex gap-5 items-center'>
                {
                    user && user?.accountType !=="Instructor" &&(
                        <Link to={"/dashboard/cart"} className='relative'>
                            <FaCartShopping size={"25px"}></FaCartShopping>
                            {
                                (totalItems>0)&&(
                                    <span className='absolute bottom-3 bg-yellow-50 w-4 text-richblack-900 h-4 left-3 flex justify-center items-center rounded-full animate-bounce'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null &&(
                        <Link to={"/login"} className=' cursor-pointer'>
                            <button className='bg-richblack-800 p-2 rounded-md border-[1px] border-richblack-600 cursor-pointer'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null &&(
                        <Link to={"/signup"} className=''>
                            <button className='bg-richblack-800 p-2 rounded-md border-[1px] border-richblack-600 cursor-pointer'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown></ProfileDropDown>
                }
                {/* {
                    token !== null &&(
                        <Link to={""} className='' onClick={logOutHandler}>
                            <button className='bg-richblack-800 p-2 rounded-md border-[1px] border-richblack-600 cursor-pointer'>
                                Log Out
                            </button>
                        </Link>
                    )
                } */}
            </div>

            
        </div>
    </div>
  )
}

export default Navbar