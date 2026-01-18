import React, { useEffect, useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import download from "../../assets/Logo/download.webp"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector.jsx'
import { categories } from '../../services/apis'
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { logOut } from '../../services/operations/authAPI'

const Navbar = () => {
    const [subLinks,setSubLinks]=useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
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
                // console.log("data",setSubLinks(res.data.data))
                
            } catch(error){
                console.log("ERROR Could not fetch category List :",error);
            }
        };
        // console.log(subLinks[0]);
    useEffect(()=>{
        fetchSubLinks();
    },[])

    const location = useLocation();
    
    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
        setCoursesDropdownOpen(false);
    }, [location.pathname]);
    function matchRoute(route){
        return (matchPath(route,location.pathname))
    };

    const token = useSelector((state) =>(state.auth.token));
    const {user} = useSelector((state) =>(state.profile));
    const {totalItems} = useSelector((state) =>(state.cart));
    // console.log(import.meta.env.VITE_BASE_URL);

  return (
    <div className='flex h-14 md:h-16 border-b-[1px] border-b-richblack-500 items-center bg-richblack-900'>
        <div className='w-11/12 mx-auto flex justify-between px-2 md:px-4 lg:p-15 text-richblack-100 items-center gap-4 md:gap-10 lg:gap-20'>
            <Link to={"/"} className="flex-shrink-0"> 
                <img className="w-[60px] md:w-[80px] lg:w-[90px] h-auto" src={download} alt="logo" /> 
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden lg:block'>
                <ul className=' flex gap-3 xl:gap-5'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {
                                    link.title==="Courses"?(<div className={`relative flex gap-1 items-center group cursor-pointer p-2`}>
                                                            <p className="text-sm xl:text-base">{link.title}</p>
                                                            <FaChevronDown className="text-xs"></FaChevronDown>
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
                                    <p className={`${matchRoute(link.path)?"text-yellow-25":"text-richblack-100"} p-2 text-sm xl:text-base`}>
                                        {link.title}
                                    </p>
                                    </Link>
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className='hidden md:flex gap-3 lg:gap-5 items-center'>
                {
                    user && user?.accountType !=="Instructor" &&(
                        <Link to={"/dashboard/cart"} className='relative'>
                            <FaCartShopping className="text-lg md:text-xl lg:text-[25px]"></FaCartShopping>
                            {
                                (totalItems>0)&&(
                                    <span className='absolute bottom-2 md:bottom-3 bg-yellow-50 w-3 h-3 md:w-4 md:h-4 text-[10px] md:text-xs text-richblack-900 left-2 md:left-3 flex justify-center items-center rounded-full animate-bounce'>
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
                            <button className='bg-richblack-800 px-2 md:px-3 lg:p-2 py-1 md:py-1.5 lg:py-2 rounded-md border-[1px] border-richblack-600 cursor-pointer text-xs md:text-sm'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null &&(
                        <Link to={"/signup"} className=''>
                            <button className='bg-richblack-800 px-2 md:px-3 lg:p-2 py-1 md:py-1.5 lg:py-2 rounded-md border-[1px] border-richblack-600 cursor-pointer text-xs md:text-sm'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown></ProfileDropDown>
                }
            </div>

            {/* Mobile Menu Button */}
            <div className='flex md:hidden gap-2 items-center'>
                {
                    user && user?.accountType !=="Instructor" &&(
                        <Link to={"/dashboard/cart"} className='relative'>
                            <FaCartShopping className="text-xl"></FaCartShopping>
                            {
                                (totalItems>0)&&(
                                    <span className='absolute bottom-2 bg-yellow-50 w-3 h-3 text-[10px] text-richblack-900 left-2 flex justify-center items-center rounded-full animate-bounce'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className='text-richblack-100 p-2'
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className='absolute top-14 left-0 right-0 bg-richblack-900 border-b border-richblack-500 z-50 lg:hidden'>
                <nav className='px-4 py-4'>
                    <ul className='flex flex-col gap-2'>
                        {
                            NavbarLinks.map((link,index)=>(
                                <li key={index}>
                                    {
                                        link.title==="Courses" ? (
                                            <div className='flex flex-col'>
                                                <button 
                                                    onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                                                    className={`flex items-center justify-between p-2 text-left w-full ${matchRoute(link.path)?"text-yellow-25":"text-richblack-100"}`}
                                                >
                                                    <span>{link.title}</span>
                                                    <FaChevronDown className={`transition-transform ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                {coursesDropdownOpen && (
                                                    <div className='bg-richblack-800 rounded-md mt-1 ml-2'>
                                                        {
                                                            subLinks.map((obj,index)=>(
                                                                <Link 
                                                                    key={index} 
                                                                    to={`/catalog/${encodeURIComponent(obj.name)}`}
                                                                    onClick={() => {
                                                                        setCoursesDropdownOpen(false);
                                                                        setMobileMenuOpen(false);
                                                                    }}
                                                                >
                                                                    <div className='text-richblack-300 hover:bg-richblack-700 rounded-md p-2 transition-all duration-200'>
                                                                        {obj.name}
                                                                    </div>
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link 
                                                to={link.path}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <p className={`${matchRoute(link.path)?"text-yellow-25":"text-richblack-100"} p-2`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                    <div className='flex flex-col gap-2 mt-4 pt-4 border-t border-richblack-700'>
                        {
                            token === null && (
                                <>
                                    <Link to={"/login"} onClick={() => setMobileMenuOpen(false)}>
                                        <button className='w-full bg-richblack-800 p-2 rounded-md border-[1px] border-richblack-600 text-richblack-100'>
                                            Log In
                                        </button>
                                    </Link>
                                    <Link to={"/signup"} onClick={() => setMobileMenuOpen(false)}>
                                        <button className='w-full bg-richblack-800 p-2 rounded-md border-[1px] border-richblack-600 text-richblack-100'>
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )
                        }
                        {
                            token !== null && (
                                <div onClick={() => setMobileMenuOpen(false)}>
                                    <ProfileDropDown></ProfileDropDown>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </div>
        )}
    </div>
  )
}

export default Navbar